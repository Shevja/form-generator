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
import BaseButton from "@/components/ui/BaseButton.vue";

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
            }
        })
    },
    {immediate: true, deep: true}
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
                <slot
                    :name="field.id"
                    :field="field"
                    :model="formValue"
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
                </slot>
            </div>
        </div>

        <!-- Кнопки формы -->
        <div class="form-actions">
            <BaseButton
                type="submit"
                variant="primary"
            >
                Отправить
            </BaseButton>

            <BaseButton
                type="button"
                variant="secondary"
                @click="handleCancel"
            >
                Отмена
            </BaseButton>
        </div>
    </form>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as v;

form {
    display: grid;
    gap: 16px;
}

.form-actions {
    display: flex;
    gap: 12px;
    margin-top: 8px;
}
</style>
