/**
 * Samples a damped spring (0 → 1) into a CSS `linear()` easing so the
 * Web Animations API can run spring motion on view-transition pseudo-elements.
 */
export function springEasing({ stiffness = 120, damping = 18, mass = 1, samples = 48 } = {}) {
  const omega = Math.sqrt(stiffness / mass)
  const zeta = damping / (2 * Math.sqrt(stiffness * mass))

  const position = (t: number) => {
    if (zeta < 1) {
      const wd = omega * Math.sqrt(1 - zeta * zeta)
      return 1 - Math.exp(-zeta * omega * t) * (Math.cos(wd * t) + ((zeta * omega) / wd) * Math.sin(wd * t))
    }
    return 1 - Math.exp(-omega * t) * (1 + omega * t)
  }

  // Settle when the envelope is within 0.1% of rest.
  const duration = Math.min(4, Math.max(0.3, -Math.log(0.001) / (zeta * omega)))
  const points: string[] = []
  for (let i = 0; i <= samples; i++) {
    points.push(position((i / samples) * duration).toFixed(4))
  }
  points[points.length - 1] = '1'
  return { easing: `linear(${points.join(', ')})`, duration: Math.round(duration * 1000) }
}
