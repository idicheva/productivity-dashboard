<script setup>
import { storeToRefs } from 'pinia'
import NoWidgets from './NoWidgets.vue'
import WidgetCard from './WidgetCard.vue'
import { useWidgetsStore } from '@/stores/widgetsStore'
import { useWidgetResolver } from '@/composables/useWidgetResolver'

const widgetsStore = useWidgetsStore()
const { widgets, activeWidgets } = storeToRefs(widgetsStore)
const { resolve } = useWidgetResolver()

const findWidgetByName = (widgetName) => widgets.value.find((widget) => widget.name === widgetName)
</script>

<template>
  <div
    v-if="activeWidgets && activeWidgets.length > 0"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 m-6"
  >
    <WidgetCard
      v-for="activeWidget in widgetsStore.activeWidgets"
      :key="activeWidget"
      :widget="findWidgetByName(activeWidget)"
    >
      <component :is="resolve(activeWidget)"
    /></WidgetCard>
  </div>
  <NoWidgets v-else />
</template>
