import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

import api from '../helpers/api'
import { type Task, type Params } from '../helpers/interface'
import { uuidGenerator }  from '../helpers/utils'

const toast = useToast()

export const taskStore = defineStore('ToDoMVC', {
  state: () => ({
    tasks: [] as Task[]
  }),
  actions: {
    /**
     * Fetches tasks from the API and updates the data store.
     *
     * @param params - The parameters to be used for fetching tasks.
     *
     * @returns {Promise<Task[]>} - A promise that resolves when the tasks are successfully fetched and updated.
     *
     * @throws Will throw an error if the task fetching fails.
     */
    async fetchTasks(params: Params) {
      try {
        const response = await api.getAllTasks(params)
        this.tasks = response
        console.log('Data store: ', this.tasks)
      } catch (error) {
        toast.error('Something went wrong, please try again')
        console.error('Error:', error)
      }
    },
    /**
     * Updates an existing task in the data store.
     *
     * @param id - The unique identifier of the task to be updated.
     * @param body - The updated task data.
     *
     * @returns {Promise<Task>} - A promise that resolves when the task is successfully updated.
     *
     * @throws Will throw an error if the task update fails.
     */
    async editTask(id: string, body: Task) {
      try {
        const response = await api.editTask(id, body)
        const index = this.tasks.findIndex((task: Task) => task.id === id)
        if (index !== -1) {
          this.tasks[index] = response
        }
        toast.success('Task updated successfully')
        console.log('Data store: ', this.tasks)
      } catch (error) {
        toast.error('Something went wrong, please try again')
        console.error('Error:', error)
      }
    },
    /**
     * Deletes a task from the data store based on the provided unique identifier.
     *
     * @param id - The unique identifier of the task to be deleted.
     *
     * @returns {Promise<void>} - A promise that resolves when the task is successfully deleted.
     *
     * @throws Will throw an error if the task deletion fails.
     */
    async deleteTask(id: string) {
      try {
        await api.deleteTask(id)
        this.tasks = this.tasks.filter((task: Task) => task.id !== id)
        toast.success('Task deleted successfully')
        console.log('Data store: ', this.tasks)
      } catch (error) {
        toast.error('Something went wrong, please try again')
        console.error('Error:', error)
      }
    },
    /**
     * Adds a new task to the data store.
     *
     * @param task - The task data to be added.
     *
     * @returns {Promise<Task>} - A promise that resolves when the task is successfully added.
     * The added task is returned as the promise result.
     *
     * @throws Will throw an error if the task addition fails.
     */
    async addTask(task: Task) {
      try {
        const response = await api.postTask({...task, id: uuidGenerator(10)  })
        this.tasks.push(response)
        toast.success('Task added successfully')
        console.log('Data store: ', this.tasks)
      } catch (error) {
        console.error('Error:', error)
        toast.error('Something went wrong, please try again')
      }
    }
  }
})
