<script setup lang="ts">
import type {FormGeneratorProps, FormGeneratorEmits, FormValue, ComponentMap} from "./FormGenerator.type.ts";
import BaseInput from "../ui/BaseInput.vue";
import BaseSelect from "../ui/BaseSelect.vue";
import BaseTextarea from "../ui/BaseTextarea.vue";
import BaseCheckbox from "../ui/BaseCheckbox.vue";
import {useId} from "vue";

const props = defineProps<FormGeneratorProps>();
const emit = defineEmits<FormGeneratorEmits>()

const formValue = defineModel<FormValue>({ required: true })
const formId = useId()

const componentMap: ComponentMap = {
    input: BaseInput,
    select: BaseSelect,
    textarea: BaseTextarea,
    checkbox: BaseCheckbox,
}

const handleSubmit = () => emit('submit')
const handleCancel = () => emit('cancel')
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
                    v-bind="field"
                    v-model="formValue[field.id]"
                    :inputAttrs="{
                        ...field.inputAttrs,
                        id: `${formId}-${field.id}`,
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