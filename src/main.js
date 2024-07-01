import './assets/main.css'

import { createApp } from 'vue'
import Main from './Main.vue'
import Agent from '@knowlearning/agents'

window.Agent = Agent

const { auth: { provider }} = await Agent.environment()

if (provider === 'anonymous') Agent.login()
else createApp(Main).mount('#app')
