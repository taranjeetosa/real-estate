import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, Phone, Search, X } from "lucide-react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import countryNames from "react-phone-number-input/locale/en";
import { specialistTracks } from "../data/aiCourse.js";
import useLeadSheetSubmission from "../hooks/useLeadSheetSubmission.js";
import "./LeadPopup.css";

const countries = getCountries()
  .map((code) => ({
    code,
    name: countryNames[code],
    callingCode: `+${getCountryCallingCode(code)}`,
    Flag: flags[code],
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const timeSlots = [
  "Morning (9 AM – 12 PM)",
  "Afternoon (12 PM – 4 PM)",
  "Evening (4 PM – 8 PM)",
];

function CountryCodePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pickerRef = useRef(null);
  const buttonRef = useRef(null);
  const searchRef = useRef(null);
  const selectedCountry = countries.find(({ code }) => code === value);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredCountries = countries.filter(({ code, name, callingCode }) =>
    `${name} ${code} ${callingCode}`.toLocaleLowerCase().includes(normalizedQuery),
  );
  const SelectedFlag = selectedCountry.Flag;

  useEffect(() => {
    if (!open) {
      setQuery("");
      return undefined;
    }

    function closeOnOutsideClick(event) {
      if (!pickerRef.current?.contains(event.target)) setOpen(false);
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    searchRef.current?.focus();
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function chooseCountry(code) {
    onChange(code);
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <div className="lead-popup-country-picker" ref={pickerRef}>
      <button
        ref={buttonRef}
        className="lead-popup-country-button"
        type="button"
        aria-label={`Country code: ${selectedCountry.name} ${selectedCountry.callingCode}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <SelectedFlag title={`${selectedCountry.name} flag`} aria-hidden="true" />
        <span>{selectedCountry.callingCode}</span>
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      {open && (
        <div className="lead-popup-country-menu" role="dialog" aria-label="Select country code">
          <div className="lead-popup-country-search">
            <Search size={15} aria-hidden="true" />
            <input
              ref={searchRef}
              type="search"
              aria-label="Search countries"
              placeholder="Search countries"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="lead-popup-country-list">
            {filteredCountries.length ? filteredCountries.map(({ code, name, callingCode, Flag }) => (
              <button
                key={code}
                className="lead-popup-country-option"
                type="button"
                aria-pressed={code === value}
                onClick={() => chooseCountry(code)}
              >
                <Flag title={`${name} flag`} aria-hidden="true" />
                <span>{name}</span>
                <span>{callingCode}</span>
              </button>
            )) : (
              <p className="lead-popup-country-empty">No countries match your search.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [enquiryVisible, setEnquiryVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const launcherRef = useRef(null);
  const nameRef = useRef(null);
  const formRef = useRef(null);
  const autoOpenCancelledRef = useRef(false);
  const viewedEnquiryRef = useRef(false);
  const enquiryVisibleRef = useRef(false);
  const {
    handleSubmit,
    resetSubmission,
    sending,
    submitted,
    error: submissionError,
  } = useLeadSheetSubmission({ formRef });

  useEffect(() => {
    const enquiryForm = document.querySelector("#enquire .enquiry-form");
    const updateEnquiryVisibility = () => {
      const formBounds = enquiryForm?.getBoundingClientRect();
      const visibleHeight = formBounds
        ? Math.max(0, Math.min(formBounds.bottom, window.innerHeight) - Math.max(formBounds.top, 0))
        : 0;
      const isVisible =
        formBounds?.height > 0 && visibleHeight / formBounds.height >= 0.2;

      if (isVisible === enquiryVisibleRef.current) return;
      enquiryVisibleRef.current = isVisible;
      setEnquiryVisible(isVisible);
      if (isVisible) {
        viewedEnquiryRef.current = true;
        setOpen(false);
        if (formRef.current?.contains(document.activeElement)) {
          document.activeElement.blur();
        }
      }
    };

    updateEnquiryVisibility();
    window.addEventListener("scroll", updateEnquiryVisibility, { passive: true });
    window.addEventListener("resize", updateEnquiryVisibility);

    const openTimer = window.setTimeout(() => {
      updateEnquiryVisibility();
      if (!autoOpenCancelledRef.current && !viewedEnquiryRef.current) {
        setOpen(true);
      }
    }, 1500);

    return () => {
      window.clearTimeout(openTimer);
      window.removeEventListener("scroll", updateEnquiryVisibility);
      window.removeEventListener("resize", updateEnquiryVisibility);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const focusId = window.setTimeout(() => nameRef.current?.focus(), 320);
    return () => window.clearTimeout(focusId);
  }, [open]);

  function close() {
    autoOpenCancelledRef.current = true;
    setOpen(false);
    launcherRef.current?.focus();
  }

  return (
    <div className={`lead-popup-root${enquiryVisible ? " is-suppressed" : ""}`}>
      <section
        className={`lead-popup${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="false"
        aria-labelledby="lead-popup-title"
        aria-hidden={!open}
        inert={!open}
      >
        <header className="lead-popup-head">
          <button
            className="lead-popup-close"
            type="button"
            aria-label="Close enquiry popup"
            onClick={close}
          >
            <X size={16} />
          </button>
          <p className="lead-popup-kicker">TALK TO OUR TEAM</p>
          <h2 id="lead-popup-title">Let&apos;s talk real estate.</h2>
          <p className="lead-popup-sub">
            Share your details and our team will explain the learning pathways,
            real-world assistance, and internship support with OneX Properties.
          </p>
        </header>

        <div className="lead-popup-body">
          {submitted ? (
            <div className="lead-popup-success" role="status">
              <span className="lead-popup-success-icon"><Check size={24} /></span>
              <h3>Thanks, we have your details.</h3>
              <p>One Stock Academy will contact you at your preferred time.</p>
              <button
                className="inline-link"
                type="button"
                onClick={resetSubmission}
              >
                Submit another enquiry <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <input name="source" type="hidden" value="lead-popup" />
              <label className="lead-popup-honeypot" aria-hidden="true">
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>

              <label htmlFor="lp-name">Full name</label>
              <input
                id="lp-name"
                name="name"
                ref={nameRef}
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                required
              />

              <label htmlFor="lp-phone">WhatsApp number</label>
              <div className="lead-popup-phone">
                <input
                  name="countryCode"
                  type="hidden"
                  value={`+${getCountryCallingCode(selectedCountry)}`}
                />
                <CountryCodePicker
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                />
                <input
                  id="lp-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel-national"
                  inputMode="tel"
                  placeholder="98765 43210"
                  required
                />
              </div>

              <label htmlFor="lp-pathway">Learning pathway</label>
              <select id="lp-pathway" name="pathway" defaultValue={specialistTracks[0].title}>
                {specialistTracks.map((track) => (
                  <option key={track.title} value={track.title}>{track.title}</option>
                ))}
              </select>

              <label htmlFor="lp-time">Preferred time to reach you</label>
              <select id="lp-time" name="preferredTime" defaultValue="" required>
                <option value="" disabled>Choose a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>

              <label htmlFor="lp-email">Email address</label>
              <input
                id="lp-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />

              <button className="button button-primary lead-popup-submit" type="submit" disabled={sending}>
                {sending ? "Sending..." : "Request a call"} <ArrowRight size={17} />
              </button>
              {submissionError ? (
                <p className="lead-popup-error" role="alert">{submissionError}</p>
              ) : (
                <p className="lead-popup-note">Your details will be shared with One Stock Academy to follow up on your enquiry.</p>
              )}
            </form>
          )}
        </div>
      </section>

      <button
        ref={launcherRef}
        className="lead-popup-launcher"
        type="button"
        aria-label={open ? "Hide enquiry popup" : "Show enquiry popup"}
        aria-expanded={open}
        onClick={() => {
          if (open) close();
          else {
            autoOpenCancelledRef.current = true;
            setOpen(true);
          }
        }}
      >
        <span className="lead-popup-ping" aria-hidden="true" />
        {open ? <X size={22} /> : <Phone size={23} />}
      </button>
    </div>
  );
}