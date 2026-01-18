<script setup lang="ts">
import type {CheckboxProps, CheckboxValue} from "./BaseCheckbox.types.ts";

const {
    isValid = true,
    errorMessage = '',
    label = '',
    htmlAttrs = {}
} = defineProps<CheckboxProps>()

const value = defineModel<CheckboxValue>()
</script>

<template>
    <div>
        <label>
            <input
                v-model="value"
                type="checkbox"
                v-bind="htmlAttrs"
            >
            <span>{{ label }}</span>
        </label>
        <span v-if="!isValid">{{ errorMessage }}</span>
    </div>
</template>