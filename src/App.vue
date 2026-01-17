<script setup lang="ts">
import {ref} from "vue";
import FormGenerator from "./components/FormGenerator/FormGenerator.vue";
import type {FieldSchema} from "./components/FormGenerator/FormGenerator.type.ts";

const testValue = ref({})
const testValue2 = ref({})

const testSchema: FieldSchema[] = [
    {
        id: 'name',
        type: 'input',
        isValid: false,
        errorMessage: 'test'
    },
    {
        id: 'theme',
        type: 'select',
        options: [
            {
                label: 'Значение',
                value: 'value'
            },
            {
                label: 'Невидимый',
                value: 'invisible'
            }
        ]
    }
]
</script>

<template>
    <div>
        <FormGenerator
            :model-value="testValue"
            :schema="testSchema"
        />
        <FormGenerator
            :model-value="testValue2"
            :schema="testSchema"
        />
        <pre>{{ testValue }}</pre>
        <pre>{{ testValue2 }}</pre>
    </div>
</template>