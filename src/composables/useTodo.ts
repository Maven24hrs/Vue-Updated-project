import { useQuery, keepPreviousData } from '@tanstack/vue-query'
import axios from 'axios'
import { API_URL } from '../config/api'
import type { Task, TasksResponse, TaskResponse } from '../types/todo'

export function useTodos(currentPage: number = 1, todosPerPage: number = 10) {
  return useQuery<Task[], Error>({
    queryKey: ['todos', currentPage, todosPerPage],
    queryFn: async () => {
      const { data } = await axios.get<TasksResponse>(
        `${API_URL}?page=${currentPage}&limit=${todosPerPage}`,
      )
      return data.data
    },
    placeholderData: keepPreviousData,
  })
}

export function useTodo(id: string | undefined) {
  return useQuery<Task, Error>({
    queryKey: ['todo', id],
    queryFn: async () => {
      const { data } = await axios.get<Task>(`${API_URL}/${id}`)
      return data // not data.data
    },
    enabled: !!id,
  })
}