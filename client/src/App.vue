<template>
  <h1>Dropzone</h1>
  <div
    id="zone"
    @click="fileInput?.click()"
  >
    Drop a file here, or click to choose one
  </div>
  <input ref="fileInput" type="file" multiple hidden @change="onPick" />
  <FileCard v-for="entry in entries" :key="entry.name" :entry="entry" />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref } from 'vue';
import FileCard from './components/FileCard.vue';
import { createUploader } from "./uploader.js";
import { UploadEntry } from "./types.js";

// TODO: allow dragging and dropping files
// TODO: show upload progress

const uppy = createUploader();
const uploads = reactive(new Map<string, UploadEntry>());
const entries = computed(() => [...uploads.values()].reverse());

const fileInput = ref<HTMLInputElement | null>(null);

function addFiles(files: FileList | null | undefined) {
  if (!files) {
    return;
  }

  for (const file of Array.from(files)) {
    uppy.addFile({
      name: file.name,
      type: file.type,
      data: file
    });
  }
}

function onPick() {
  addFiles(fileInput.value?.files);

  if (fileInput.value) {
    fileInput.value.value = '';
  }
}

uppy.on('file-added', (file) => {
  uploads.set(file.name, { name: file.name });
});

uppy.on('thumbnail:generated', (file, preview) => {
  const entry = uploads.get(file.name);

  if (entry) {
    entry.thumbnail = preview;
  }
});

uppy.on('upload-success', (file, response) => {
  const entry = file && uploads.get(file.name);

  if (!entry) {
    return;
  }

  entry.response = response.body;
});

uppy.on('upload-error', (file, error) => {
  const entry = file && uploads.get(file.name!);
  if (!entry) {
    return;
  }

  entry.error = error.message;
});

onBeforeUnmount(() => uppy.destroy());
</script>

<style>
#zone {
  border: 2px dashed #999;
  border-radius: 12px;
  padding: 3rem 1rem;
  text-align: center;
  color: #666;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
#zone.dragover {
  background: #eef4ff;
  border-color: #4a90d9;
  color: #4a90d9;
}
</style>
