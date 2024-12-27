<template>
  <div>
    <NuxtLink to="/create"><div>create</div></NuxtLink>

    <el-button @click="ElMessage('hello')">button</el-button>
    <ElButton :icon="ElIconEditPen" type="success">button</ElButton>
    <LazyElButton type="warning">lazy button</LazyElButton>
    <div class="bg-red-500">tailwind</div>
    <input v-model="state.name" type="text" />
    <input v-model="state.color" type="text" />
    <input v-model="state.size" type="text" />
    <input
      v-model.number="state.count"
      type="range"
      min="0"
      step="0.01"
      max="1000"
    />

    <pre lang="json">{{ state }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";

const theDefault = {
  name: "Banana",
  color: "Yellow",
  size: "Medium",
  count: 0,
};
const state = useStorage("vue-use-local-storage", theDefault);
</script>
