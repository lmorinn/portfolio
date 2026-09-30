import type { ActivityCalendar, ActivityDay, ActivityLevel } from '../src/types/activity.ts'

export interface GitHubContributionDay {
  date: string
  contributionCount: number
  contributionLevel: string
}

export interface AtCoderSubmission {
  id: number
  epoch_second: number
  problem_id: string
  result: string
}

type Fetcher = typeof fetch
type Sleeper = (milliseconds: number) => Promise<void>

const githubLevels: Record<string, ActivityLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

export function dateRange(from: string, to: string): string[] {
  const start = new Date(from + 'T00:00:00Z')
  const end = new Date(to + 'T00:00:00Z')
  const dates: string[] = []

  for (const date = new Date(start); date <= end; date.setUTCDate(date.getUTCDate() + 1)) {
    dates.push(date.toISOString().slice(0, 10))
  }
  return dates
}

export function githubLevel(level: string): ActivityLevel {
  return githubLevels[level] ?? 0
}

export function atcoderLevel(count: number): ActivityLevel {
  if (count <= 0) return 0
  if (count === 1) return 1
  if (count === 2) return 2
  if (count <= 4) return 3
  return 4
}

export function toJstDate(epochSecond: number): string {
  return new Date((epochSecond + 9 * 60 * 60) * 1000).toISOString().slice(0, 10)
}

export function buildGitHubCalendar(
  username: string,
  from: string,
  to: string,
  contributionDays: GitHubContributionDay[],
  generatedAt: string,
): ActivityCalendar {
  const byDate = new Map(contributionDays.map((day) => [day.date, day]))
  const days: ActivityDay[] = dateRange(from, to).map((date) => {
    const source = byDate.get(date)
    return {
      date,
      count: source?.contributionCount ?? 0,
      level: source ? githubLevel(source.contributionLevel) : 0,
    }
  })

  return {
    provider: 'github',
    username,
    from,
    to,
    total: days.reduce((total, day) => total + day.count, 0),
    generatedAt,
    days,
  }
}

export function buildAtCoderCalendar(
  username: string,
  from: string,
  to: string,
  submissions: AtCoderSubmission[],
  generatedAt: string,
): ActivityCalendar {
  const firstAccepted = new Map<string, AtCoderSubmission>()

  for (const submission of [...submissions].sort((a, b) => a.epoch_second - b.epoch_second)) {
    if (submission.result === 'AC' && !firstAccepted.has(submission.problem_id)) {
      firstAccepted.set(submission.problem_id, submission)
    }
  }

  const countByDate = new Map<string, number>()
  for (const submission of firstAccepted.values()) {
    const date = toJstDate(submission.epoch_second)
    if (date >= from && date <= to) {
      countByDate.set(date, (countByDate.get(date) ?? 0) + 1)
    }
  }

  const days: ActivityDay[] = dateRange(from, to).map((date) => {
    const count = countByDate.get(date) ?? 0
    return { date, count, level: atcoderLevel(count) }
  })

  return {
    provider: 'atcoder',
    username,
    from,
    to,
    total: days.reduce((total, day) => total + day.count, 0),
    generatedAt,
    days,
  }
}

export async function fetchAllAtCoderSubmissions(
  username: string,
  fetcher: Fetcher = fetch,
  sleep: Sleeper = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
): Promise<AtCoderSubmission[]> {
  const submissions: AtCoderSubmission[] = []
  let cursor = 0

  for (let page = 0; page < 100; page += 1) {
    const url =
      'https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=' +
      encodeURIComponent(username) +
      '&from_second=' +
      cursor
    const response = await fetcher(url)
    if (!response.ok) throw new Error('AtCoder Problems API returned ' + response.status)

    const batch = (await response.json()) as AtCoderSubmission[]
    if (!Array.isArray(batch)) throw new Error('AtCoder Problems API returned invalid data')
    submissions.push(...batch)

    if (batch.length < 500) return submissions
    const last = batch.at(-1)
    if (!last || last.epoch_second < cursor) throw new Error('AtCoder pagination did not advance')
    cursor = last.epoch_second + 1
    await sleep(1100)
  }

  throw new Error('AtCoder pagination exceeded the safety limit')
}

export async function fetchGitHubCalendar(
  username: string,
  from: string,
  to: string,
  token: string,
  generatedAt: string,
  fetcher: Fetcher = fetch,
): Promise<ActivityCalendar> {
  const query = [
    'query($login: String!, $from: DateTime!, $to: DateTime!) {',
    '  user(login: $login) {',
    '    contributionsCollection(from: $from, to: $to) {',
    '      contributionCalendar {',
    '        weeks { contributionDays { date contributionCount contributionLevel } }',
    '      }',
    '    }',
    '  }',
    '}',
  ].join('\n')

  const response = await fetcher('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      'User-Agent': 'lmorinn-portfolio-activity-builder',
    },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        from: new Date(from + 'T00:00:00+09:00').toISOString(),
        to: new Date(to + 'T23:59:59+09:00').toISOString(),
      },
    }),
  })
  if (!response.ok) throw new Error('GitHub GraphQL API returned ' + response.status)

  const payload = (await response.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            weeks?: Array<{ contributionDays?: GitHubContributionDay[] }>
          }
        }
      }
    }
    errors?: Array<{ message: string }>
  }
  if (payload.errors?.length) {
    throw new Error('GitHub GraphQL API error: ' + payload.errors[0]?.message)
  }

  const weeks = payload.data?.user?.contributionsCollection?.contributionCalendar?.weeks
  if (!weeks) throw new Error('GitHub contribution calendar was missing')

  return buildGitHubCalendar(
    username,
    from,
    to,
    weeks.flatMap((week) => week.contributionDays ?? []),
    generatedAt,
  )
}
