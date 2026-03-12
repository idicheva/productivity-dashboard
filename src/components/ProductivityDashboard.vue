<script setup>
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import NoWidgets from './NoWidgets.vue'
import WidgetCard from './WidgetCard.vue'
import { useWidgetsStore } from '@/stores/widgetsStore'
import { useWidgetResolver } from '@/composables/useWidgetResolver'
import { VueDraggableNext } from 'vue-draggable-next'

const widgetsStore = useWidgetsStore()
const { activeWidgets, widgets } = storeToRefs(widgetsStore)
const { resolve } = useWidgetResolver()
const draggableWidgets = ref([])

watch(
  widgets,
  () => {
    draggableWidgets.value = widgets.value.filter((widget) => widget.active)
  },
  { immediate: true, deep: true },
)

function syncDefaultOrder() {
  let activeIndex = 0

  const activeOrder = widgets.value.map((widget) => {
    if (activeWidgets.value.includes(widget.name)) {
      return draggableWidgets.value[activeIndex++]
    }
    return widget
  })

  widgets.value = activeOrder
}

const removeWidget = (widgetName) => {
  widgetsStore.changeWidgetActiveState(widgetName, false)
}
</script>
<template>
  <div v-if="activeWidgets.length">
    <VueDraggableNext
      v-model="draggableWidgets"
      item-key="name"
      class="flex flex-wrap justify-center"
      draggable=".draggable-widget-item"
      chosenClass="drag-chosen"
      handle=".widget-drag-handle"
      :animation="200"
      @change="syncDefaultOrder"
    >
      <div v-for="widget in draggableWidgets" :key="widget.name" class="draggable-widget-item">
        <WidgetCard :widget="widget" @removeWidget="removeWidget">
          <component :is="resolve(widget.name)" />
        </WidgetCard>
      </div>
    </VueDraggableNext>
  </div>
  <NoWidgets v-else />
</template>

<style>
.drag-chosen {
  opacity: 0.4;
}
</style>
