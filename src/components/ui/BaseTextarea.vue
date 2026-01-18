<script setup lang="ts">
import type {TextareaProps, TextareaValue} from "./BaseTextarea.types";
import {DEFAULT_FORM_MESSAGES} from "../../types/shared.ts";

const {
    isValid = true,
    errorMessage = 'Поле заполнено неверно',
    label = '',
    htmlAttrs = {},
    id
} = defineProps<TextareaProps>()

const value = defineModel<TextareaValue>()
</script>

<template>
    <div class="textarea-wrapper">
        <label
            v-if="label"
            :for="htmlAttrs.id || id"
            class="textarea-label"
        >
            {{ label }}
        </label>

        <textarea
            v-model="value"
            v-bind="htmlAttrs"
            class="textarea"
            :id="htmlAttrs.id || id"
            :class="{ 'textarea-invalid': !isValid }"
            :placeholder="htmlAttrs.placeholder || DEFAULT_FORM_MESSAGES.PLACEHOLDER"
        ></textarea>

        <span v-if="!isValid" class="textarea-error">{{ errorMessage }}</span>
    </div>
</template>

<style scoped lang="scss">
.textarea {
    width: 100%;
    min-height: 80px;
    padding: 8px 10px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.4;
    transition: border-color 0.2s;
    resize: vertical;

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