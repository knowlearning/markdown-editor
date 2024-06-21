<template>
    <div class="wrapper">

        <div class="left-col">
            <h3>Your Markdown</h3>
            <textarea v-model="userInput" />
        </div>

        <div class="right-col">
            <div class="markdown" v-html="finalMarkdown"></div>
        </div>

    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'DOMPurify'
import renderLatex from './helpers/renderLatex.js'
import replaceUUIDs from './helpers/replaceUUIDs.js'
import defaultMarkdown from './helpers/defaultMarkdown.js'

const userInput = ref(defaultMarkdown)
const finalMarkdown = ref(null)

watch(
    userInput,
    async val => {
        // on each change, chain of transformations to build markdown
        // TODO: keep uuid replacements local so not fecthing every time
        const rawMarkdown = marked.parse(val)
        const sanitized = DOMPurify.sanitize(rawMarkdown)
        const latexified = renderLatex(sanitized)
        const uuidReplaced = await replaceUUIDs(latexified, replaceUUIDCallbackAsync)
        finalMarkdown.value = uuidReplaced
    },
    { immediate: true }
)

async function replaceUUIDCallbackAsync() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Math.floor(Math.random()*10000))
    })
  })
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
  height: 100%;

}
</style>
