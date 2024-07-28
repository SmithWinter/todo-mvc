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
      const response = await axios.post(`${API_URL}/taskList`, task)
      if (response.status === 201) {
        return response.data
      } else {
        throw Error('Something wrong')
      }
    } catch (error) {
      console.error('Error posting tasks:', error)
      return undefined
    }
  }
  /**
   * Performs a GET request to modify the status of all tasks based on the provided parameters.
   *
   * @param params - The parameters to be sent with the GET request.
   *
   * @returns - A Promise that resolves to the modified tasks if the request is successful,
   * or `undefined` if an error occurs.
   *
   * @throws Will throw an error if the request fails or the status code is not 200.
   *
   * @remarks
   * This function sends a GET request to the `/modifyAllTaskStatus` endpoint of the API.
   * It accepts a `Params` object as a parameter, which can contain any additional parameters required for the request.
   * The response is expected to be an array of tasks that were modified.
   * If the request is successful, the function resolves with the response data.
   * If an error occurs during the request, the function logs the error to the console and resolves with `undefined`.
   */
  async modifyAllTaskStatus(params: Params): Promise<AxiosResponse<Task> | undefined> {
    try {
      const response = await axios.get(`${API_URL}/modifyAllTaskStatus`, { params })
      if (response.status === 200) {
        return response.data
      } else {
        throw Error('Something wrong')
      }
    } catch (error) {
      console.error('Error checking all tasks:', error)
      return undefined
    }
  }
  /**
   * Performs a DELETE request to clear all completed tasks from the task list.
   *
   * @returns - A Promise that resolves to the cleared tasks if the request is successful,
   * or `undefined` if an error occurs.
   *
   * @throws Will throw an error if the request fails or the status code is not 200.
   *
   * @remarks
   * This function sends a DELETE request to the `/clearCompletedTask` endpoint of the API.
   * It does not require any parameters.
   * The response is expected to be an array of tasks that were cleared.
   * If the request is successful, the function resolves with the response data.
   * If an error occurs during the request, the function logs the error to the console and resolves with `undefined`.
   */
  async clearCompletedTask(): Promise<AxiosResponse<Task> | undefined> {
    try {
      const response = await axios.get(`${API_URL}/clearCompletedTask`)
      if (response.status === 200) {
        return response.data
      } else {
        throw Error('Something wrong')
      }
    } catch (error) {
      console.error('Error clearing completed tasks:', error)
      return undefined
    }
  }
}

export default new apiService()
