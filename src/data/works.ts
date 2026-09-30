export interface WorkItem {
  name: string
  path: string
  text: string
  lang: string
  github: string | null
  link: string | null
  summary: string | null
}

export const works: WorkItem[] = [
  {
    name: 'SlackBot',
    path: '/img/develop.jpg',
    text: 'Pythonで開発した翻訳Bot',
    lang: 'Python,Slack API',
    github: null,
    link: null,
    summary:
      'メッセージを投稿すると日本語→英語に翻訳してくれるBotを開発しました。開発にはPythonのslackbotライブラリ、Translatorライブラリを使用しています。',
  },
  {
    name: 'ポートフォリオ',
    path: '/img/develop.jpg',
    text: 'HTMLとCSSで製作した、はじめてのポートフォリオ',
    lang: 'HTML・CSS、JavaScript',
    github: null,
    link: null,
    summary:
      'HTML・CSSを使い、制作したポートフォリオです。レスポンシブデザインを意識してページを作成しました。',
  },
  {
    name: 'WeBrain',
    path: '/img/webrain.png',
    text: '「ブレインストーミング」のアイデアを出し合えるチャットアプリ',
    lang: 'Node.js/Express、Firebase Authentication、Realtimedatabase',
    github: null,
    link: 'https://storm-webrain.herokuapp.com/',
    summary:
      'ブレストのアイデアを共有できるwebチャットアプリです。メッセージの保存、反映にはFirebaseのRealtimeDatabaseを活用しています。',
  },
  {
    name: 'ポートフォリオ(New)',
    path: '/img/portfolio_image.png',
    text: 'Vue.jsを使って開発した新しいポートフォリオ',
    lang: 'Vue 3、TypeScript、Vite、Cloudflare Pages',
    github: 'https://github.com/lmorinn/portfolio',
    link: null,
    summary: 'Vueの学習を兼ねて、新しく制作したポートフォリオです。',
  },
  {
    name: '異能vation プロトタイプ作成',
    path: '/img/develop.jpg',
    text: 'Vue.jsでプロトタイプ作成',
    lang: 'Vue.js',
    github: null,
    link: null,
    summary:
      '異能vationに応募したアイデアのプロトタイプ作成を行いました。SNSアプリを想定し、webアプリ内でユーザー登録からプロフィールの設定機能の実装等をしています。',
  },
  {
    name: 'emocha 絵文字チャットアプリ',
    path: '/img/face.png',
    text: '絵文字チャットアプリの作成',
    lang: 'Vue.js',
    github: null,
    link: 'https://emocha-ee72b.web.app/',
    summary: '絵文字だけでチャットできるwebアプリを開発しました。',
  },
  {
    name: '競技プログラミングのためのライブラリ',
    path: '/img/develop.jpg',
    text: 'C++による競技プログラミングライブラリ',
    lang: 'C++',
    github: 'https://github.com/lmorinn/library',
    link: 'https://lmorinn.github.io/library/',
    summary: null,
  },
  {
    name: 'FM-indexによるCtrl + Fの実装',
    path: '/img/develop.jpg',
    text: 'Zli 大LTでの発表',
    lang: 'C++',
    github: null,
    link: null,
    summary: null,
  },
]
