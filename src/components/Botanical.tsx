/** Five-petal blossom, after the pink blossom canopy over Flora's tables. */
export function Blossom({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g fill="currentColor">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="12" cy="6.4" rx="3.3" ry="4.6" transform={`rotate(${r} 12 12)`} />
        ))}
      </g>
      <circle cx="12" cy="12" r="2.1" fill="var(--blossom-heart, #f6f2ec)" />
    </svg>
  )
}
