<template>
  <div class="flex justify-center items-center w-full">
    <!-- {{ toDoLists }} -->
    <el-form class="w-full md:w-1/2 lg:w-1/3 p-3 bg-gray-300">
      <el-form-item label-position="top" label="Название задачи">
        <el-input v-model="toDo.title" />
      </el-form-item>
      <el-form-item
        label-position="top"
        v-for="(task, index) in toDo.tasks"
        :key="task.id"
        :label="`Описание подзадачи №${index + 1}`"
      >
        <el-input v-model="task.description" />
        <el-button @click="deleteTask(task.id)">Удалить</el-button>
      </el-form-item>
      <el-form-item label-position="top">
        <el-button class="w-full" @click="addTask"
          >Добавить подзадачу</el-button
        >
      </el-form-item>
      <el-popconfirm
        width="300"
        @confirm="navigateTo('/')"
        title="Вы уверены, что хотите отменить создание задачи?"
      >
        <template #reference>
          <el-button>Отменить</el-button>
        </template>
        <template #actions="{ confirm, cancel }">
          <el-button @click="cancel">Нет</el-button>
          <el-button @click="confirm">Да</el-button>
        </template>
      </el-popconfirm>
      <el-button @click="createTodo">Сохранить</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem, Task } from "~/models";

const toDoLists = useState<TodoItem[]>("toDoLists");
const toDo = ref<TodoItem>({
  id: Date.now(),
  title: "",
  tasks: [
    {
      id: Date.now(),
      description: "",
      completed: false,
    },
  ],
});

const createTodo = async () => {
  toDoLists.value.push(toDo.value);
  await navigateTo("/");
};

const addTask = () => {
  toDo.value.tasks.push({
    id: Date.now(),
    description: "",
    completed: false,
  });
};

const deleteTask = (id: number) => {
  if (toDo.value.tasks.length === 1) return;
  toDo.value.tasks = toDo.value.tasks.filter((task: Task) => task.id !== id);
};
</script>
