import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { menu, menuNotes, type CategoryId, type Diet, type MenuGroup, type MenuItem } from '../data/menu'
import { useMode } from '../context/mode'
import { menuPhotos } from '../data/photos'
import { formatPrice } from '../lib/format'
import { Img } from './Img'
import { SectionHeading } from './SectionHeading'

type DietFilter = 'all' | Diet

const DIET_LABEL: Record<Diet, string> = { V: 'Vegetarian', VG: 'Vegan' }

function matches(item: MenuItem, filter: DietFilter) {
  if (filter === 'all') return true
  if (filter === 'VG') return item.diet === 'VG'
  return item.diet === 'V' || item.diet === 'VG'
}

function DietTag({ diet }: { diet: Diet }) {
  return (
    <abbr className={`diet-tag diet-tag--${diet.toLowerCase()}`} title={DIET_LABEL[diet]}>
      {diet}
    </abbr>
  )
}

function Dish({ item, groupPrice, nested }: { item: MenuItem; groupPrice?: number; nested: boolean }) {
  const Name = nested ? 'h4' : 'h3'
  const [picked, setPicked] = useState<string[]>([])
  const base = item.price ?? groupPrice
  const extra = (item.addOns ?? []).filter((a) => picked.includes(a.name)).reduce((s, a) => s + (a.price ?? 0), 0)

  function toggle(name: string) {
    setPicked((p) => (p.includes(name) ? p.filter((n) => n !== name) : [...p, name]))
  }

  return (
    <motion.li
      layout="position"
      className="dish"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
    >
      <div className="dish__head">
        <Name className="dish__name">
          {item.name}
          {item.diet && <DietTag diet={item.diet} />}
        </Name>
        <span className="dish__leader" aria-hidden="true" />
        {item.prices ? (
          <span className="dish__prices">
            {item.prices.map((p) => (
              <span key={p.label} className="dish__price">
                <span className="dish__price-label">{p.label}</span> {formatPrice(p.price)}
              </span>
            ))}
          </span>
        ) : (
          item.price !== undefined && (
            <span className="dish__price">
              {extra > 0 && <span className="visually-hidden">Total with extras </span>}
              {formatPrice(item.price + extra)}
            </span>
          )
        )}
      </div>
      {item.note && <p className="dish__note">{item.note}</p>}
      {item.description && <p className="dish__desc">{item.description}</p>}
      {item.addOns && item.addOns.length > 0 && (
        <div className="dish__addons">
          <span className="dish__addons-label">Customise</span>
          <ul className="chips" aria-label={`Extras for ${item.name}`}>
            {item.addOns.map((a) =>
              a.price !== undefined && base !== undefined ? (
                <li key={a.name}>
                  <button
                    type="button"
                    className="chip"
                    aria-pressed={picked.includes(a.name)}
                    onClick={() => toggle(a.name)}
                  >
                    {a.name} <span className="chip__price">+{formatPrice(a.price)}</span>
                  </button>
                </li>
              ) : (
                <li key={a.name}>
                  <span className="chip chip--static">{a.name}</span>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </motion.li>
  )
}

function Group({ group, filter }: { group: MenuGroup; filter: DietFilter }) {
  const items = group.items.filter((i) => matches(i, filter))
  if (items.length === 0) return null
  const compact = items.every((i) => !i.description && !i.addOns && !i.prices)
  const titled = Boolean(group.title || group.price)
  return (
    <div className="menu-group">
      {titled && (
        <h3 className="menu-group__title">
          {group.title}
          {group.price !== undefined && (
            <span className="menu-group__price">
              {formatPrice(group.price)} {group.priceLabel}
            </span>
          )}
        </h3>
      )}
      <ul className={`dishes${compact ? ' dishes--compact' : ''}`}>
        <AnimatePresence initial={false}>
          {items.map((i) => (
            <Dish key={i.name} item={i} groupPrice={group.price} nested={titled} />
          ))}
        </AnimatePresence>
      </ul>
      {group.extras && filter === 'all' && (
        <div className="dish__addons dish__addons--group">
          <span className="dish__addons-label">Extras</span>
          <ul className="chips">
            {group.extras.map((e) => (
              <li key={e.name}>
                <span className="chip chip--static">
                  {e.name}
                  {e.detail && <span className="chip__detail"> · {e.detail}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const FILTERS: { id: DietFilter; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'V', label: 'Vegetarian' },
  { id: 'VG', label: 'Vegan' },
]

export function Menu() {
  const { mode } = useMode()
  const defaultTab: CategoryId = mode === 'evening' ? 'tapas' : 'breakfast'
  const [active, setActive] = useState<CategoryId>(defaultTab)
  const [filter, setFilter] = useState<DietFilter>('all')
  const [tabsMode, setTabsMode] = useState(mode)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  // Re-open on the mode's signature tab whenever Day / Evening flips.
  if (tabsMode !== mode) {
    setTabsMode(mode)
    setActive(defaultTab)
  }

  // Keep the active tab centred in the strip without scrolling the page.
  useEffect(() => {
    const tab = tabRefs.current[active]
    const strip = tab?.parentElement
    if (!tab || !strip || strip.scrollWidth <= strip.clientWidth) return
    strip.scrollTo({ left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' })
  }, [active])

  const category = menu.find((c) => c.id === active)!
  const photo = menuPhotos[active]
  const visibleCount = useMemo(
    () => category.groups.reduce((n, g) => n + g.items.filter((i) => matches(i, filter)).length, 0),
    [category, filter],
  )

  function onTabKey(e: KeyboardEvent<HTMLDivElement>) {
    const i = menu.findIndex((c) => c.id === active)
    let next = -1
    if (e.key === 'ArrowRight') next = (i + 1) % menu.length
    if (e.key === 'ArrowLeft') next = (i - 1 + menu.length) % menu.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = menu.length - 1
    if (next < 0) return
    e.preventDefault()
    setActive(menu[next].id)
    tabRefs.current[menu[next].id]?.focus()
  }

  return (
    <section id="menu" className="section menu" aria-labelledby="menu-title">
      <div className="container">
        <SectionHeading
          id="menu-title"
          eyebrow="The menu"
          title={
            mode === 'evening' ? (
              <>
                Tapas, cocktails <em>&amp; more</em>
              </>
            ) : (
              <>
                Brunch, coffee <em>&amp; more</em>
              </>
            )
          }
          intro="Morning specialties, hearty brunch, nourishing açaí bowls, Spanish tapas and a cocktail list for later."
        />

        <LayoutGroup id="menu-tabs">
          <div className="menu-tabs" role="tablist" aria-label="Menu sections" onKeyDown={onTabKey}>
            {menu.map((c) => {
              const selected = c.id === active
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabRefs.current[c.id] = el
                  }}
                  role="tab"
                  type="button"
                  id={`tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls="menu-panel"
                  tabIndex={selected ? 0 : -1}
                  className={`menu-tab${selected ? ' is-active' : ''}`}
                  onClick={() => setActive(c.id)}
                >
                  {selected && (
                    <motion.span
                      layoutId="menu-tab-pill"
                      className="menu-tab__pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="menu-tab__label">{c.label}</span>
                </button>
              )
            })}
          </div>
        </LayoutGroup>

        <div className="menu-filters" role="group" aria-label="Dietary filter">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className="filter-chip"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.id !== 'all' && <DietTag diet={f.id} />}
              {f.label}
            </button>
          ))}
        </div>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="menu-panel" tabIndex={0}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className={`menu-panel__layout${photo ? ' has-photo' : ''}`}>
                {photo && (
                  <figure className="menu-panel__photo">
                    <Img name={photo.image} alt={photo.alt} sizes="(min-width: 960px) 30vw, 92vw" />
                  </figure>
                )}
                <div className="menu-panel__list">
                  {category.intro && <p className="menu-panel__intro">{category.intro}</p>}
                  {visibleCount === 0 ? (
                    <p className="menu-panel__empty">
                      Nothing {filter === 'VG' ? 'vegan' : 'vegetarian'} in {category.label} — try another section.
                    </p>
                  ) : (
                    category.groups.map((g, i) => <Group key={g.title ?? i} group={g} filter={filter} />)
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <ul className="menu-notes">
          {menuNotes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
