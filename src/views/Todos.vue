<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodos } from '../composables/useTodo'
import TodoItem from '../components/TodoItem.vue'
import CreateTodoForm from '../components/CreateTodoForm.vue'

type FilterStatus = 'ALL' | 'TODO' | 'DONE'

const TODOS_PER_PAGE = 10

const currentPage = ref<number>(1)
const searchTerm = ref<string>('')
const filterStatus = ref<FilterStatus>('ALL')

const { data: tasks, isLoading, isError } = useTodos(currentPage.value, TODOS_PER_PAGE)

const filteredTasks = computed(() => {
  return (tasks.value ?? []).filter((task) => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesStatus =
      filterStatus.value === 'ALL' || task.status.toUpperCase() === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

const totalPages = computed(() => Math.ceil(filteredTasks.value.length / TODOS_PER_PAGE))

const paginatedTasks = computed(() =>
  filteredTasks.value.slice(
    (currentPage.value - 1) * TODOS_PER_PAGE,
    currentPage.value * TODOS_PER_PAGE,
  ),
)

function setFilter(status: FilterStatus) {
  filterStatus.value = status
  currentPage.value = 1
}

function handleSearchInput() {
  currentPage.value = 1
}

function prevPage() {
  currentPage.value = Math.max(currentPage.value - 1, 1)
}

function nextPage() {
  currentPage.value = Math.min(currentPage.value + 1, totalPages.value)
}
</script>

<template>
  <div class="page">
    <div class="header">
      <h1 class="header__title">Task Manager</h1>
      <span class="header__badge">{{ filteredTasks.length }} tasks</span>
    </div>

    <CreateTodoForm />

    <div class="toolbar">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search tasks…"
        class="toolbar__search"
        @input="handleSearchInput"
      />
      <div class="toolbar__chips">
        <button
          v-for="f in (['ALL', 'TODO', 'DONE'] as FilterStatus[])"
          :key="f"
          :class="['chip', { 'chip--active': filterStatus === f }]"
          @click="setFilter(f)"
        >
          {{ f === 'ALL' ? 'All' : f === 'TODO' ? 'Todo' : 'Done' }}
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="state-msg">Loading tasks…</div>
    <div v-else-if="isError" class="state-msg state-msg--error">Failed to load tasks.</div>

    <template v-else>
      <p class="section-label">Tasks</p>
      <div v-if="paginatedTasks.length === 0" class="state-msg">No tasks found.</div>
      <div v-else class="task-card">
        <TodoItem v-for="task in paginatedTasks" :key="task.id" :task="task" />
      </div>
      <div class="pagination">
        <button class="pg-btn" :disabled="currentPage === 1" @click="prevPage">← Previous</button>
        <span class="pg-label">Page {{ currentPage }} of {{ totalPages }}</span>
        <button class="pg-btn" :disabled="currentPage === totalPages || totalPages === 0" @click="nextPage">Next →</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.page { max-width: 720px; margin: 0 auto; padding: 2rem 1rem; }
.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
.header__title { font-size: 22px; font-weight: 600; color: #1a1a2e; }
.header__badge { font-size: 12px; font-weight: 500; padding: 4px 12px; border-radius: 20px; background: #e6f1fb; color: #0c447c; }
.toolbar { display: flex; gap: 10px; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; }
.toolbar__search { flex: 1; min-width: 160px; height: 36px; padding: 0 12px; border: 1px solid #e0e4ec; border-radius: 8px; font-size: 13px; background: #fff; color: #1a1a2e; outline: none; transition: border-color 0.15s; }
.toolbar__search:focus { border-color: #185fa5; }
.toolbar__chips { display: flex; gap: 6px; }
.chip { height: 36px; padding: 0 16px; border: 1px solid #e0e4ec; border-radius: 20px; font-size: 13px; background: #fff; color: #5f6b7a; transition: all 0.15s; }
.chip:hover { border-color: #185fa5; color: #185fa5; }
.chip--active { background: #e6f1fb; border-color: #85b7eb; color: #185fa5; font-weight: 500; }
.section-label { font-size: 11px; font-weight: 600; color: #9aa3b0; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; }
.task-card { background: #fff; border: 1px solid #e8ecf2; border-radius: 12px; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
.pagination { display: flex; align-items: center; justify-content: center; gap: 12px; }
.pg-btn { height: 34px; padding: 0 16px; border: 1px solid #e0e4ec; border-radius: 8px; font-size: 13px; background: #fff; color: #5f6b7a; transition: all 0.15s; }
.pg-btn:hover:not(:disabled) { border-color: #185fa5; color: #185fa5; }
.pg-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.pg-label { font-size: 13px; color: #9aa3b0; }
.state-msg { text-align: center; padding: 3rem; color: #9aa3b0; font-size: 14px; }
.state-msg--error { color: #e24b4a; }
</style>
