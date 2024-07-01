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
            <ProcessMarkdown :userInput="userInput" />
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import MarkdownInput from './components/MarkdownInput.vue'
import UUIDList from './components/UUIDList.vue'
import ProcessMarkdown from './components/ProcessMarkdown.vue'

import defaultMarkdown from './helpers/defaultMarkdown.js'

const userInput = ref(defaultMarkdown)
const contentList = ref(JSON.parse(localStorage.getItem('my-content')) || [])

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
