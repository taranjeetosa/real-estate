import { useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";
const RESPONSE_TIMEOUT_MS = 20000;

export default function useLeadSheetSubmission({ formRef }) {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const timeoutRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSending(true);

    const controller = new AbortController();
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(
      () => controller.abort(),
      RESPONSE_TIMEOUT_MS,
    );

    const payload = Object.fromEntries(new FormData(formRef.current).entries());

    try {
      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const body = await response.json().catch(() => ({}));

      if (response.status === 429) {
        setError("Too many attempts, please try again later.");
      } else if (!response.ok) {
        setError(body.message || "We couldn't send your request. Please try again or contact our team.");
      } else {
        setSubmitted(true);
      }
    } catch (submissionError) {
      setError(
        submissionError.name === "AbortError"
          ? "We couldn't send your request just now. Please try again or contact our team."
          : "We couldn't send your request. Please try again or contact our team.",
      );
    } finally {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setSending(false);
    }
  }

  function resetSubmission() {
    setSubmitted(false);
    setError("");
  }

  return { handleSubmit, resetSubmission, sending, submitted, error };
}
