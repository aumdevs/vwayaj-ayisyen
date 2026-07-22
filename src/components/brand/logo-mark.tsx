type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M24 3 42 13v22L24 45 6 35V13L24 3Z" fill="currentColor" opacity="0.12" />
      <path d="M24 8 37 15.5v15L24 38l-13-7.5v-15L24 8Z" stroke="currentColor" strokeWidth="2.4" />
      <path d="m24 13 4.5 11L24 35l-4.5-11L24 13Z" fill="currentColor" />
      <circle cx="24" cy="24" r="3.2" fill="white" />
    </svg>
  );
}
