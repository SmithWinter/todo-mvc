<template>
  <div class="task-list-container">
    <div class="task-list">
      <TaskItem v-for="item in props.data" :key="item.id" :item="item" />
    </div>

    <div class="task-list-info">
      <div class="list-counter">{{ props.counter }}</div>
      <TaskMenu v-for="item in menuList" :key="item.path" :menu="item" />
      <div class="delete-completed-tasks" @click="deleteAllTaskHandler">Clear Completed</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import TaskItem from '../TaskItem/TaskItem.vue'
import TaskMenu from '../TaskMenu/TaskMenu.vue'
import { type Task } from '../../helpers/interface'
import { menuList } from '../../helpers/utils'
import { taskStore } from '../../store/taskStore'

const useTaskStore = taskStore()
const router = useRouter()

const props = defineProps<{
  data: Task[]
  counter: string
}>()

const deleteAllTaskHandler = async () => {
  await useTaskStore.clearCompletedTask()
  useTaskStore.checkAllTaskCompleted()
  router.push('/')
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
