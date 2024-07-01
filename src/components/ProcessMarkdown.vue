<template>
    <div
        class="markdown"
        v-html="sanitizedMarkdown"
    ></div>
</template>

<script setup>
import { ref, watch } from 'vue'

import { marked } from 'marked'
import DOMPurify from 'DOMPurify'
import renderLatex from '../helpers/renderLatex.js'
import replaceUUIDs from '../helpers/replaceUUIDs.js'


const props = defineProps({
    userInput: {
        required: true,
        type: String
    }
})

const sanitizedMarkdown = ref('')

watch(
    () => props.userInput,
    async val => {
        const katex = renderLatex(val)
        const md = marked.parse(katex)
        const withIDsReplaced = await replaceUUIDs(md, replacer)
        sanitizedMarkdown.value = DOMPurify.sanitize(withIDsReplaced)
    },
    { immediate: true }
)

async function replacer(match) {
    const uuid = match[0]
    try {
        // metadata call is cached, fine to fetch on each keystroke
        const { active_type } = await Agent.metadata(uuid)
        let typeName = null
        const supportedTypePrefixes = [ 'audio', 'image', 'video' ]
        supportedTypePrefixes.forEach(type => {
            if (active_type.startsWith(type)) typeName = type
        })
        if (!typeName) return uuid // return uuid if type match not found

        // TODO: make a dictionary of uuids to url to prevent refecthing on each keystroke

        const res = await Promise.race([
            Agent.download(uuid),
            new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('Timeout')), 2000);
            })
        ])
        if (typeName === 'image') {
            return `\n\n<img height="200px;" width="200px;" src="${res?.url}">`
        } else if (typeName === 'audio' || typeName === 'video') {
            return `\n\n<${typeName} controls controlsList="nodownload noplaybackrate">\n<source src="${res?.url}" type="${active_type}">\nYour browser does not support the ${typeName} element.\n</${typeName}>`
        }
    } catch {
        console.warn('catching!!')
    }
}

</script>