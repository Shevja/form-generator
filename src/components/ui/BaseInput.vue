<script setup lang="ts">
import type {InputProps, InputValue} from "./BaseInput.types";
import {DEFAULT_FORM_MESSAGES} from "../../types/shared.ts";

const {
    isValid = true,
    errorMessage = DEFAULT_FORM_MESSAGES.ERROR,
    label = '',
    htmlAttrs = {},
    id
} = defineProps<InputProps>()
const value = defineModel<InputValue>()
</script>

<template>
    <div class="input-wrapper">
        <label
            v-if="label"
            :for="htmlAttrs.id || id"
            class="input-label"
        >
            {{ label }}
        </label>
        <input
            v-model="value"
            v-bind="htmlAttrs"
            class="input"
            :id="htmlAttrs.id || id"
            :class="{ 'input-invalid': !isValid }"
            :placeholder="htmlAttrs.placeholder || DEFAULT_FORM_MESSAGES.PLACEHOLDER"
        >
        <span v-if="!isValid" class="input-error">{{ errorMessage }}</span>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as v;

.input {
    width: 100%;
    height: v.$input-height;
    padding: 0 10px;
    border: 1px solid v.$color-border;
    background: v.$color-white;
    border-radius: v.$radius-base;
    font-size: v.$font-size-base;
    color: v.$color-text-main;
    transition: border-color v.$transition-base;

    &:focus {
        border-color: v.$color-border-hover;
        outline: none;
    }

    &::placeholder {
        color: v.$color-text-placeholder;
    }

    &-invalid {
        border-color: v.$color-error;
    }

    &-wrapper {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 12px;
    }

    &-label {
        font-size: v.$font-size-label;
        color: v.$color-text-muted;
        font-weight: 500;
        cursor: pointer;
    }

    &-error {
        font-size: v.$font-size-small;
        color: v.$color-error;
    }
}
</style>

