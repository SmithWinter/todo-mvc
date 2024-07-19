<template>
  <div
    class="task-item-container"
    :class="{ highlight: isHighlighted }"
    @focus="handleFocus"
    @blur="handleBlur"
    @mouseenter="mouseOnHandler"
    @mouseleave="mouseOutHandler"
    tabindex="0"
  >
    <span class="icon-container" @click="toggleTaskStatus" v-if="isDisabled">
      <img :src="checkCurrentImage()" />
    </span>
    <label
      class="data-label"
      v-if="isDisabled"
      @dblclick="inputFocusHandler"
      :class="{ marked: props.item.isFinished }"
    >
      {{ props.item.task }}
    </label>
    <input
      class="task-item"
      placeholder="What needs to be done?"
      type="text"
      ref="editInput"
      v-if="!isDisabled"
      v-model="taskName"
      @blur="inputBlurHandler"
      @keyup.enter="keypressHandler"
      :disabled="isDisabled"
    />
    <span
      class="delete-button"
      v-if="isDisabled"
      :class="{ hidden: isHidden }"
      @click="deleteButtonHandler"
    >
      <img src="/remove.png" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { taskStore } from '../../store/taskStore'
import { type Task } from '../../helpers/interface'

const unchecked = '/unchecked.png'
const checked = '/checked.png'

const props = defineProps<{ item: Task }>()
const useTaskStore = taskStore()

const isHighlighted = ref(false)
const isDisabled = ref(true)
const isHidden = ref(true)
const editInput = ref()
const taskName = ref()
const taskStatus = ref()

const checkCurrentImage = () => {
  if (props.item.isFinished) {
    return checked
  }
  return unchecked
}

const inputFocusHandler = () => {
  isDisabled.value = false
  taskName.value = props.item.task
  nextTick(() => {
    editInput.value.focus()
  })
}

const keypressHandler = async () => {
  isDisabled.value = true
  if (taskName.value) {
    const task = taskName.value
    await useTaskStore.editTask(props.item.id, { task })
  }
}

const inputBlurHandler = () => {
  isDisabled.value = true
}
const toggleTaskStatus = async () => {
  taskStatus.value = props.item.isFinished
  const isFinished = !taskStatus.value
  await useTaskStore.editTask(props.item.id, { isFinished })
}

const deleteButtonHandler = async () => {
  await useTaskStore.deleteTask(props.item.id)
}

const handleFocus = () => {
  isHighlighted.value = true
}

const handleBlur = () => {
  isHighlighted.value = false
}

const mouseOnHandler = () => {
  isHidden.value = false
}

const mouseOutHandler = () => {
  isHidden.value = true
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
