import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

import api from '../helpers/api'
import { type Task, type Params } from '../helpers/interface'
import { uuidGenerator } from '../helpers/utils'

const toast = useToast()

export const taskStore = defineStore('ToDoMVC', {
  state: () => ({
    tasks: [] as Task[],
    allTaskCompleted: false as boolean
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
        const response = await api.postTask({ ...task, id: uuidGenerator(10) })
        this.tasks.push(response)
        toast.success('Task added successfully')
        console.log('Data store: ', this.tasks)
      } catch (error) {
        console.error('Error:', error)
        toast.error('Something went wrong, please try again')
      }
    },
    /**
     * Modifies the status of all tasks based on the provided parameters.
     *
     * This function sends a request to the API to modify the status of all tasks.
     * If the request is successful, the updated tasks are stored in the data store.
     * If the request fails, an error message is displayed using the toast notification system.
     *
     * @param params - The parameters to be used for modifying the task status.
     *
     * @returns {Promise<Task[]>} - A promise that resolves when all tasks status are successfully modified.
     * The updated tasks are returned as the promise result.
     *
     * @throws Will throw an error if the modify all task status operation fails.
     */
    async modifyAllTaskStatus(params: Params) {
      try {
        const response = await api.modifyAllTaskStatus(params)
        this.tasks = response
        console.log('Data store: ', this.tasks)
        toast.success('Modify all task status successfully')
      } catch (error) {
        toast.error('Something went wrong, please try again')
        console.error('Error:', error)
      }
    },
    /**
     * Clears all completed tasks from the data store.
     *
     * This function sends a request to the API to clear all completed tasks.
     * If the request is successful, the updated tasks are stored in the data store.
     * If the request fails, an error message is displayed using the toast notification system.
     *
     * @returns {Promise<void>} - A promise that resolves when all completed tasks are successfully cleared.
     *
     * @throws Will throw an error if the clear completed tasks operation fails.
     */
    async clearCompletedTask() {
      try {
        const response = await api.clearCompletedTask()
        this.tasks = response
        console.log('Data store: ', this.tasks)
        toast.success('Delete all completed task successfully')
      } catch (error) {
        toast.error('Something went wrong, please try again')
        console.error('Error:', error)
      }
    },
    /**
     * Checks if all tasks in the data store are completed.
     * Updates the `allTaskCompleted` state accordingly.
     *
     * @remarks
     * This function calculates the total number of tasks and the number of completed tasks.
     * It then compares these two values to determine if all tasks are completed.
     * The `allTaskCompleted` state is updated accordingly.
     *
     * @throws Will throw an error if there is an issue calculating the task completion status.
     */
    checkAllTaskCompleted() {
      try {
        const taskQuantity = this.tasks.length
        const completedTaskQuantity = this.tasks.filter((task: Task) => task.isFinished).length
        if (Number(completedTaskQuantity) === Number(taskQuantity)) {
          this.allTaskCompleted = true
        } else {
          this.allTaskCompleted = false
        }
        console.log('All task completed: ', this.allTaskCompleted)
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }
})
