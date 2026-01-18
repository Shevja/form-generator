<script setup lang="ts">
import type { BaseButtonProps } from "./BaseButton.types"

const {
    type = 'button',
    variant = 'primary',
    htmlAttrs = {}
} = defineProps<BaseButtonProps>()
</script>

<template>
    <button
        :type="type"
        class="btn"
        :class="[`btn--${variant}`]"
        v-bind="htmlAttrs"
    >
        <span class="btn__content">
            <slot />
        </span>
    </button>
</template>

<style scoped lang="scss">
@use "sass:color";
@use "@/assets/styles/variables" as v;

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: v.$input-height;
    padding: 0 20px;
    border-radius: v.$radius-base;
    font-size: v.$font-size-base;
    font-weight: 500;
    cursor: pointer;
    transition: all v.$transition-base;
    border: 1px solid transparent;
    gap: 8px;

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    // Варианты кнопок
    &--primary {
        background-color: v.$color-primary;
        color: v.$color-white;

        &:hover:not(:disabled) {
            // Вместо lighten() используем color.scale()
            background-color: color.scale(v.$color-primary, $lightness: 15%);
        }
    }

    &--secondary {
        background-color: v.$color-white;
        border-color: v.$color-border;
        color: v.$color-text-main;

        &:hover:not(:disabled) {
            border-color: v.$color-border-hover;
            background-color: v.$color-bg-light;
        }
    }

    &--error {
        background-color: v.$color-error;
        color: v.$color-white;

        &:hover:not(:disabled) {
            // Вместо darken() используем color.scale() или color.adjust()
            background-color: color.scale(v.$color-error, $lightness: -10%);
        }
    }
}

@keyframes rotation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
