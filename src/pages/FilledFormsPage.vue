<script setup lang="ts">
import {ref} from "vue";
import FormGenerator from "@/components/FormGenerator/FormGenerator.vue";
import {useStore} from "vuex";
import {invalidProfileSchema, profileSchema} from "@/schemas/formSchemas.ts";

const store = useStore();

const testData1 = ref({ ...store.state.testData1 })
const testData2 = ref({ ...store.state.testData2 })

const onSubmit1 = async () => {
    store.commit("UPDATE_TEST_DATA", { key: "testData1", value: testData1.value });

    await store.dispatch("saveData", 'testData1')
    alert("Данные отправлены")
}

const onSubmit2 = async () => {
    store.commit("UPDATE_TEST_DATA", { key: "testData2", value: testData2.value });

    await store.dispatch("saveData", 'testData2')
    alert("Данные отправлены")
}
</script>

<template>
    <section class="page">
        <div class="container">
            <div class="form-grid">
                <div>
                    <FormGenerator
                        v-model="testData1"
                        :schema="profileSchema"
                        @submit="onSubmit1"
                    />
                    <div>
                        <span>formValue:</span>
                        <pre>{{ testData1 }}</pre>
                    </div>
                </div>
                <div>
                    <FormGenerator
                        v-model="testData2"
                        :schema="invalidProfileSchema"
                        @submit="onSubmit2"
                    />
                    <div>
                        <span>formValue:</span>
                        <pre>{{ testData2 }}</pre>
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