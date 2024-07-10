<template>
  <div class="main">
    <div class="header">
      <TitleComponent />
    </div>

    <div class="body">
      <InputComponent />
      <TaskList :data="data" :counter="itemRemainingCounter" />
    </div>
  </div>
</template>

<script lang="ts">
import TitleComponent from '../../components/Title/TitleComponent.vue'
import InputComponent from '../../components/Input/InputComponent.vue'
import TaskList from '../../components/TaskList/TaskList.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'dataHandler',
  components: {
    TitleComponent,
    InputComponent,
    TaskList
  },
  data() {
    return {
      data: [
        {
          id: 1,
          task: 'Dummy task 1',
          isFinished: false
        },
        {
          id: 2,
          task: 'Dummy task 2',
          isFinished: true
        }
      ]
    }
  },
  computed: {
    itemRemainingCounter() {
      const counter = this.data.length
      if (counter > 1) {
        return `${counter} items left`
      }
      return `${counter} item left`
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
