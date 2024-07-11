<template>
  <div
    class="task-item-container"
    :class="{ highlight: isHighlighted }"
    @focus="handleFocus"
    @blur="handleBlur"
    tabindex="0"
  >
    <span class="icon-container" @click="toggleTaskStatus">
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

const keypressHandler = () => {
  isDisabled.value = true
  const task = taskName.value
  useTaskStore.editTask(props.item.id, { task })
}

const inputBlurHandler = () => {
  isDisabled.value = true
}
const toggleTaskStatus = () => {
  taskStatus.value = props.item.isFinished
  const isFinished = !taskStatus.value
  useTaskStore.editTask(props.item.id, { isFinished })
}

const handleFocus = () => {
  isHighlighted.value = true
}

const handleBlur = () => {
  isHighlighted.value = false
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
