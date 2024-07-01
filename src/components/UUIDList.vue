<template>
    <div class="uuids">
        <div
            v-for="uuid in uuids"
            :key="uuid"
        >
            <span
                style="color: red; cursor: pointer;"
                @click="$emit('remove', uuid)"
            >XXXXX</span>
            <span
                draggable="true"
                @dragstart="setDragData($event, uuid)"
            >{{ uuid }}</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    uuids: {
        type: Array,
        required: true
    }
})

function setDragData(event, id) {
    event.dataTransfer.setData('text/plain', id);
    event.dataTransfer.setData('text/uri-list', id);
}
</script>