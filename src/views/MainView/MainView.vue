<template>
  <div class="main">
    <div class="header">
      <TitleComponent />
    </div>

    <div class="body">
      <InputComponent />
      <TaskList :data="tasks" :counter="itemRemainingCounter" />
    </div>

    <div class="footer">
      <Disclaimer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'

import TitleComponent from '../../components/Title/TitleComponent.vue'
import InputComponent from '../../components/Input/InputComponent.vue'
import TaskList from '../../components/TaskList/TaskList.vue'
import Disclaimer from '../../components/Disclaimer/DisclaimerComponent.vue'
import { taskStore } from '../../store/taskStore'

const useTaskStore = taskStore()
const { tasks } = storeToRefs(useTaskStore)

onMounted(() => {
  try {
    useTaskStore.fetchTasks()
    console.log(tasks.value)
  } catch (error) {
    console.error(error)
  }
})

const itemRemainingCounter = computed(() => {
  const number = tasks.value.length
  return number > 1 ? `${number} items left` : `${number} item left`
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
