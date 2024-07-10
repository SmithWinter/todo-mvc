<template>
  <div
    class="input-container"
    :class="{ highlight: isHighlighted }"
    @focusin="handleFocus"
    @focusout="handleBlur"
    tabindex="0"
  >
    <span class="icon-container" @click="toggleItemChecked">
      <img :src="currentImage" />
    </span>
    <input class="new-todo" placeholder="What needs to be done?" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ToggleItemChecked',
  setup() {
    const isSelected = ref(false)
    const checked = '/checked.png'
    const unchecked = '/down-arrow.png'
    const currentImage = ref(unchecked)

    const isHighlighted = ref(false)

    const toggleItemChecked = () => {
      isSelected.value = !isSelected.value
      currentImage.value = isSelected.value ? checked : unchecked
    }

    const handleFocus = () => {
      isHighlighted.value = true
    }

    const handleBlur = () => {
      isHighlighted.value = false
    }

    return {
      isSelected,
      currentImage,
      toggleItemChecked,
      isHighlighted,
      handleFocus,
      handleBlur
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
