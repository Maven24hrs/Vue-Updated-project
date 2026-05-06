export interface Task {
  id: string
  name: string
  status: string
  priority: string
  createdAt: string
  updatedAt: string
}

export interface TasksResponse {
  data: Task[]
}

export interface TaskResponse {
  data: Task
}

export interface CreateTaskInput {
  name: string
  status: 'TODO' | 'DONE'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
}
