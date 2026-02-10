<script setup>
import { ref } from 'vue'
import AddWidgetModal from './AddWidgetModal.vue'

const addWidgetModal = ref(null)

const openWidgetModal = () => addWidgetModal.value?.showModal()
const closeWidgetModal = () => addWidgetModal.value?.closeModal()
</script>

<template>
  <div class="card justify-center items-center w-9/10 h-80 m-6 shadow-lg">
    <div class="flex w-30 h-30 mb-3">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
            stroke="#8e4162"
            stroke-width="1.5"
            stroke-linecap="round"
          ></path>
          <path
            d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
            stroke="#8e4162"
            stroke-width="1.5"
            stroke-linecap="round"
          ></path>
        </g>
      </svg>
    </div>

    <h1 class="text-xl text-base-400 font-bold">No Widgets Yet</h1>
    <p class="text-base-400">
      Click
      <button class="text-secondary hover:cursor-pointer" @click="openWidgetModal">here</button> to
      add one
    </p>
  </div>

  <AddWidgetModal @addWidget="closeWidgetModal" ref="addWidgetModal" />
</template>
