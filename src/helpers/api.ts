import axios, { type AxiosResponse } from 'axios'
import { type Task, type Params } from './interface'

const API_URL = 'http://localhost:3000'

class apiService {
  /**
   * Fetches all tasks from the task list based on the provided parameters.
   *
   * @param params - The parameters to be sent with the GET request.
   *
   * @returns - A Promise that resolves to an array of tasks if the request is successful,
   * or `undefined` if an error occurs.
   *
   * @throws Will throw an error if the request fails or the status code is not 200.
   */
  async getAllTasks(params: Params): Promise<AxiosResponse<Task[]> | undefined> {
    try {
      const response = await axios.get(`${API_URL}/taskList`, { params })
      if (response.status === 200) {
        return response.data
      } else {
        throw Error('Something wrong')
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
      return undefined
    }
  }
  /**
   * Updates an existing task in the task list by its ID.
   *
   * @param id - The unique identifier of the task to be updated.
   * @param task - The updated task data.
   *
   * @returns - A Promise that resolves to the updated task if the request is successful,
   * or `undefined` if an error occurs.
   *
   * @throws Will throw an error if the request fails or the status code is not 200.
   */
  async editTask(id: string, task: Task): Promise<AxiosResponse<Task> | undefined> {
    try {
      const response = await axios.patch(`${API_URL}/taskList/${id}`, task)
      if (response.status === 200) {
        return response.data
      } else {
        throw Error('Something wrong')
      }
    } catch (error) {
      console.error('Error editing task:', error)
      return undefined
    }
  }
  /**
   * Deletes a task from the task list by its ID.
   *
   * @param id - The unique identifier of the task to be deleted.
   * @returns - A Promise that resolves to the deleted task if the request is successful,
   * or `undefined` if an error occurs.
   *
   * @throws Will throw an error if the request fails or the status code is not 200.
   */
  async deleteTask(id: string): Promise<AxiosResponse<Task> | undefined> {
    try {
      const response = await axios.delete(`${API_URL}/taskList/${id}`)
      if (response.status === 200) {
        return response.data
      } else {
        throw Error('Something wrong')
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      return undefined
    }
  }
  /**
   * Posts a new task to the task list.
   *
   * @param task - The parameters to be sent with the POST request.
   * @returns - A Promise that resolves to the created task if the request is successful,
   * or `undefined` if an error occurs.
   *
   * @throws Will throw an error if the request fails or the status code is not 200.
   */
  async postTask(task: Task): Promise<AxiosResponse<Task> | undefined> {
    try {
      const response = await axios.post(`${API_URL}/taskList`, { task })
      if (response.status === 200) {
        return response.data
      } else {
        throw Error('Something wrong')
      }
    } catch (error) {
      console.error('Error posting tasks:', error)
      return undefined
    }
  }
}

export default new apiService()
