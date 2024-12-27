<template>
  <div class="flex justify-center items-center w-full">
    <!-- {{ toDoLists }} -->
    <el-form class="w-full md:w-1/2 lg:w-1/3 p-3 bg-gray-100">
      <el-form-item label-position="top" label="Название задачи">
        <el-input maxlength="30" v-model="toDo.title" />
      </el-form-item>
      <el-form-item
        label-position="top"
        v-for="(task, index) in toDo.tasks"
        :key="task.id"
        :label="`Описание подзадачи №${index + 1}`"
      >
        <el-input class="mb-3" maxlength="30" v-model="task.description" />
        <el-button type="danger" plain  @click="deleteTask(task.id)">Удалить</el-button>
      </el-form-item>
      <el-form-item label-position="top">
        <el-button class="w-full" type="primary" plain @click="createTask"
          >Добавить подзадачу</el-button
        >
      </el-form-item>
      <el-button-group class="w-full">
      <el-popconfirm
        width="300"
        @confirm="navigateTo('/')"
        title="Вы уверены, что хотите отменить создание задачи?"
      >
        <template #reference>
          <el-button class="w-1/2" type="danger" plain >Отменить</el-button>
        </template>
        <template #actions="{ confirm, cancel }">
          <el-button @click="cancel">Нет</el-button>
          <el-button @click="confirm">Да</el-button>
        </template>
      </el-popconfirm>

      <el-button class="w-1/2" type="success" plain @click="editTask">Сохранить изменения</el-button>
      </el-button-group>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem, Task } from "~/models";

const toDoLists = useState<TodoItem[]>("toDoLists");
const toDo = ref<TodoItem>({
  id: Date.now(),
  title: "",
  completed: false,
  tasks: [
    {
      id: Date.now(),
      description: "",
      completed: false,
    },
  ],
});

const route = useRoute();
const id = route.params.id;

onMounted(() => {
  toDo.value = JSON.parse(
    JSON.stringify(
      toDoLists.value.find(
        (item: TodoItem) => item.id === Number(id)
      ) as TodoItem
    )
  );
});

const createTask = async () => {
  toDo.value.tasks.push({
    id: Date.now(),
    description: "",
    completed: false,
  });
};

const editTask = async () => {
  if (toDo.value.title.length === 0) return;
  if (toDo.value.tasks[0].description.length === 0) return;

  toDoLists.value = toDoLists.value.map((item: TodoItem) => {
    if (item.id === Number(route.params.id)) {
      return toDo.value;
    }
    return item;
  });

  await navigateTo("/");
};

const deleteTask = (id: number) => {
  if (toDo.value.tasks.length === 1) return;
  toDo.value.tasks = toDo.value.tasks.filter((task: Task) => task.id !== id);
};
</script>
