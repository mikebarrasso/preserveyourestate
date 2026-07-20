"use client";

import { useEffect, useState } from "react";

/* Front-end demo forms, wire to CRM/Convert at integration. */

const ASSET_OPTIONS = ["Under $1M", "$1M–$2M", "$2M–$3M", "$3M–$5M", "$5M–$10M", "Over $10M"];
const TIMELINE_OPTIONS = [
  "Already Retired", "Within 2 Years", "3–5 Years", "6–10 Years", "More Than 10 Years",
];
const CONCERN_OPTIONS = [
  "Massachusetts Estate Tax", "Roth Conversion Strategy", "Trust Funding & Structure", "Tax-Efficient Investing", "RMD Planning", "Multiple: I need comprehensive coordination",
];

function Select({ id, label, options, required = false }: { id: string; label: string; options: string[]; required?: boolean }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={id} required={required} defaultValue="">
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Input({ id, label, type = "text", required = false }: { id: string; label: string; type?: string; required?: boolean }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} type={type} required={required} />
    </div>
  );
}

function Success({ title, body }: { title: string; body: string }) {
  return (
    <div className="form-success show">
      <div className="tick-big">✓</div>
      <h3>{title}</h3>
      <p className="small">{body}</p>
    </div>
  );
}

type Intent = "review" | "guide";

/* Single lead form serving both conversion paths. Linking to #booking-guide
   (the form's own id) pre-selects the guide intent. */
export function BookingForm() {
  const [done, setDone] = useState(false);
  const [intent, setIntent] = useState<Intent>("review");

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === "#booking-guide") setIntent("guide");
      else if (window.location.hash === "#booking") setIntent("review");
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const isReview = intent === "review";

  return (
    <form
      id="booking-guide"
      className="form-card reveal-scale"
      style={{ border: "1px solid var(--line)" }}
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      {done ? (
        <Success
          title={isReview ? "Request received" : "Check your inbox"}
          body={
            isReview
              ? "You'll hear from Michael's office within one business day. (Demo build, form submissions will connect to your CRM at integration.)"
              : "The guide is on its way. (Demo build, form submissions will connect to your CRM at integration.)"
          }
        />
      ) : (
        <>
          <h3>{isReview ? "Request a Complimentary Review" : "Download the Free Guide"}</h3>
          <div className="intent-toggle" role="radiogroup" aria-label="What would you like?">
            <button
              type="button"
              className={isReview ? "on" : ""}
              role="radio"
              aria-checked={isReview}
              onClick={() => setIntent("review")}
            >
              The 45-Minute Review
            </button>
            <button
              type="button"
              className={!isReview ? "on" : ""}
              role="radio"
              aria-checked={!isReview}
              onClick={() => setIntent("guide")}
            >
              Just the Free Guide
            </button>
          </div>
          <p className="form-sub">
            {isReview
              ? "For Massachusetts families with $2M+ in investable assets."
              : "Delivered immediately by email."}
          </p>
          <div className="field-row">
            <Input id="b-first" label="First Name" required />
            <Input id="b-last" label="Last Name" required />
          </div>
          <div className="field-row">
            <Input id="b-email" label="Email" type="email" required />
            <Input id="b-phone" label={isReview ? "Phone" : "Phone (optional)"} type="tel" required={isReview} />
          </div>
          <div className="field-row">
            <Select id="b-assets" label="Approximate Investable Assets" options={ASSET_OPTIONS} required />
            <Select id="b-timeline" label="Retirement Timeline" options={TIMELINE_OPTIONS} />
          </div>
          <Select id="b-concern" label="Primary Planning Concern" options={CONCERN_OPTIONS} />
          {isReview && (
            <>
              <Select id="b-time" label="Best Time to Reach" options={["Morning", "Afternoon", "Evening"]} />
              <div className="field">
                <label htmlFor="b-notes">Anything specific you&apos;d like to cover?</label>
                <textarea id="b-notes" name="b-notes" rows={3}></textarea>
              </div>
            </>
          )}
          <button className={`btn ${isReview ? "btn-navy" : "btn-gold"}`} type="submit">
            {isReview ? "Request a Complimentary Review" : "Download the Free Guide"}
          </button>
          <p className="fine" style={{ marginTop: "1rem" }}>
            {isReview
              ? "By submitting this form, you agree to be contacted by Michael Cammarata, CFP®, at MSA Financial, LLC. Your information is never sold or shared."
              : "Michael Cammarata, CFP®, is a fiduciary. Your information is never sold or shared with third parties."}
          </p>
        </>
      )}
    </form>
  );
}
