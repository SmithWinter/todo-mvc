export interface Task {
  id?: string
  task?: string
  isFinished?: boolean
}

export interface Params {
  params: Record<string, any>
}

export interface MenuItem {
  name: string
  path: string
  params: {
    isFinished?: boolean
  }
}

export interface taskID {
  id: string
}
