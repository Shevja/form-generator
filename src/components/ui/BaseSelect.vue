<script setup lang="ts">
import type {SelectProps, SelectValue} from "./BaseSelect.types";
import {ref, computed, onMounted, onUnmounted} from "vue";

const props = withDefaults(
    defineProps<SelectProps>(),
    {
        isValid: true,
        errorMessage: '',
        options: () => ([]),
        inputAttrs: () => ({})
    }
)
const value = defineModel<SelectValue>()

const selectRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const selectedOptionLabel = computed(() => {
    const option = props.options.find(o => o.value === value.value)
    return option ? option.label : (props.inputAttrs.placeholder || '');
})

const toggleSelect = () => { isOpen.value = !isOpen.value }
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
    <div ref="selectRef">
        <input
            type="hidden"
            :value="value"
            v-bind="props.inputAttrs"
        >

        <div @click="toggleSelect" class="select-trigger">
            <span>{{ selectedOptionLabel }}</span>
            <span v-if="!props.isValid">{{ props.errorMessage }}</span>
        </div>

        <transition name="fade">
            <ul v-if="isOpen">
                <li
                    v-for="(option) of props.options"
                    :key="option.value"
                >
                    <a @click="selectOption(option.value)">{{ option.label }}</a>
                </li>

                <li v-if="props.options.length === 0">
                    Список пуст
                </li>
            </ul>
        </transition>
    </div>
</template>

<style scoped>
.select-trigger {
    width: 6rem;
    height: 2rem;
    border: 1px solid #ccc;
}
</style>