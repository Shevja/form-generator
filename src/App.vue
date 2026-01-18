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
        label: 'Имя',
        errorMessage: 'test',
        htmlAttrs: {
            placeholder: 'Введите имя'
        }
    },
    {
        id: 'theme',
        type: 'select',
        label: 'Theme',
        options: [
            {
                label: 'Значение',
                value: 'value'
            },
            {
                label: 'Невидимый',
                value: 'invisible'
            }
        ],
        htmlAttrs: {
            placeholder: 'Выберите опцию'
        }
    },
    {
        id: 'Message',
        type: 'textarea',
        label: 'Message',
    },
    {
        id: 'Agreement',
        type: 'checkbox',
        label: 'Agreement',
    }
]

const testSchema2: FieldSchema[] = [
    {
        id: 'name',
        type: 'input',
        isValid: false,
        label: 'Имя',
    },
    {
        id: 'theme',
        type: 'select',
        isValid: false,
        label: 'Theme',
        options: [
            {
                label: 'Значение',
                value: 'value'
            },
            {
                label: 'Невидимый',
                value: 'invisible'
            }
        ],
        htmlAttrs: {
            placeholder: 'Выберите опцию'
        }
    },
    {
        id: 'Message',
        type: 'textarea',
        label: 'Message',
        isValid: false,
    },
    {
        id: 'Agreement',
        type: 'checkbox',
        label: 'Agreement',
        isValid: false,
    }
]
</script>

<template>
    <div>
        <div class="test-case">
            <FormGenerator
                :model-value="testValue"
                :schema="testSchema"
            />
        </div>
        <div class="test-case">
            <FormGenerator
                :model-value="testValue2"
                :schema="testSchema2"
            />
        </div>
        <pre>{{ testValue }}</pre>
        <pre>{{ testValue2 }}</pre>
    </div>
</template>

<style>
.test-case {
    padding: 40px 0;
    width: 60rem;
    margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>