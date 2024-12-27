<template>
  {{ toDoLists }}
  <el-container class="flex justify-center">
    <div class="w-full bg-gray-300 md:w-1/2 lg:w-1/3 p-3">
      <h1>Список задач</h1>
      <div
        v-for="item in toDoLists"
        :key="item.id"
        class="flex justify-between mb-5 p-3 border border-gray-400"
      >
        <div class="flex justify-center items-center">{{ item.id }}</div>
        <div>
          <h2 class="font-bold">{{ item.title }}</h2>
          <div>1. {{ item.tasks[0].description }}</div>
        </div>
        <div class="flex justify-center items-center">
          <el-button>Добавить</el-button>
        </div>
      </div>
    </div>
    <NuxtLink to="/create">Создать</NuxtLink>
  </el-container>
</template>

<script setup lang="ts">
import type { TodoList } from "~/models";

const ToDoListsInit: TodoList = [
  {
    id: 1,
    title: "test",
    tasks: [
      {
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
        description: "купить яйца 2",
        completed: true,
      },
    ],
  },
];

const toDoLists = useState("toDoLists", () => ToDoListsInit);
</script>
