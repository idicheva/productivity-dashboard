<script setup>
const openWidgetModal = () => document.getElementById('addWidgetModal').showModal()
</script>

<template>
  <div class="card justify-center items-center bg-secondary-content/70 w-9/10 h-80 m-6 shadow-lg">
    <img src="/src/assets/widget-6-svgrepo-com.svg" alt="Widget Icon" class="w-40" />
    <h1 class="text-xl text-base-400">No Widgets Yet</h1>
    <p class="text-base-400">
      Click
      <button class="text-secondary hover:cursor-pointer" @click="openWidgetModal">here</button> to
      add one
    </p>
  </div>
</template>
