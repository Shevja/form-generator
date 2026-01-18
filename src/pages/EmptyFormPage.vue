<script setup lang="ts">
import {ref} from "vue";
import type {FieldSchema} from "@/components/FormGenerator/FormGenerator.type.ts";
import FormGenerator from "@/components/FormGenerator/FormGenerator.vue";

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
        id: 'message',
        type: 'textarea',
        label: 'message',
    },
    {
        id: 'agreement',
        type: 'checkbox',
        label: 'Соглашение',
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
        id: 'message',
        type: 'textarea',
        label: 'message',
        isValid: false,
    },
    {
        id: 'agreement',
        type: 'checkbox',
        label: 'Соглашение',
        isValid: false,
    }
]
</script>

<template>
    <section class="page">
        <div class="container">
            <div class="form-grid">
                <div>
                    <FormGenerator
                        v-model="testValue"
                        :schema="testSchema"
                    />
                    <div>
                        <span>formValue:</span>
                        <pre>{{ testValue }}</pre>
                    </div>
                </div>
                <div>
                    <FormGenerator
                        v-model="testValue2"
                        :schema="testSchema2"
                    />
                    <div>
                        <span>formValue:</span>
                        <pre>{{ testValue2 }}</pre>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
}
</style>