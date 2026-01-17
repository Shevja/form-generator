<script setup lang="ts">
import type {CheckboxProps, CheckboxValue} from "./BaseCheckbox.types.ts";

const props = withDefaults(
    defineProps<CheckboxProps>(),
    {
        isValid: true,
        errorMessage: '',
        label: '',
        inputAttrs: () => ({})
    }
)

const value = defineModel<CheckboxValue>()
</script>

<template>
    <div>
        <label>
            <input
                v-model="value"
                type="checkbox"
                v-bind="props.inputAttrs"
            >
            <span>{{ props.label }}</span>
        </label>
        <span v-if="!props.isValid">{{ props.errorMessage }}</span>
    </div>
</template>