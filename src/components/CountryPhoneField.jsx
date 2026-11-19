import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import countryNames from "react-phone-number-input/locale/en";
import "./CountryPhoneField.css";

const countries = getCountries()
  .map((code) => ({
    code,
    name: countryNames[code],
    callingCode: `+${getCountryCallingCode(code)}`,
    Flag: flags[code],
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

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
    <div className="country-code-picker" ref={pickerRef}>
      <input
        name="countryCode"
        type="hidden"
        value={`+${getCountryCallingCode(value)}`}
      />
      <button
        ref={buttonRef}
        className="country-code-button"
        type="button"
        aria-label={`Country code: ${selectedCountry.name} ${selectedCountry.callingCode}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <SelectedFlag
          title={`${selectedCountry.name} flag`}
          aria-hidden="true"
        />
        <span>{selectedCountry.callingCode}</span>
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      {open && (
        <div
          className="country-code-menu"
          role="dialog"
          aria-label="Select country code"
        >
          <div className="country-code-search">
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
          <div className="country-code-list">
            {filteredCountries.length ? (
              filteredCountries.map(({ code, name, callingCode, Flag }) => (
                <button
                  key={code}
                  className="country-code-option"
                  type="button"
                  aria-pressed={code === value}
                  onClick={() => chooseCountry(code)}
                >
                  <Flag title={`${name} flag`} aria-hidden="true" />
                  <span>{name}</span>
                  <span>{callingCode}</span>
                </button>
              ))
            ) : (
              <p className="country-code-empty">No countries match your search.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CountryPhoneField({
  id,
  label,
  className = "",
  autoComplete = "tel-national",
  placeholder = "98765 43210",
}) {
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [phone, setPhone] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const phoneError = phoneTouched
    ? phone.length === 0
      ? "Phone number is required."
      : phone.length !== 10
        ? "Enter exactly 10 digits, excluding the country code."
        : ""
    : "";

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className={`country-phone-field ${className}`.trim()}>
        <CountryCodePicker
          value={selectedCountry}
          onChange={setSelectedCountry}
        />
        <input
          id={id}
          name="phone"
          type="tel"
          autoComplete={autoComplete}
          inputMode="numeric"
          pattern="[0-9]{10}"
          placeholder={placeholder}
          value={phone}
          aria-invalid={Boolean(phoneError)}
          aria-describedby={phoneError ? `${id}-error` : undefined}
          onBlur={() => setPhoneTouched(true)}
          onInvalid={(event) => {
            event.preventDefault();
            setPhoneTouched(true);
          }}
          onChange={(event) =>
            setPhone(event.currentTarget.value.replace(/\D/g, ""))
          }
          required
        />
      </div>
      {phoneError && (
        <p id={`${id}-error`} className="country-phone-error" role="alert">
          {phoneError}
        </p>
      )}
    </>
  );
}
