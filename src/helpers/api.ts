import axios, { type AxiosResponse } from 'axios'
import { type Task, type Params } from './interface'

const API_URL = 'http://localhost:3000'

class apiService {
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

  async editTask(id: string, task: Task): Promise<AxiosResponse<Task> | undefined> {
    try {
      const response = await axios.patch(`${API_URL}/taskList/${id}`, task)
      if (response.status === 200) {
        return response.data
      } else {
        throw Error('Something wrong')
      }
    } catch (error) {
      console.error('Error edit task:', error)
      return undefined
    }
  }

  // postTask(task: Task): Promise<AxiosResponse<Task>> {
  //   return axios.post(`${API_URL}/taskList`, task)
  // }
}

export default new apiService()
