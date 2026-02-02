<script setup>
import NoWidgets from './NoWidgets.vue'
import WidgetCard from './WidgetCard.vue'
import { useWidgetsStore } from '@/stores/widgetsStore'

const widgetsStore = useWidgetsStore()
</script>

<template>
  <div
    v-if="widgetsStore.activeWidgets && widgetsStore.activeWidgets.length > 0"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 m-6"
  >
    <WidgetCard
      v-for="activeWidget in widgetsStore.activeWidgets"
      :key="activeWidget"
      :widgetName="activeWidget"
    />
  </div>
  <NoWidgets v-else />
</template>
