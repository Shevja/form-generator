<script setup lang="ts">
import type {InputProps, InputValue} from "./BaseInput.types";
import {DEFAULT_FORM_MESSAGES} from "../../types/shared.ts";

const {
    isValid = true,
    errorMessage = 'Поле заполнено неверно',
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
.input {
    width: 100%;
    height: 36px;
    padding: 0 10px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.2s;

    &:focus {
        border-color: #666;
    }
    &::placeholder { color: #999; }

    &-invalid {
        border-color: #e53935;
    }

    &-wrapper {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 12px;
    }

    &-label {
        font-size: 13px;
        color: #555;
        font-weight: 500;
    }

    &-error {
        font-size: 12px;
        color: #e53935;
    }
}
</style>

