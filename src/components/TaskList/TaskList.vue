<template>
  <div class="task-list-container">
    <div class="task-list">
      <TaskItem v-for="item in props.data" :key="item.id" :item="item" />
    </div>

    <div class="task-list-info">
      <div class="list-counter">{{ props.counter }}</div>
      <TaskMenu v-for="item in menuList" :key="item.path" :menu="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskItem from '../TaskItem/TaskItem.vue'
import TaskMenu from '../TaskMenu/TaskMenu.vue'
import { type Task } from '../../helpers/interface'
import { menuList } from '../../helpers/utils'

const props = defineProps<{
  data: Task[]
  counter: string
}>()
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
