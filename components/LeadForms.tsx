"use client";

import { useState } from "react";
import Link from "next/link";

const ASSET_OPTIONS = ["Under $1M", "$1M–$2M", "$2M–$3M", "$3M–$5M", "$5M–$10M", "Over $10M"];

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

/* Review request only — educational guides are free on-site at /guides (no fake PDF download). */
export function BookingForm() {
  const [done, setDone] = useState(false);

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
        <div className="form-success show">
          <div className="tick-big">✓</div>
          <h3>Request received</h3>
          <p className="small">
            You&apos;ll hear from Michael&apos;s office within one business day. Meanwhile, explore our{" "}
            <Link href="/guides">estate planning guides</Link> or the{" "}
            <Link href="/calculator">estate tax calculator</Link>.
          </p>
        </div>
      ) : (
        <>
          <h3>Request a Complimentary Review</h3>
          <p className="form-sub">
            For Massachusetts families with $2M+ in investable assets. Takes about 60 seconds.
          </p>
          <div className="field-row">
            <Input id="b-first" label="First Name" required />
            <Input id="b-last" label="Last Name" required />
          </div>
          <div className="field-row">
            <Input id="b-email" label="Email" type="email" required />
            <Input id="b-phone" label="Phone" type="tel" required />
          </div>
          <Select id="b-assets" label="Approximate Investable Assets" options={ASSET_OPTIONS} required />
          <div className="field">
            <label htmlFor="b-notes">Anything specific you&apos;d like to cover? (optional)</label>
            <textarea id="b-notes" name="b-notes" rows={3}></textarea>
          </div>
          <button className="btn btn-navy" type="submit">
            Request a Complimentary Review
          </button>
          <p className="fine" style={{ marginTop: "1rem" }}>
            By submitting, you agree to be contacted by Michael Cammarata, CFP®, at MSA Financial,
            LLC. Your information is never sold. Form delivery to our CRM may be configured at
            integration; until then, please also call{" "}
            <a href="tel:+17818433500">(781) 843-3500</a> if your request is time-sensitive.
          </p>
        </>
      )}
    </form>
  );
}
