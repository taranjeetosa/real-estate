import { useEffect, useRef, useState } from "react";

const SHEETS_WEB_APP_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL;
const RESPONSE_TIMEOUT_MS = 20000;

function isGoogleAppsScriptUrl(value) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "script.google.com" &&
      /^\/macros\/s\/[^/]+\/exec$/.test(url.pathname)
    );
  } catch {
    return false;
  }
}

function isMessageFromFrame(source, frameWindow) {
  let currentWindow = source;

  for (let depth = 0; currentWindow && depth < 8; depth += 1) {
    if (currentWindow === frameWindow) return true;
    try {
      if (currentWindow.parent === currentWindow) return false;
      currentWindow = currentWindow.parent;
    } catch {
      return false;
    }
  }

  return false;
}

export default function useLeadSheetSubmission({
  formRef,
  responseFrameRef,
  requestIdInputRef,
}) {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const requestIdRef = useRef("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    function handleResponse(event) {
      if (!isMessageFromFrame(event.source, responseFrameRef.current?.contentWindow)) {
        return;
      }
      if (
        event.data?.type !== "REAL_ESTATE_LEAD_SUBMISSION" ||
        event.data.requestId !== requestIdRef.current
      ) {
        return;
      }

      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      requestIdRef.current = "";
      setSending(false);

      if (event.data.ok) {
        setError("");
        setSubmitted(true);
      } else {
        setError("We couldn't send your request. Please try again or contact our team.");
      }
    }

    window.addEventListener("message", handleResponse);
    return () => {
      window.removeEventListener("message", handleResponse);
      window.clearTimeout(timeoutRef.current);
    };
  }, [responseFrameRef]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!isGoogleAppsScriptUrl(SHEETS_WEB_APP_URL)) {
      setError("This form is temporarily unavailable. Please contact our team directly.");
      return;
    }

    const requestId = window.crypto.randomUUID();
    requestIdRef.current = requestId;
    requestIdInputRef.current.value = requestId;
    setError("");
    setSending(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      requestIdRef.current = "";
      setSending(false);
      setError("We couldn't send your request just now. Please try again or contact our team.");
    }, RESPONSE_TIMEOUT_MS);
    formRef.current.submit();
  }

  function resetSubmission() {
    setSubmitted(false);
    setError("");
  }

  return {
    actionUrl: SHEETS_WEB_APP_URL,
    handleSubmit,
    resetSubmission,
    sending,
    submitted,
    error,
  };
}
