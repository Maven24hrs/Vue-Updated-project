<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { useTodo } from '../composables/useTodos'

const route = useRoute()
const id = route.params.id as string
const { data: task, isLoading, isError } = useTodo(id)
</script>

<template>
  <div class="page">
    <div v-if="isLoading" class="state-msg">Loading task details…</div>
    <div v-else-if="isError" class="state-msg state-msg--error">Failed to load task details.</div>
    <div v-else-if="!task" class="state-msg">Task not found.</div>

    <template v-else>
      <RouterLink to="/" class="back-link">← Back to Tasks</RouterLink>

      <div class="detail-card">
        <div class="detail-card__header">
          <h2 class="detail-card__title">{{ task.name }}</h2>
          <span :class="['status-pill', `status-pill--${task.status.toLowerCase()}`]">
            {{ task.status }}
          </span>
        </div>

        <div class="detail-card__body">
          <div class="detail-row">
            <span class="detail-row__label">Priority</span>
            <span :class="['priority-badge', `priority-badge--${task.priority.toLowerCase()}`]">
              {{ task.priority }}
            </span>
          </div>
          <div class="detail-row">
            <span class="detail-row__label">Created</span>
            <span class="detail-row__value">{{ new Date(task.createdAt).toLocaleString() }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-row__label">Updated</span>
            <span class="detail-row__value">{{ new Date(task.updatedAt).toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.page { max-width: 720px; margin: 0 auto; padding: 2rem 1rem; }

.back-link {
  display: inline-block;
  font-size: 13px;
  color: #185fa5;
  margin-bottom: 1.25rem;
  transition: color 0.15s;
}

.back-link:hover { color: #0c447c; }

.detail-card {
  background: #fff;
  border: 1px solid #e8ecf2;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

.detail-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f0f3f8;
}

.detail-card__title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
}

.detail-card__body { padding: 0.5rem 0; }

.detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.5rem;
  border-bottom: 1px solid #f0f3f8;
}

.detail-row:last-child { border-bottom: none; }

.detail-row__label {
  font-size: 13px;
  color: #9aa3b0;
  font-weight: 500;
}

.detail-row__value {
  font-size: 13px;
  color: #1a1a2e;
}

.status-pill {
  font-size: 11px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 20px;
}

.status-pill--todo { background: #faeeda; color: #854f0b; }
.status-pill--done { background: #eaf3de; color: #3b6d11; }

.priority-badge {
  font-size: 11px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 20px;
}

.priority-badge--high { background: #fcebeb; color: #a32d2d; }
.priority-badge--medium { background: #faeeda; color: #854f0b; }
.priority-badge--low { background: #eaf3de; color: #3b6d11; }

.state-msg { text-align: center; padding: 3rem; color: #9aa3b0; font-size: 14px; }
.state-msg--error { color: #e24b4a; }
</style>
