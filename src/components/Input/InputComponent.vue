<template>
  <div
    class="input-container"
    :class="{ highlight: isHighlighted }"
    @focusin="handleFocus"
    @focusout="handleBlur"
    tabindex="0"
  >
    <span class="icon-container" @click="toggleItemChecked" v-if="props.toggleCheckAllTask">
      <img :src="imageSource()" />
    </span>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      v-model="taskInput"
      @keyup.enter="newTaskHandler"
      :class="{ spacing: !props.toggleCheckAllTask }"
    />
    <span class="clear-button" v-if="taskInput" @click="clearInputHandler"> Clear </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { taskStore } from '../../store/taskStore'
import { type Task } from '../../helpers/interface'

const useTaskStore = taskStore()
const checked = '/checked.png'
const unchecked = '/down-arrow.png'
const isHighlighted = ref(false)
const currentImage = ref(unchecked)
const taskInput = ref()

const props = defineProps<{
  toggleCheckAllTask: boolean
  allTaskCompleted: boolean
}>()

const imageSource = () => {
  return props.allTaskCompleted ? (currentImage.value = checked) : (currentImage.value = unchecked)
}

const toggleItemChecked = async () => {
  await useTaskStore.modifyAllTaskStatus({ status: !props.allTaskCompleted })
  useTaskStore.checkAllTaskCompleted()
}

const handleFocus = () => {
  isHighlighted.value = true
}

const handleBlur = () => {
  isHighlighted.value = false
}

const newTaskHandler = async () => {
  if (taskInput.value) {
    const data: Task = {
      task: taskInput.value,
      isFinished: false
    }
    await useTaskStore.addTask(data)
    useTaskStore.checkAllTaskCompleted()
  }
  taskInput.value = ''
}

const clearInputHandler = () => {
  taskInput.value = ''
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
