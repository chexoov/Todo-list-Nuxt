<template>
  {{ toDoLists }}
  <el-container class="flex justify-center">
    <div class="w-full bg-gray-300 md:w-1/2 lg:w-1/3 p-3">
      <h1 class="text-center mb-3">Список задач</h1>
      <NuxtLink to="/create"
        ><el-button class="w-full mb-3">Создать задачу</el-button></NuxtLink
      >
      <div
        v-for="(item, index) in toDoLists"
        :key="item.id"
        class="flex justify-between mb-5 p-3 border border-gray-400"
      >
        <div class="flex justify-center items-center">{{ index + 1 }}</div>
        <div>
          <h2 class="font-bold">{{ item.title }}</h2>
          <div>1. {{ item.tasks[0].description }}</div>
        </div>
        <div class="flex flex-col gap-2 justify-center items-center">
          <el-popconfirm
            width="300"
            @confirm="deleteTodoItem(item.id)"
            title="Вы уверены, что хотите удалить задачу?"
          >
            <template #reference>
              <el-button class="w-full">Удалить</el-button>
            </template>
            <template #actions="{ confirm, cancel }">
              <el-button @click="cancel">Нет</el-button>
              <el-button @click="confirm">Да</el-button>
            </template>
          </el-popconfirm>

          <NuxtLink :to="`/edit/${item.id}`">
            <el-button class="w-full">Редактировать</el-button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import type { TodoList } from "~/models";
import nuxtStorage from "nuxt-storage";

const ToDoListsInit: TodoList = [
  {
    id: 1,
    title: "test",
    tasks: [
      {
        id: Date.now(),
        description: "купить яйца",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: "test2",
    tasks: [
      {
        id: Date.now(),
        description: "купить яйца 2",
        completed: true,
      },
    ],
  },
];

const toDoLists = useState("toDoLists", () => {
  if (nuxtStorage.localStorage.getData("toDoLists")) {
    return nuxtStorage.localStorage.getData("toDoLists");
  }
  return ToDoListsInit;
});

const deleteTodoItem = (id: number) => {
  toDoLists.value = toDoLists.value.filter((item: TodoList) => item.id !== id);
};
</script>
