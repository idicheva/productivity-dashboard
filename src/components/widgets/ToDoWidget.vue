<script setup>
import { useWidgetsStore } from '@/stores/widgetsStore'
import { ref } from 'vue'

const widgetsStore = useWidgetsStore()
const todoInput = ref('')

const addTodo = () => {
  if (todoInput.value !== '') {
    widgetsStore.addTodo(todoInput.value)
    todoInput.value = ''
  }
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <div class="join">
      <div>
        <label class="input input-secondary input-sm join-item">
          <input type="text" placeholder="Add a new task..." v-model.trim="todoInput" />
        </label>
      </div>
      <button class="btn btn-secondary join-item btn-sm" type="submit">Add</button>
    </div>
  </form>

  <div
    class="flex justify-center mt-10"
    v-if="!widgetsStore.getWidgetDetailsByName('todo').config.todos"
  >
    <div class="uppercase font-semibold opacity-50">No tasks yet</div>
  </div>

  <ul v-else class="list bg-base-100 rounded-box shadow-md overflow-y-scroll max-h-52">
    <li
      class="list-row"
      v-for="todo in widgetsStore.getWidgetDetailsByName('todo').config.todos"
      :key="todo.id"
    >
      <div>
        <button
          class="btn btn-xs btn-circle btn-ghost"
          @click="() => widgetsStore.removeTodo(todo.id)"
        >
          <i class="pi pi-times"></i>
        </button>
        <button class="btn btn-xs btn-circle btn-ghost">
          <i class="pi pi-pencil"></i>
        </button>
      </div>
      <div class="list-col-grow">
        <div>
          <span
            class="text-xs uppercase font-semibold opacity-55"
            :class="{ 'line-through': todo.completed }"
          >
            {{ todo.text }}
          </span>
        </div>
      </div>
      <input
        type="checkbox"
        class="checkbox checkbox-xs checkbox-secondary self-center"
        :checked="todo.completed"
        @click="() => widgetsStore.toggleTodo(todo.id)"
      />
    </li>
  </ul>
</template>
