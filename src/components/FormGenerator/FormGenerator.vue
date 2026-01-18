<script setup lang="ts">
import type {
    FormGeneratorProps,
    FormGeneratorEmits,
    FormValue,
    ComponentMap,
    FieldSchema
} from "./FormGenerator.type.ts";
import BaseInput from "../ui/BaseInput.vue";
import BaseSelect from "../ui/BaseSelect.vue";
import BaseTextarea from "../ui/BaseTextarea.vue";
import BaseCheckbox from "../ui/BaseCheckbox.vue";
import {useId, watch} from "vue";

const props = defineProps<FormGeneratorProps>();
const emit = defineEmits<FormGeneratorEmits>()

const formValue = defineModel<FormValue>({required: true})
const formId = useId()

const componentMap: ComponentMap = {
    input: BaseInput,
    select: BaseSelect,
    textarea: BaseTextarea,
    checkbox: BaseCheckbox,
}

const handleSubmit = () => emit('submit')
const handleCancel = () => emit('cancel')

const getDefaultFieldValue = (field: FieldSchema) => {
    switch (field.type) {
        case 'checkbox':
            return false
        case 'select':
            return null
        default:
            return ''
    }
}

watch(
    () => props.schema,
    (newSchema: FieldSchema[]) => {
        newSchema.forEach((field: FieldSchema) => {
            if (!(field.id in formValue.value)) {
                formValue.value[field.id] = getDefaultFieldValue(field)
                console.log(field.id, formValue.value[field.id])
            }
        })
    },
    { immediate: true, deep: true }
)
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <!-- Поля формы -->
        <div>
            <div
                v-for="field in props.schema"
                :key="field.id"
            >
                <component
                    :is="componentMap[field.type]"
                    v-model="formValue[field.id]"
                    v-bind="field"
                    :htmlAttrs="{
                        ...field.htmlAttrs,
                        id: `${formId}-${field.id}`,
                        name: field.htmlAttrs?.name || field.id
                    }"
                />
            </div>
        </div>

        <!-- Кнопки формы -->
        <div>
            <button type="submit">Отправить</button>
            <button type="button" @click="handleCancel">Отмена</button>
        </div>
    </form>
</template>