import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodosStore = defineStore(
  'todos',
  () => {
    const todos = ref([])

    const addTodo = (text) => {
      if (text && text !== '') {
        const newTodo = {
          id: nanoid(),
          text,
          completed: false,
        }

        todos.value.push(newTodo)
      }
    }

    const toggleTodo = (todoId) => {
      const todo = todos.value.find((item) => item.id === todoId)
      if (todo) {
        todo.completed = !todo.completed
      }
    }

    const editTodo = (todoId, updatedText) => {
      const todo = todos.value.find((item) => item.id === todoId)
      if (todo) {
        todo.text = updatedText
      }
    }

    const removeTodo = (todoId) => {
      todos.value = todos.value.filter((item) => item.id !== todoId)
    }

    return {
      todos,
      addTodo,
      toggleTodo,
      editTodo,
      removeTodo,
    }
  },
  { persist: true },
)
