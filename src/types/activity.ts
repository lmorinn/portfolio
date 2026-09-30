export type ActivityProvider = 'github' | 'atcoder'
export type ActivityLevel = 0 | 1 | 2 | 3 | 4

export interface ActivityDay {
  date: string
  count: number
  level: ActivityLevel
}

export interface ActivityCalendar {
  provider: ActivityProvider
  username: string
  from: string
  to: string
  total: number
  generatedAt: string
  days: ActivityDay[]
}

export interface ActivityDataFile {
  calendars: ActivityCalendar[]
}
