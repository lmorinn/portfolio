import { expect, test } from '@playwright/test'

test('navigates between all SPA routes and preserves profile content', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'TOP', exact: true })).toBeVisible()

  await page.getByRole('link', { name: 'ABOUT', exact: true }).first().click()
  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByText('コンピュータ理工学科4年')).toBeVisible()

  await page.goto('/works')
  await expect(page.getByRole('heading', { name: 'WORKS', exact: true })).toBeVisible()
})

test('shows updated work links in the fullscreen dialog', async ({ page }) => {
  await page.goto('/works')
  await page.getByRole('button', { name: /ポートフォリオ\(New\)/ }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/lmorinn/portfolio',
  )
  await expect(dialog.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'rel',
    'noopener noreferrer',
  )

  await dialog.getByRole('button', { name: /閉じる/ }).click()
  await page.getByRole('button', { name: /WeBrain/ }).click()
  await expect(page.getByRole('dialog').getByRole('link', { name: 'GitHub' })).toHaveCount(0)
})

test('renders both activity calendars and the single GitHub footer link', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'ACTIVITY' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'GitHub Contributions' })).toHaveAttribute(
    'href',
    'https://github.com/lmorinn',
  )
  await expect(page.getByRole('link', { name: 'AtCoder Problems' })).toHaveAttribute(
    'href',
    'https://atcoder.jp/users/lmori',
  )

  const githubLinks = page.locator('footer a[href^="https://github.com/"]')
  await expect(githubLinks).toHaveCount(1)
  await expect(githubLinks).toHaveAttribute('href', 'https://github.com/lmorinn')
})
