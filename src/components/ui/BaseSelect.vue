<script setup lang="ts">
import type {SelectProps, SelectValue} from "./BaseSelect.types";
import {ref, computed, onMounted, onUnmounted} from "vue";
import {DEFAULT_FORM_MESSAGES} from "../../types/shared.ts";

const {
    isValid = true,
    errorMessage = DEFAULT_FORM_MESSAGES.ERROR,
    options = [],
    label = '',
    htmlAttrs = {},
    id
} = defineProps<SelectProps>()

const value = defineModel<SelectValue>()

const selectRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const selectedOptionLabel = computed(() => {
    const option = options.find(o => o.value === value.value)
    return option ? option.label : '';
})

const toggleSelect = () => {
    isOpen.value = !isOpen.value
}
const onInputFocus = () => {
    isOpen.value = true
}
const selectOption = (val: SelectValue) => {
    value.value = val
    isOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
    if (selectRef.value && !selectRef.value.contains(e.target as Node)) {
        isOpen.value = false
    }
}

onMounted(() => window.addEventListener("click", handleClickOutside))
onUnmounted(() => window.removeEventListener("click", handleClickOutside))
</script>

<template>
    <div ref="selectRef" class="select-wrapper">
        <label
            v-if="label"
            :for="htmlAttrs.id || id"
            class="select-label"
        >
            {{ label }}
        </label>

        <input
            :value="value"
            v-bind="htmlAttrs"
            class="select-input"
            readonly
            @focus="onInputFocus"
        >

        <div class="select-container">
            <div
                class="select"
                :class="{ 'select-invalid': !isValid, 'select-open': isOpen }"
                @click="toggleSelect"
            >
                <span v-if="selectedOptionLabel">{{ selectedOptionLabel }}</span>
                <span v-else class="select-placeholder">
                    {{ htmlAttrs.placeholder || DEFAULT_FORM_MESSAGES.PLACEHOLDER }}
                </span>

                <span class="select-arrow">▼</span>
            </div>

            <transition name="fade">
                <ul v-if="isOpen" class="select-list">
                    <li
                        v-for="(option) of options"
                        :key="option.value"
                        class="select-list-item"
                        @click="selectOption(option.value)"
                    >
                        {{ option.label }}
                    </li>

                    <li v-if="options.length === 0" class="select-list-item-empty">
                        Список пуст
                    </li>
                </ul>
            </transition>
        </div>

        <span v-if="!isValid" class="select-error">{{ errorMessage }}</span>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as v;

.select {
    width: 100%;
    height: v.$input-height;
    padding: 0 10px;
    border: 1px solid v.$color-border;
    border-radius: v.$radius-base;
    font-size: v.$font-size-base;
    background: v.$color-white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: border-color v.$transition-base;

    &:hover {
        border-color: v.$color-border-hover;
    }

    // Состояние, когда селект открыт (нужно добавить :class в шаблон)
    &-open {
        border-color: v.$color-text-main;
    }

    &-invalid {
        border-color: v.$color-error;
    }

    &-placeholder {
        color: v.$color-text-placeholder;
    }

    &-arrow {
        font-size: 10px;
        color: v.$color-text-placeholder;
        transition: transform v.$transition-base;
    }

    &-open &-arrow {
        transform: rotate(180deg);
    }

    &-wrapper {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 12px;
        position: relative;
    }

    &-container {
        position: relative;
    }

    &-label {
        font-size: v.$font-size-label;
        color: v.$color-text-muted;
        font-weight: 500;
    }

    &-input {
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
        pointer-events: none;
    }

    &-list {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        width: 100%;
        background: v.$color-white;
        border: 1px solid v.$color-border;
        border-radius: v.$radius-base;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 100;
        max-height: 200px;
        overflow-y: auto;
        padding: 4px 0;

        &-item {
            padding: 8px 12px;
            font-size: v.$font-size-base;
            cursor: pointer;
            transition: background v.$transition-base;

            &:hover {
                background: v.$color-bg-light;
            }

            &.is-selected {
                background: v.$color-bg-light;
                color: v.$color-text-main;
                font-weight: 600;
            }
        }

        &-empty {
            padding: 8px 12px;
            font-size: v.$font-size-base;
            color: v.$color-text-placeholder;
            text-align: center;
        }
    }

    &-error {
        font-size: v.$font-size-small;
        color: v.$color-error;
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity v.$transition-base, transform v.$transition-base;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}
</style>