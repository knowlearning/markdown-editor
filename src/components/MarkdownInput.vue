<template>
    <div class="markdown-input">
        <h3>Your Markdown</h3>
        <textarea
            @input="emit('input', $event.target.value)"
            @drop="handleAttemptedDrop"
            :value="props.userInput"
        />
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { validate as isUUID } from 'uuid'

const emit = defineEmits([ 'input', 'addUUID' ])

const props = defineProps({
    userInput: {
        type: String,
        required: true
    }
})

async function handleAttemptedDrop(e) {
    const textarea = e.target
    const droppedText = e.dataTransfer.getData('text/plain').trim()
    if (isUUID(droppedText)) {
        try {
            const { active_type } = await Agent.metadata(droppedText)
            let typeName = null
            if (active_type.startsWith('audio')) typeName = 'audio'
            else if (active_type.startsWith('image')) typeName = 'image'
            else {
                alert('uuid not found or not image or audio')
                return
            }
            emit('addUUID', droppedText)
        } catch {
            console.log('catching!!')
        }
  }
}

</script>