import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppFooter from '@/components/AppFooter.vue'
import HistoryTimeline from '@/components/HistoryTimeline.vue'
import HomeAbout from '@/components/HomeAbout.vue'
import MainSkills from '@/components/MainSkills.vue'
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

  it('uses the application development label on TOP and ABOUT', () => {
    const top = shallowMount(HomeAbout, {
      global: { stubs: { ElDivider: true, ElIcon: true, Monitor: true, Setting: true } },
    }).text()
    const about = shallowMount(MainSkills, {
      global: { stubs: { ElIcon: true, ArrowDown: true, Monitor: true, Setting: true } },
    }).text()

    expect(top).toContain('アプリケーション開発')
    expect(about).toContain('アプリケーション開発')
    expect(top).not.toContain('webアプリケーション開発')
    expect(about).not.toContain('webアプリケーション開発')
  })

  it('shows the updated activity history', () => {
    const wrapper = shallowMount(HistoryTimeline, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          ElTimeline: { template: '<div><slot /></div>' },
          ElTimelineItem: { template: '<div><slot /></div>' },
          ElAvatar: true,
          ElCard: { template: '<div><slot /></div>' },
        },
      },
    })
    const text = wrapper.text()

    expect(text).toContain('AtCoder Algorithm Rating1200到達')
    expect(text).toContain(
      '会津大学イノベーション・創業教育プログラム シリコンバレーインターンシッププログラム 参加',
    )
    expect(text).not.toContain('ポートフォリオの作成')
    expect(text).not.toContain('ポートフォリオv2作成')
  })

  it('keeps only the lmorinn footer link and renders the current year', () => {
    const wrapper = shallowMount(AppFooter, {
      global: { stubs: { FontAwesomeIcon: true } },
    })
    const html = wrapper.html()
    expect(html).toContain('https://github.com/lmorinn')
    expect(html).not.toContain('kotaok')
    expect(wrapper.text()).toContain(String(new Date().getFullYear()))
    expect(html).toContain('color="#f8f9fa"')
  })
})
