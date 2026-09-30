import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  buildAtCoderCalendar,
  fetchAllAtCoderSubmissions,
  fetchGitHubCalendar,
} from './activity.ts'
import type { ActivityDataFile } from '../src/types/activity.ts'

const githubUsername = 'lmorinn'
const atcoderUsername = 'lmori'
const token = process.env.GITHUB_TOKEN

if (!token) {
  throw new Error('GITHUB_TOKEN is required to generate activity data')
}

const generatedAt = new Date().toISOString()
const to = formatDateInJst(new Date())
const start = new Date(to + 'T00:00:00Z')
start.setUTCDate(start.getUTCDate() - 364)
const from = start.toISOString().slice(0, 10)

const [github, atcoderSubmissions] = await Promise.all([
  fetchGitHubCalendar(githubUsername, from, to, token, generatedAt),
  fetchAllAtCoderSubmissions(atcoderUsername),
])

const data: ActivityDataFile = {
  calendars: [
    github,
    buildAtCoderCalendar(atcoderUsername, from, to, atcoderSubmissions, generatedAt),
  ],
}

const currentDirectory = dirname(fileURLToPath(import.meta.url))
const output = resolve(currentDirectory, '../public/data/activity.json')
await mkdir(dirname(output), { recursive: true })
await writeFile(output, JSON.stringify(data, null, 2) + '\n')

console.log(
  'Generated activity data for ' +
    githubUsername +
    ' and ' +
    atcoderUsername +
    ' (' +
    from +
    ' to ' +
    to +
    ')',
)

function formatDateInJst(date: Date) {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}
