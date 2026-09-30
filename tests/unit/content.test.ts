import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppFooter from '@/components/AppFooter.vue'
import HomeAbout from '@/components/HomeAbout.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import { works } from '@/data/works'

describe('portfolio content migration', () => {
  it('removes every kotaok work link and points the current portfolio to lmorinn', () => {
    expect(JSON.stringify(works)).not.toContain('github.com/kotaok')
    const portfolio = works.find((work) => work.name === 'ポートフォリオ(New)')
    expect(portfolio?.github).toBe('https://github.com/lmorinn/portfolio')
    expect(portfolio?.lang).toContain('Vue 3')
    expect(portfolio?.lang).toContain('Cloudflare Pages')
  })

  it('shows fourth-year profile text in both locations', () => {
    const stubs = { ElDivider: true, ElIcon: true, Monitor: true, Setting: true }
    expect(shallowMount(HomeAbout, { global: { stubs } }).text()).toContain(
      'コンピュータ理工学科 4年',
    )
    expect(shallowMount(ProfileCard, { global: { stubs: { ElAvatar: true } } }).text()).toContain(
      'コンピュータ理工学科4年',
    )
  })

  it('keeps only the lmorinn footer link and renders the current year', () => {
    const wrapper = shallowMount(AppFooter, {
      global: { stubs: { FontAwesomeIcon: true } },
    })
    const html = wrapper.html()
    expect(html).toContain('https://github.com/lmorinn')
    expect(html).not.toContain('kotaok')
    expect(wrapper.text()).toContain(String(new Date().getFullYear()))
  })
})
