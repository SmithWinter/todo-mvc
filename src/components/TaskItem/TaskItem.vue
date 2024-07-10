<template>
  <div
    class="task-item-container"
    :class="{ highlight: isHighlighted }"
    @focusin="handleFocus"
    @focusout="handleBlur"
    tabindex="0"
  >
    <span class="icon-container" @click="toggleTaskStatus">
      <img :src="checkCurrentImage()" />
    </span>
    <input class="task-item" placeholder="What needs to be done?" :value="task" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'

interface Task {
  id: number
  task: string
  isFinished: boolean
}

export default defineComponent({
  name: 'ToggleTaskStatus',
  props: {
    item: {
      type: Object as PropType<Task>,
      required: true
    }
  },
  setup(props) {
    const data = props.item
    const { id, task, isFinished } = data

    const unchecked = '/unchecked.png'
    const checked = '/checked.png'
    const isHighlighted = ref(false)
    const markedTask = ref(isFinished)

    const checkCurrentImage = () => {
      if (markedTask.value) {
        return checked
      }
      return unchecked
    }

    const toggleTaskStatus = () => {
      markedTask.value = !markedTask.value
    }

    const handleFocus = () => {
      isHighlighted.value = true
    }

    const handleBlur = () => {
      isHighlighted.value = false
    }

    return {
      checkCurrentImage,
      toggleTaskStatus,
      isHighlighted,
      handleFocus,
      handleBlur,
      id,
      task,
      isFinished
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
