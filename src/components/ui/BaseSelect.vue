<script setup lang="ts">
import type {SelectProps, SelectValue} from "./BaseSelect.types";
import {ref, computed, onMounted, onUnmounted} from "vue";
import {DEFAULT_FORM_MESSAGES} from "../../types/shared.ts";

const {
    isValid = true,
    errorMessage = 'Поле заполнено неверно',
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

            <span v-if="!isValid" class="select-error">{{ errorMessage }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.select {
    width: 100%;
    height: 36px;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: border-color 0.2s;

    &:hover {
        border-color: #aaa;
    }

    &-invalid {
        border-color: #e53935;
    }

    &-placeholder {
        color: #999;
    }

    &-arrow {
        font-size: 10px;
        color: #999;
        transition: transform 0.2s;
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

    &-label {
        font-size: 13px;
        color: #555;
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
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 100;
        max-height: 200px;
        overflow-y: auto;
        padding: 4px 0;

        &-item {
            padding: 8px 12px;
            font-size: 14px;
            cursor: pointer;
            transition: background 0.2s;

            &:hover {
                background: #f5f5f5;
            }

            &.is-selected {
                background: #eee;
                font-weight: 600;
            }
        }

        &-empty {
            padding: 8px 12px;
            font-size: 14px;
            color: #999;
            text-align: center;
        }
    }

    &-error {
        font-size: 12px;
        color: #e53935;
    }
}

// Fade анимация (уже писали, но продублируем кратко)
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}
</style>