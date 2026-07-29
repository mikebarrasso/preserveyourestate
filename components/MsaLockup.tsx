import Image from "next/image";

export default function MsaLockup() {
  return (
    <a
      className="msa-lockup"
      href="https://www.msaplan.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit MSA Financial"
    >
      <Image
        className="msa-logo"
        src="/msa-financial-logo.png"
        alt="MSA Financial — Financial Planning, Asset Management, Since 1997"
        width={600}
        height={132}
        sizes="(max-width: 640px) 240px, 300px"
      />
    </a>
  );
}
