import { describe, expect, it, vi } from 'vitest'
import {
  atcoderLevel,
  buildAtCoderCalendar,
  buildGitHubCalendar,
  dateRange,
  fetchAllAtCoderSubmissions,
  toJstDate,
  type AtCoderSubmission,
} from '../../scripts/activity.ts'

describe('activity data', () => {
  it('creates an inclusive date range', () => {
    expect(dateRange('2026-09-28', '2026-09-30')).toEqual([
      '2026-09-28',
      '2026-09-29',
      '2026-09-30',
    ])
  })

  it('maps GitHub contribution levels and fills missing dates', () => {
    const calendar = buildGitHubCalendar(
      'lmorinn',
      '2026-09-28',
      '2026-09-30',
      [
        {
          date: '2026-09-28',
          contributionCount: 1,
          contributionLevel: 'FIRST_QUARTILE',
        },
        {
          date: '2026-09-30',
          contributionCount: 8,
          contributionLevel: 'FOURTH_QUARTILE',
        },
      ],
      '2026-09-30T00:00:00.000Z',
    )

    expect(calendar.total).toBe(9)
    expect(calendar.days).toEqual([
      { date: '2026-09-28', count: 1, level: 1 },
      { date: '2026-09-29', count: 0, level: 0 },
      { date: '2026-09-30', count: 8, level: 4 },
    ])
  })

  it('counts only the first accepted submission for each AtCoder problem in JST', () => {
    const epoch = (iso: string) => Math.floor(new Date(iso).getTime() / 1000)
    const submissions: AtCoderSubmission[] = [
      { id: 1, epoch_second: epoch('2026-09-01T14:59:00Z'), problem_id: 'a', result: 'WA' },
      { id: 2, epoch_second: epoch('2026-09-01T15:01:00Z'), problem_id: 'a', result: 'AC' },
      { id: 3, epoch_second: epoch('2026-09-02T10:00:00Z'), problem_id: 'a', result: 'AC' },
      { id: 4, epoch_second: epoch('2026-09-02T12:00:00Z'), problem_id: 'b', result: 'AC' },
    ]

    const calendar = buildAtCoderCalendar(
      'lmori',
      '2026-09-01',
      '2026-09-03',
      submissions,
      '2026-09-03T00:00:00.000Z',
    )

    expect(toJstDate(epoch('2026-09-01T15:01:00Z'))).toBe('2026-09-02')
    expect(calendar.days).toEqual([
      { date: '2026-09-01', count: 0, level: 0 },
      { date: '2026-09-02', count: 2, level: 2 },
      { date: '2026-09-03', count: 0, level: 0 },
    ])
    expect(calendar.total).toBe(2)
    expect([0, 1, 2, 3, 4, 5].map(atcoderLevel)).toEqual([0, 1, 2, 3, 3, 4])
  })

  it('paginates AtCoder submissions after each 500-item response', async () => {
    const firstPage = Array.from({ length: 500 }, (_, index) => ({
      id: index,
      epoch_second: 1000 + index,
      problem_id: 'problem-' + index,
      result: 'AC',
    }))
    const secondPage = [{ id: 501, epoch_second: 2000, problem_id: 'last-problem', result: 'AC' }]
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response(JSON.stringify(firstPage), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify(secondPage), { status: 200 }))
    const sleep = vi.fn(async () => undefined)

    const submissions = await fetchAllAtCoderSubmissions('lmori', fetcher, sleep)

    expect(submissions).toHaveLength(501)
    expect(fetcher).toHaveBeenCalledTimes(2)
    expect(String(fetcher.mock.calls[1]?.[0])).toContain('from_second=1500')
    expect(sleep).toHaveBeenCalledWith(1100)
  })
})
