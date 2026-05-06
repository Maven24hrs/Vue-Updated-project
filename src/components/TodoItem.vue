<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Task } from '../types/todo'

const props = defineProps<{ task: Task }>()

const isCompleted = computed(() => props.task.status === 'DONE')
const priorityClass = computed(() => (props.task.priority ?? 'medium').toLowerCase())
const statusClass = computed(() => (props.task.status ?? '').toLowerCase())
</script>

<template>
  <RouterLink :to="`/todos/${task.id}`" class="todo-item" :class="{ 'todo-item--done': isCompleted }">
    <span :class="['priority-dot', `priority-dot--${priorityClass}`]"></span>
    <span class="todo-item__name">{{ task.name }}</span>
    <span :class="['status-pill', `status-pill--${statusClass}`]">{{ task.status }}</span>
    <span class="todo-item__arrow">›</span>
  </RouterLink>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border-bottom: 1px solid #f0f3f8;
  transition: background 0.12s;
  text-decoration: none;
  color: inherit;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item:hover {
  background: #f8fafd;
}

.todo-item--done .todo-item__name {
  text-decoration: line-through;
  color: #b0b8c5;
}

.priority-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.priority-dot--high { background: #e24b4a; }
.priority-dot--medium { background: #ef9f27; }
.priority-dot--low { background: #639922; }

.todo-item__name {
  flex: 1;
  font-size: 14px;
  color: #1a1a2e;
}

.status-pill {
  font-size: 11px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 20px;
  flex-shrink: 0;
}

.status-pill--todo { background: #faeeda; color: #854f0b; }
.status-pill--done { background: #eaf3de; color: #3b6d11; }

.todo-item__arrow {
  color: #c5cdd8;
  font-size: 18px;
  line-height: 1;
}
</style>
