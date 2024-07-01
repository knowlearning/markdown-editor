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
            const supportedTypePrefixes = [ 'audio', 'image', 'video' ]
            supportedTypePrefixes.forEach(type => {
                if (active_type.startsWith(type)) typeName = type
            })
            if (!typeName) { // if none set above
                alert('uuid not found or not supported type')
                return
            }            
            emit('addUUID', droppedText)
        } catch {
            console.warn('catching!!')
        }
  }
}

</script>