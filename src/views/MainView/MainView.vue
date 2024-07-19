<template>
  <div class="main">
    <div class="header">
      <TitleComponent />
    </div>

    <div class="body">
      <InputComponent :toggleCheckAllTask="toggleCheckAllTask" />
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
import { useRoute } from 'vue-router'

import TitleComponent from '../../components/Title/TitleComponent.vue'
import InputComponent from '../../components/Input/InputComponent.vue'
import TaskList from '../../components/TaskList/TaskList.vue'
import Disclaimer from '../../components/Disclaimer/DisclaimerComponent.vue'
import { taskStore } from '../../store/taskStore'
import { menuList } from '../../helpers/utils'
import { type MenuItem } from '../../helpers/interface'

const route = useRoute()

const useTaskStore = taskStore()
const { tasks } = storeToRefs(useTaskStore)

onMounted(async () => {
  try {
    const exactMenuItem = menuList.find((item: MenuItem) => {
      return String(item.path) === String(route.path)
    })
    const exactParams = exactMenuItem?.params || ''
    await useTaskStore.fetchTasks(exactParams)
    console.log(tasks.value)
  } catch (error) {
    console.error(error)
  }
})

const itemRemainingCounter = computed(() => {
  const number: number = tasks.value.length
  return number > 1 ? `${number} items left` : `${number} item left`
})

const toggleCheckAllTask = computed(() => {
  const taskQuantity: number = tasks.value.length
  return taskQuantity === 0 ? false : true
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
