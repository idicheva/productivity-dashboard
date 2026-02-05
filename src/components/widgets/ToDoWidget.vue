<script setup></script>

<template>
  <div class="join self-center">
    <div>
      <label class="input input-secondary input-sm join-item">
        <input type="text" placeholder="Add a new task..." />
      </label>
    </div>
    <button class="btn btn-secondary join-item btn-sm">Add</button>
  </div>
  <!-- Empty State - will be implemented with v-if when the logic is ready -->
  <!-- <div class="flex justify-center mt-10">
    <div class="uppercase font-semibold opacity-50">No tasks yet</div>
  </div> -->

  <ul class="list bg-base-100 rounded-box shadow-md overflow-y-scroll max-h-42">
    <li class="list-row">
      <button class="btn btn-xs btn-circle btn-ghost">
        <i class="pi pi-times"></i>
      </button>
      <div class="list-col-grow">
        <div>
          <span class="text-xs uppercase font-semibold opacity-50"> Learn Vue.js </span>
        </div>
      </div>
      <input
        type="checkbox"
        :checked="isChecked"
        class="checkbox checkbox-xs checkbox-secondary self-center"
      />
    </li>

    <li class="list-row">
      <button class="btn btn-xs btn-circle btn-ghost">
        <i class="pi pi-times"></i>
      </button>
      <div class="list-col-grow">
        <div>
          <span class="text-xs uppercase font-semibold opacity-50"> Create a Vue.js APP </span>
        </div>
      </div>
      <input
        type="checkbox"
        :checked="isChecked"
        class="checkbox checkbox-xs checkbox-secondary self-center"
      />
    </li>
  </ul>
</template>
