import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './assets/main.css'
import App from './App.vue'
import router from './router'

library.add(faGithub, faCalendarAlt, faCode)

const app = createApp(App)
app.use(router)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')

AOS.init({
  duration: 400,
  once: false,
})
