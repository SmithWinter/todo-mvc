<script setup lang="ts">
import TitleComponent from '../../components/Title/TitleComponent.vue'
import InputComponent from '../../components/Input/InputComponent.vue'
</script>

<template>
  <div class="main">
    <div class="header">
      <TitleComponent>
        <template #text> To Do List • MVC </template>
      </TitleComponent>
    </div>

    <div class="body">
      <InputComponent> </InputComponent>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
