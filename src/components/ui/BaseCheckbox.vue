<script setup lang="ts">
import type {CheckboxProps, CheckboxValue} from "./BaseCheckbox.types.ts";
import {DEFAULT_FORM_MESSAGES} from "../../types/shared.ts";

const {
    isValid = true,
    errorMessage = DEFAULT_FORM_MESSAGES.ERROR,
    label = '',
    htmlAttrs = {}
} = defineProps<CheckboxProps>()

const value = defineModel<CheckboxValue>()
</script>

<template>
    <div class="checkbox-wrapper">
        <label :for="htmlAttrs.id || id" class="checkbox-label">
            <input
                v-model="value"
                v-bind="htmlAttrs"
                class="checkbox"
                :class="{ 'checkbox-invalid': !isValid }"
                type="checkbox"
                :id="htmlAttrs.id || id"
                :name="htmlAttrs.name || id"
            >
            <div class="checkbox-custom"></div>

            <span v-if="label" class="checkbox-text">{{ label }}</span>
        </label>

        <span v-if="!isValid" class="checkbox-error">{{ errorMessage }}</span>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as v;

.checkbox {
    // Скрываем нативный инпут
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    // Состояние "Выбрано"
    &:checked ~ .checkbox-custom {
        background-color: v.$color-primary; // Используем основной цвет из переменных
        border-color: v.$color-primary;

        &::after {
            display: block;
        }
    }

    // Состояние ошибки
    &-invalid ~ .checkbox-custom {
        border-color: v.$color-error;
    }

    &-wrapper {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 12px;
    }

    &-label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        width: fit-content;
    }

    &-container {
        position: relative;
        width: 18px;
        height: 18px;
    }

    // Кастомный квадрат чекбокса
    &-custom {
        position: relative;
        height: 18px;
        width: 18px;
        background-color: v.$color-white;
        border: 1px solid v.$color-border;
        border-radius: v.$radius-base;
        transition: all v.$transition-base;

        // Рисуем галочку (белая "L" под углом)
        &::after {
            content: "";
            position: absolute;
            display: none;
            left: 5px;
            top: 2px;
            width: 5px;
            height: 10px;
            border: solid v.$color-white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
    }

    &-text {
        font-size: v.$font-size-base;
        color: v.$color-text-muted;
        user-select: none;
    }

    &-error {
        font-size: v.$font-size-small;
        color: v.$color-error;
    }
}
</style>
