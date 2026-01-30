<!-- TODO: add v-for for the widgets they may be an array of objects [{name: string, icon: string},...] -->

<template>
  <dialog class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          <i class="pi pi-times"></i>
        </button>
      </form>
      <h3 class="text-lg font-bold mb-5">Add a Widget</h3>
      <div class="flex flex-col">
        <button class="btn btn-soft btn-secondary mb-2">
          <i class="pi pi-plus"></i>
          Pomodoro Timer
          <div class="badge badge-secondary badge-soft"><i class="pi pi-clock"></i></div>
        </button>

        <button class="btn btn-soft btn-secondary mb-2">
          <i class="pi pi-plus"></i>
          To-Do List
          <div class="badge badge-secondary badge-soft"><i class="pi pi-list-check"></i></div>
        </button>

        <button class="btn btn-soft btn-secondary mb-2">
          <i class="pi pi-plus"></i>
          Weather
          <div class="badge badge-secondary badge-soft"><i class="pi pi-cloud"></i></div>
        </button>

        <button class="btn btn-soft btn-secondary">
          <i class="pi pi-plus"></i>
          Calendar
          <div class="badge badge-secondary badge-soft"><i class="pi pi-calendar"></i></div>
        </button>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
