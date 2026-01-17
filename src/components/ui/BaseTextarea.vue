<script setup lang="ts">
import type {TextareaProps, TextareaValue} from "./BaseTextarea.types";

const props = withDefaults(
    defineProps<TextareaProps>(),
    {
        isValid: true,
        errorMessage: '',
        textareaAttrs: () => ({})
    }
)
const value = defineModel<TextareaValue>()
</script>

<template>
    <div class="">
        <textarea
            v-model="value"
            v-bind="props.textareaAttrs"
        ></textarea>
        <span v-if="!props.isValid">{{ props.errorMessage }}</span>
    </div>
</template>