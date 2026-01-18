<script setup lang="ts">
import type {TextareaProps, TextareaValue} from "./BaseTextarea.types";
import {DEFAULT_FORM_MESSAGES} from "../../types/shared.ts";

const {
    isValid = true,
    errorMessage = DEFAULT_FORM_MESSAGES.ERROR,
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
@use "@/assets/styles/variables" as v;

.textarea {
    width: 100%;
    min-height: 80px; // Минимальная высота для текстового поля
    padding: 8px 10px; // Чуть больше padding сверху для текста
    border: 1px solid v.$color-border;
    border-radius: v.$radius-base;
    font-size: v.$font-size-base;
    color: v.$color-text-main;
    background: v.$color-white;
    line-height: 1.5; // Улучшаем читаемость многострочного текста
    transition: border-color v.$transition-base;
    resize: vertical; // Позволяем менять размер только по вертикали
    display: block;

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
