<template>
    <div class="wrapper">
        <div class="left-col">
            <MarkdownInput
                :userInput="userInput"
                @input="userInput = $event"
                @addUUID="addUUID"
            />
            <UUIDList
                :uuids="contentList"
                @remove="removeUUID"
            />
        </div>

        <div class="right-col">
            <div class="markdown" v-html="sanitizedMarkdown"></div>
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
import MarkdownInput from './components/MarkdownInput.vue'
import UUIDList from './components/UUIDList.vue'

const userInput = ref(defaultMarkdown)
const sanitizedMarkdown = ref(null)

const contentList = ref(JSON.parse(localStorage.getItem('my-content')) || [])

// async function handleDrop(e) {
//     const textarea = e.target
//     const droppedText = e.dataTransfer.getData('text/plain').trim()
//     if (isUUID(droppedText)) {
//         try {
//             const { active_type } = await Agent.metadata(droppedText)
//             let typeName = null
//             if (active_type.startsWith('audio')) typeName = 'audio'
//             else if (active_type.startsWith('image')) typeName = 'image'
//             else {
//                 alert('uuid not found or not image or audio')
//                 return
//             }

//             addUUID(droppedText) // add to localStorage

//             const res = await Promise.race([
//                 Agent.download(droppedText),
//                 new Promise((resolve, reject) => {
//                     setTimeout(() => reject(new Error('Timeout')), 2000);
//                 })
//             ]);

//             let toAppend = ''
//             if (typeName === 'image') {
//                 toAppend = `\n\n<img height="200px;" width="200px;" src="${res?.url}">`
//             } else if (typeName === 'audio') {
//                 toAppend = `\n\n<audio controls controlsList="nodownload noplaybackrate">\n<source src="${res?.url}" type="${active_type}">\nYour browser does not support the audio element.\n</audio>`
//             }

//             userInput.value = userInput.value.replace(droppedText, '')
//             userInput.value = userInput.value + toAppend
//             textarea.value = userInput.value
//         } catch {
//             console.log('catching!!')
//         }
//   }
// }

watch(
    userInput,
    async val => {
        // sanitizedMarkdown.value = renderLatex(val)
        const katex = renderLatex(val)
        const md = marked.parse(katex)
        sanitizedMarkdown.value = DOMPurify.sanitize(md)
    },
    { immediate: true }
)

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
