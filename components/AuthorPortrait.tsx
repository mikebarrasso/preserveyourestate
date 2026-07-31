type AuthorPortraitProps = {
  className?: string;
};

export default function AuthorPortrait({ className = "portrait-mono" }: AuthorPortraitProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/michael-cammarata.jpg"
      alt="Michael Cammarata, CFP®"
      width={256}
      height={256}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}
