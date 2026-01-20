<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import {onMounted} from "vue";
import {useStore} from "vuex";

const store = useStore();

onMounted(() => {
    store.dispatch("initStore")
})
</script>

<template>
    <div>
        <TheHeader />
        <main>
            <router-view />
        </main>
    </div>
</template>

<style>
</style>