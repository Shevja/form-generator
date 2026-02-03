<script setup lang="ts"></script>

<template>
    <header class="header">
        <nav class="header__nav">
            <router-link class="nav-link" :to="{name: 'emptyForms'}">
                Пустые
            </router-link>
            <router-link class="nav-link" :to="{name: 'filledForms'}">
                Заполненные
            </router-link>
            <router-link class="nav-link" :to="{name: 'slotForms'}">
                Слоты
            </router-link>
        </nav>
    </header>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as v;

.header {
    background-color: v.$color-white;
    border-bottom: 1px solid v.$color-border;
    padding: 0 20px;
    height: 40px;
    display: flex;
    justify-content: center;

    &__nav {
        display: flex;
        gap: 24px;
    }
}

.nav-link {
    display: flex;
    align-items: center;
    padding: 0 20px;
    text-decoration: none;
    height: 100%;
    color: v.$color-text-muted;
    font-size: v.$font-size-base;
    transition: color v.$transition-base;
    position: relative;

    &:hover {
        color: v.$color-primary;
    }

    &.router-link-active {
        color: v.$color-primary;
        background-color: v.$color-bg-light;
    }
}
</style>