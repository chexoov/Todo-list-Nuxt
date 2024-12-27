<template>
  <h1>{{ state }}</h1>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import nuxtStorage from "nuxt-storage";

const initState = nuxtStorage.localStorage.getData("vue-use-local-storage");
const state = useStorage("vue-use-local-storage", initState);
</script>
