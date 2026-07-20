type BrandLogoProps = {
  variant?: "lockup" | "monogram";
  tone?: "light" | "dark";
  className?: string;
};

export default function BrandLogo({
  variant = "lockup",
  tone = "light",
  className = "",
}: BrandLogoProps) {
  const classes = [
    "brand-logo",
    `brand-logo--${variant}`,
    `brand-logo--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} aria-hidden="true">
      <span className="brand-logo-frame">
        <svg className="brand-logo-frame-art" viewBox="0 0 100 100" focusable="false">
          <path className="brand-logo-frame-top" d="M14 15H84V45" />
          <path className="brand-logo-frame-left" d="M14 32V86" />
          <path className="brand-logo-frame-bottom" d="M32 86H84V57" />
        </svg>
        {variant === "monogram" && (
          <span className="brand-logo-initials">
            <span>P</span>
            <span>M</span>
            <span>E</span>
          </span>
        )}
      </span>

      {variant === "lockup" && (
        <span className="brand-logo-wordmark">
          <span>Preserve</span>{" "}
          <span className="brand-logo-wordmark-accent">My</span>{" "}
          <span>Estate</span>
        </span>
      )}
    </span>
  );
}
