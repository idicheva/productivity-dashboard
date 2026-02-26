<script setup>
import { storeToRefs } from 'pinia'
import NoWidgets from './NoWidgets.vue'
import WidgetCard from './WidgetCard.vue'
import { useWidgetsStore } from '@/stores/widgetsStore'
import { useWidgetResolver } from '@/composables/useWidgetResolver'

const widgetsStore = useWidgetsStore()
const { activeWidgets } = storeToRefs(widgetsStore)
const { resolve } = useWidgetResolver()

const removeWidget = (widgetName) => {
  widgetsStore.changeWidgetActiveState(widgetName, false)
}
</script>

<template>
  <div
    v-if="activeWidgets.length"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 m-6"
  >
    <WidgetCard
      v-for="activeWidget in activeWidgets"
      :key="activeWidget"
      :widget="widgetsStore.getWidgetByName(activeWidget)"
      @removeWidget="removeWidget"
    >
      <component :is="resolve(activeWidget)" />
    </WidgetCard>
  </div>
  <NoWidgets v-else />
</template>
