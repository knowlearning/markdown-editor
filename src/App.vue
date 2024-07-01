<template>
    <div class="wrapper">
        <div class="left-col">
            <button @click="newDoc">New Markdown</button>
            <select v-if="Object.keys(markdownDocs).length " v-model="activeMarkdownId">
                <option v-for="_, id in markdownDocs" :key="id" :value="id">
                    {{ id }}
                </option>
            </select>

            <MarkdownInput
                :key="activeMarkdownId" v-if="activeMarkdownId"
                :userInput="userInput"
                @input="userInput = $event"
                @addUUID="addUUID"
            />
            <button :disabled="!activeMarkdownId" @click="save">Save</button>
            <UUIDList
                :uuids="contentList"
                @remove="removeUUID"
            />
        </div>

        <div class="right-col">
            <ProcessMarkdown :userInput="userInput" />
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { v4 as uuid } from 'uuid'
import MarkdownInput from './components/MarkdownInput.vue'
import UUIDList from './components/UUIDList.vue'
import ProcessMarkdown from './components/ProcessMarkdown.vue'

import defaultMarkdown from './helpers/defaultMarkdown.js'

const userInput = ref('')

const contentList = ref(JSON.parse(localStorage.getItem('my-content')) || [])

const markdownDocs = reactive(await Agent.state('markdown-docs'))
const activeMarkdownId = ref(null)

watch(
    () => activeMarkdownId.value,
    async val => {
        const state = await Agent.state(val)
        userInput.value = state.userInput
    }
)

async function save() {
    const state = await Agent.state(activeMarkdownId.value)
    state.userInput = userInput.value
}

async function newDoc() {
    const id = uuid()
    const state = await Agent.state(id)
    state.userInput = defaultMarkdown
    markdownDocs[id] = {}
    activeMarkdownId.value = id
}

function addUUID(uuid) {
    const myContent = JSON.parse(localStorage.getItem('my-content')) || []
    if (myContent.includes(uuid)) return
    myContent.push(uuid)
    contentList.value.push(uuid)
    localStorage.setItem('my-content', JSON.stringify(myContent))
}

function removeUUID(uuid) {
    contentList.value = contentList.value.filter(el => el !== uuid)
    localStorage.setItem('my-content', JSON.stringify(contentList.value))
}
</script>

<style>

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
.wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 100%;
}
.left-col, .right-col {
    padding: 8px;
    height: 100%;
    border-right: 1px solid black;
}
.left-col textarea {
    width: 100%;
    height: 350px;

}
</style>
