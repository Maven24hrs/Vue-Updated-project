<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="page">
    <div class="not-found">
      <p class="not-found__code">404</p>
      <h2 class="not-found__title">Page not found</h2>
      <p class="not-found__msg">The page you're looking for doesn't exist.</p>
      <RouterLink to="/" class="not-found__btn">← Back to Tasks</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.page { max-width: 720px; margin: 0 auto; padding: 2rem 1rem; }

.not-found {
  text-align: center;
  padding: 5rem 2rem;
}

.not-found__code {
  font-size: 72px;
  font-weight: 700;
  color: #e6f1fb;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.not-found__title {
  font-size: 22px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.not-found__msg {
  font-size: 14px;
  color: #9aa3b0;
  margin-bottom: 1.5rem;
}

.not-found__btn {
  display: inline-block;
  height: 38px;
  line-height: 38px;
  padding: 0 20px;
  background: #185fa5;
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.15s;
}

.not-found__btn:hover { background: #0c447c; }
</style>
