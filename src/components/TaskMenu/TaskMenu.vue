<template>
  <div class="task-menu">
    <span
      class="task-menu-item"
      :class="{ highlight: isHighlighted }"
      @click="handleClick"
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
    const toggleHighlight = isHighlighted.value

    const handleClick = () => {
      isHighlighted.value = !toggleHighlight
    }
    return {
      isHighlighted,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
