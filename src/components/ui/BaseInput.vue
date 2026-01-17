<script setup lang="ts">
import type {InputProps, InputValue} from "./BaseInput.types";

const props = withDefaults(
    defineProps<InputProps>(),
    {
        isValid: true,
        errorMessage: '',
        inputAttrs: () => ({})
    }
)
const value = defineModel<InputValue>()
</script>

<template>
    <div class="">
        <input
            v-model="value"
            v-bind="props.inputAttrs"
        >
        <span v-if="!props.isValid">{{ props.errorMessage }}</span>
    </div>
</template>