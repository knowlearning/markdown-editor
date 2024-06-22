import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Agent from '@knowlearning/agents'

window.Agent = Agent

createApp(App).mount('#app')