<template>
  <div class="task-menu">
    <span
      class="task-menu-item"
      :class="{ highlight: isHighlighted }"
      @click="handleClick"
      @focusout="handleBlur"
      tabindex="0"
    >
      {{ menu }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TaskMenuSelection',
  props: {
    menu: {
      type: String,
      required: true
    }
  },
  setup() {
    const isHighlighted = ref(false)
    const handleClick = () => {
      isHighlighted.value = true
    }

    const handleBlur = () => {
      isHighlighted.value = false
    }
    return {
      isHighlighted,
      handleClick,
      handleBlur
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
