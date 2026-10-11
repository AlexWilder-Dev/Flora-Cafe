/** Line-drawn sprig used as a quiet ornament; colours come from the current theme. */
export function Sprig({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 160" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M60 156C58 118 62 76 76 8" />
        <path d="M62 128c-14-6-24-18-26-34 14 4 24 16 26 34Z" />
        <path d="M63 104c12-8 26-10 38-4-10 10-24 12-38 4Z" />
        <path d="M65 78c-12-8-18-22-16-36 12 8 18 20 16 36Z" />
        <path d="M68 56c10-10 22-14 34-10-8 12-20 16-34 10Z" />
        <path d="M72 32c-8-8-10-18-8-28 8 6 11 16 8 28Z" />
      </g>
    </svg>
  )
}

export function Divider() {
  return (
    <svg className="divider" viewBox="0 0 160 16" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M2 8h60M98 8h60" />
        <path d="M80 2c-6 2-9 4-9 6s3 4 9 6c6-2 9-4 9-6s-3-4-9-6Z" />
      </g>
    </svg>
  )
}
