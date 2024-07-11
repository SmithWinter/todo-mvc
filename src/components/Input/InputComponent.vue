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

<script setup lang="ts">
import { ref } from 'vue'

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
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
