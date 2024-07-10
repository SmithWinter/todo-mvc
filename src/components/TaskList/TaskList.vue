<template>
  <div class="task-list-container">
    <div class="task-list">
      <TaskItem v-for="(item, index) in renderTaskList" :key="index" :item="item" />
    </div>

    <div class="task-list-info">
      <div class="list-counter">{{ itemRemaining }}</div>
      <TaskMenu v-for="(item, index) in menu" :key="index" :menu="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'
import TaskItem from '../TaskItem/TaskItem.vue'
import TaskMenu from '../TaskMenu/TaskMenu.vue'

export default defineComponent({
  name: 'DataHandler',
  components: {
    TaskItem,
    TaskMenu
  },
  props: {
    data: {
      type: Array as PropType<Array<{ id: number; task: string; isFinished: boolean }>>,
      required: true
    },
    counter: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { data, counter } = props
    const isHighlighted = ref(false)

    const menu = ref(['All', 'Active', 'Completed'])

    const handleFocus = () => {
      isHighlighted.value = true
    }

    const handleBlur = () => {
      isHighlighted.value = false
    }
    return {
      renderTaskList: data,
      itemRemaining: counter,
      isHighlighted,
      handleFocus,
      handleBlur,
      menu
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
