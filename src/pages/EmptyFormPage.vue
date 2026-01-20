<script setup lang="ts">
import {ref} from "vue";
import FormGenerator from "@/components/FormGenerator/FormGenerator.vue";
import {profileSchema, invalidProfileSchema} from "@/schemas/formSchemas.ts";

const testValue = ref({})
const testValue2 = ref({})
</script>

<template>
    <section class="page">
        <div class="container">
            <div class="form-grid">
                <div>
                    <FormGenerator
                        v-model="testValue"
                        :schema="profileSchema"
                    />
                    <div>
                        <span>formValue:</span>
                        <pre>{{ testValue }}</pre>
                    </div>
                </div>
                <div>
                    <FormGenerator
                        v-model="testValue2"
                        :schema="invalidProfileSchema"
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