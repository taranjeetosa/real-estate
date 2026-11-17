import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, MessageCircle, X } from "lucide-react";
import { specialistTracks } from "../data/aiCourse.js";
import useLeadSheetSubmission from "../hooks/useLeadSheetSubmission.js";
import "./LeadPopup.css";

const countryCodes = [
  { code: "+91", label: "IN +91" },
  { code: "+971", label: "UAE +971" },
  { code: "+1", label: "US +1" },
  { code: "+44", label: "UK +44" },
  { code: "+65", label: "SG +65" },
];

const timeSlots = [
  "Morning (9 AM – 12 PM)",
  "Afternoon (12 PM – 4 PM)",
  "Evening (4 PM – 8 PM)",
];

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [enquiryVisible, setEnquiryVisible] = useState(false);
  const launcherRef = useRef(null);
  const nameRef = useRef(null);
  const formRef = useRef(null);
  const responseFrameRef = useRef(null);
  const requestIdInputRef = useRef(null);
  const autoOpenCancelledRef = useRef(false);
  const viewedEnquiryRef = useRef(false);
  const enquiryVisibleRef = useRef(false);
  const {
    actionUrl,
    handleSubmit,
    resetSubmission,
    sending,
    submitted,
    error: submissionError,
  } = useLeadSheetSubmission({ formRef, responseFrameRef, requestIdInputRef });

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
              action={actionUrl}
              method="post"
              target="popup-lead-sheet-response"
              onSubmit={handleSubmit}
            >
              <input ref={requestIdInputRef} name="requestId" type="hidden" />
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
                <select name="countryCode" aria-label="Country code" defaultValue="+91">
                  {countryCodes.map(({ code, label }) => (
                    <option key={code} value={code}>{label}</option>
                  ))}
                </select>
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
        {open ? <X size={22} /> : <MessageCircle size={24} />}
      </button>
      <iframe
        ref={responseFrameRef}
        className="lead-popup-response-frame"
        name="popup-lead-sheet-response"
        title="Lead submission response"
      />
    </div>
  );
}