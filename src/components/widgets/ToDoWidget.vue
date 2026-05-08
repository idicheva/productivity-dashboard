<script setup>
import { useTodosStore } from '@/stores/todosStore'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const todosStore = useTodosStore()
const { todos } = storeToRefs(todosStore)
const todoInput = ref('')
const editingTodo = reactive({
  id: null,
  text: '',
})

const addTodo = () => {
  todosStore.addTodo(todoInput.value)
  todoInput.value = ''
}

const handleEditButtonClick = (todo) => {
  editingTodo.id = todo.id
  editingTodo.text = todo.text
}

const handleEditTodo = (todoId) => {
  const originalText = todos.value.find((todo) => todo.id === todoId)?.text
  if (editingTodo.text && editingTodo.text !== originalText) {
    todosStore.editTodo(todoId, editingTodo.text)
  }

  editingTodo.text = ''
  editingTodo.id = null
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <div class="flex gap-3">
      <input
        class="input input-secondary input-sm"
        type="text"
        placeholder="What needs to be done?"
        v-model.trim="todoInput"
      />
      <button
        class="btn btn-ghost btn-secondary btn-sm"
        aria-label="Add Task"
        :disabled="!todoInput"
        type="submit"
      >
        Add Task
      </button>
    </div>
  </form>

  <div class="flex justify-center mt-10" v-if="todos.length === 0">
    <div class="font-semibold">No tasks yet</div>
  </div>

  <ul
    v-else
    class="list bg-base-100 border border-base-300 rounded-lg mt-2 overflow-y-scroll max-h-55"
  >
    <li class="list-row hover:bg-secondary-content/40" v-for="todo in todos" :key="todo.id">
      <div class="flex items-center">
        <button
          class="btn btn-xs btn-circle btn-ghost"
          :aria-label="`Remove ${todo.text}`"
          @click="todosStore.removeTodo(todo.id)"
        >
          <i class="pi pi-times"></i>
        </button>
        <button
          v-if="editingTodo.id === todo.id"
          class="btn btn-xs btn-circle btn-ghost"
          aria-label="Save Todo"
          @click="handleEditTodo(todo.id)"
        >
          <i class="pi pi-check"></i>
        </button>
        <button
          v-else
          class="btn btn-xs btn-circle btn-ghost"
          :aria-label="`Edit ${todo.text}`"
          @click="handleEditButtonClick(todo)"
        >
          <i class="pi pi-pencil"></i>
        </button>
      </div>
      <div class="list-col-grow">
        <div>
          <input
            v-if="editingTodo.id === todo.id"
            type="text"
            v-model.trim="editingTodo.text"
            class="input input-secondary input-xs"
            @keydown.enter="handleEditTodo(todo.id)"
          />
          <span
            v-else
            class="text-xs font-semibold"
            :class="{ 'line-through opacity-50': todo.completed }"
          >
            {{ todo.text }}
          </span>
        </div>
      </div>
      <input
        type="checkbox"
        class="checkbox checkbox-xs checkbox-secondary self-center"
        :checked="todo.completed"
        @change="todosStore.toggleTodo(todo.id)"
      />
    </li>
  </ul>
</template>
