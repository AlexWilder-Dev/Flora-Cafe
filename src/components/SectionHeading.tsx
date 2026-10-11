import type { ReactNode } from 'react'

interface Props {
  id: string
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'start' | 'center'
}

export function SectionHeading({ id, eyebrow, title, intro, align = 'start' }: Props) {
  return (
    <header className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="eyebrow eyebrow--rule">{eyebrow}</p>}
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  )
}
