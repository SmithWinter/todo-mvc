<template>
  <div class="task-menu">
    <div
      class="task-menu-item"
      :class="{ highlight: String(route.path) === String(props.menu.path) }"
      @click="fetchFilteredData"
      tabindex="0"
    >
      <RouterLink v-bind:to="props.menu.path">
        {{ props.menu.name }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'

import { type MenuItem } from '../../helpers/interface'
import { taskStore } from '../../store/taskStore'

const useTaskStore = taskStore()
const route = useRoute()
const props = defineProps<{ menu: MenuItem }>()

const fetchFilteredData = () => {
  try {
    const itemParams = props.menu.params
    useTaskStore.fetchTasks(itemParams)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
