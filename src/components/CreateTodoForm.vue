<script setup lang="ts">
import { ref } from 'vue'
import { useCreateTodo } from '../composables/useCreateTodo'

const name = ref<string>('')
const errorMsg = ref<string | null>(null)
const { mutate, isPending } = useCreateTodo()

function handleSubmit() {
  errorMsg.value = null
  mutate(
    { name: name.value, status: 'TODO', priority: 'MEDIUM' },
    {
      onSuccess: () => { name.value = '' },
      onError: (err: unknown) => {
        errorMsg.value = err instanceof Error ? err.message : 'Failed to create task.'
      },
    },
  )
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <input
      v-model="name"
      type="text"
      placeholder="Add a new task…"
      required
      class="form__input"
    />
    <button type="submit" class="form__btn" :disabled="isPending">
      <span v-if="isPending">Adding…</span>
      <span v-else>+ Add Task</span>
    </button>
    <p v-if="errorMsg" class="form__error">{{ errorMsg }}</p>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  gap: 8px;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.form__input {
  flex: 1;
  min-width: 200px;
  height: 40px;
  padding: 0 14px;
  border: 1px solid #e0e4ec;
  border-radius: 8px;
  font-size: 14px;
  color: #1a1a2e;
  background: #fff;
  outline: none;
  transition: border-color 0.15s;
}

.form__input:focus {
  border-color: #185fa5;
}

.form__input::placeholder {
  color: #b0b8c5;
}

.form__btn {
  height: 40px;
  padding: 0 20px;
  background: #185fa5;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.15s;
  white-space: nowrap;
}

.form__btn:hover:not(:disabled) {
  background: #0c447c;
}

.form__btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form__error {
  width: 100%;
  font-size: 13px;
  color: #e24b4a;
  margin-top: 2px;
}
</style>
