import { useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import { API_URL, API_TOKEN } from '../config/api'
import type { CreateTaskInput, Task, TaskResponse } from '../types/todo'

export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation<Task, Error, CreateTaskInput>({
    mutationFn: (newTask: CreateTaskInput) =>
      axios
        .post<TaskResponse>(API_URL, newTask, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        })
        .then((res) => res.data.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })
}
