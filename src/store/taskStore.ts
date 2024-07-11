import { defineStore } from 'pinia'

import api from '../helpers/api'
import { type Task, type Params } from '../helpers/interface'

export const taskStore = defineStore('ToDoMVC', {
  state: () => ({
    tasks: [] as Task[]
  }),
  actions: {
    async fetchTasks(params: Params) {
      try {
        const response = await api.getAllTasks(params)
        this.tasks = response
        console.log('Data store: ', this.tasks)
      } catch (error) {
        console.error('Error:', error)
      }
    },

    async editTask(id: string, body: Task) {
      try {
        const response = await api.editTask(id, body)
        const index = this.tasks.findIndex((task: Task) => task.id === id)
        if (index !== -1) {
          this.tasks[index] = response
        }
        console.log('Data store: ', this.tasks)
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }
})
