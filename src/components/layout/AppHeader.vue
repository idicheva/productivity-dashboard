<template>
  <div class="navbar shadow-sm">
    <div class="navbar-start">
      <RouterLink :to="{ name: 'dashboard' }" class="btn btn-ghost text-xl"
        >Productivity Dashboard</RouterLink
      >
    </div>
    <div class="navbar-end">
      <a class="btn"><i class="pi pi-plus"></i>Add Widget</a>
    </div>
  </div>
</template>
