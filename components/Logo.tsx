// GSLA horizontal lockup (Nov 2026 logo concept): bold initials, terracotta rule,
// spaced two-line wordmark. Rendered as text in Montserrat so it stays crisp and
// costs no image request. Colors come from CSS (.logo) so it can sit on navy or white.
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`logo ${className}`.trim()} aria-hidden="true">
      <span className="logo-initials">GSLA</span>
      <span className="logo-rule" />
      <span className="logo-words">
        <span>General</span>
        <span>Surgery LA</span>
      </span>
    </span>
  );
}
