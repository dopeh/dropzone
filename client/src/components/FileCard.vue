<template>
  <div class="card">
    <div class="header">
      <span class="name" v-html="props.entry.name"></span>
    </div>
    <img v-if="entry.thumbnail" class="thumb" :src="entry.thumbnail" alt="" />
    <pre v-if="entry.response" class="result">{{ JSON.stringify(entry.response, null, 2) }}</pre>
    <pre v-if="entry.error" class="result error">Upload failed: {{ entry.error }}</pre>
  </div>
</template>

<script setup lang="ts">
import { UploadEntry } from "../types.js";

const props = defineProps<{ entry: UploadEntry }>();

// TODO: check if for security issues
</script>

<style scoped>
.card {
  margin-top: 1.5rem;
  border: 1px solid #e3e3e3;
  border-radius: 8px;
  padding: 1rem;
}
.card.error {
  border-color: #e5a1a1;
}
.header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.95rem;
}
.name {
  overflow-wrap: anywhere;
}

.thumb {
  display: block;
  margin-top: 0.75rem;
  max-width: 100%;
  max-height: 240px;
  border-radius: 6px;
}
.result {
  margin: 0.75rem 0 0;
  white-space: pre-wrap;
  font-family: ui-monospace, monospace;
  font-size: 0.9rem;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
}
.result.error {
  background: #fdf1f1;
  color: #a33;
}
</style>
