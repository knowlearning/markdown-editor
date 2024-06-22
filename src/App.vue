<template>
    <div class="wrapper">

        <div class="left-col">
            <h3>Your Markdown</h3>
            <textarea
                @input="handleInput"
                @drop="handleDrop"
                :value="userInput"
            />
        </div>

        <div class="right-col">
            <div class="markdown" v-html="finalMarkdown"></div>
        </div>

    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { marked } from 'marked'
import { validate as isUUID } from 'uuid'
import DOMPurify from 'DOMPurify'
import renderLatex from './helpers/renderLatex.js'
import replaceUUIDs from './helpers/replaceUUIDs.js'
import defaultMarkdown from './helpers/defaultMarkdown.js'

const userInput = ref(defaultMarkdown)
const finalMarkdown = ref(null)

function handleInput(e) { userInput.value = e.target.value }
async function handleDrop(e) {
    const textarea = e.target
    const droppedText = e.dataTransfer.getData('text/plain').trim()
    if (isUUID(droppedText)) {
        try {
            const res = await Promise.race([
                Agent.download(droppedText),
                new Promise((resolve, reject) => {
                    setTimeout(() => reject(new Error('Timeout')), 2000);
                })
            ]);
            const toAppend = `\n\n<img height="200px;" width="200px;" src="${res?.url}">`
            userInput.value = userInput.value.replace(droppedText, '')
            userInput.value = userInput.value + toAppend
            textarea.value = userInput.value
        } catch {
            console.log('catching!')
        }
  }
}

watch(
    userInput,
    async val => {
        const rawMarkdown = marked.parse(val)
        const sanitized = DOMPurify.sanitize(rawMarkdown)
        finalMarkdown.value = renderLatex(sanitized)
    },
    { immediate: true }
)

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
    height: 100%;

}
</style>
