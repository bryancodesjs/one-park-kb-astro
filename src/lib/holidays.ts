// Federal holidays for the displayed year. Keep this small + manual — easy to update.
// Each entry: ISO date, short label, longer description.

export interface FederalHoliday {
  date: string // 'YYYY-MM-DD'
  name: string
  short: string
}

const HOLIDAYS_2026: FederalHoliday[] = [
  { date: '2026-01-01', name: "New Year's Day", short: 'NYE' },
  { date: '2026-01-19', name: 'Martin Luther King Jr. Day', short: 'MLK' },
  { date: '2026-02-16', name: "Presidents' Day", short: 'Pres' },
  { date: '2026-05-25', name: 'Memorial Day', short: 'Mem' },
  { date: '2026-06-19', name: 'Juneteenth', short: 'Junet' },
  { date: '2026-07-03', name: 'Independence Day (observed)', short: 'July 4' },
  { date: '2026-09-07', name: 'Labor Day', short: 'Labor' },
  { date: '2026-10-12', name: 'Columbus Day', short: 'Col' },
  { date: '2026-11-11', name: 'Veterans Day', short: 'Vets' },
  { date: '2026-11-26', name: 'Thanksgiving', short: 'Thx' },
  { date: '2026-12-25', name: 'Christmas Day', short: 'Xmas' },
]

const ALL: Record<number, FederalHoliday[]> = {
  2026: HOLIDAYS_2026,
}

export function holidaysForMonth(year: number, monthIndex: number): Map<number, FederalHoliday> {
  const list = ALL[year] ?? []
  const map = new Map<number, FederalHoliday>()
  for (const h of list) {
    const [y, m, d] = h.date.split('-').map(Number)
    if (y === year && m - 1 === monthIndex) map.set(d, h)
  }
  return map
}
