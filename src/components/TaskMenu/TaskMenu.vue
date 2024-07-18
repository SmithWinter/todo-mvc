<template>
  <div class="task-menu">
    <div
      class="task-menu-item"
      :class="{ highlight: String(props.menu.path) === String(route.path) }"
      @click="fetchFilteredData"
      tabindex="0"
    >
      {{ props.menu.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import { type MenuItem } from '../../helpers/interface'
import { taskStore } from '../../store/taskStore'

const useTaskStore = taskStore()
const route = useRoute()
const router = useRouter()
const props = defineProps<{ menu: MenuItem }>()

const fetchFilteredData = async () => {
  try {
    router.push(String(props.menu.path))
    const itemParams = props.menu.params
    await useTaskStore.fetchTasks(itemParams)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
