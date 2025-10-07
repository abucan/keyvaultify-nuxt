<template>
    <div class="w-full max-w-md">
      Authentication
    </div>
  </template>
  
  <script setup lang="ts">
  definePageMeta({
    layout: 'auth',
    middleware: [] // Don't apply global auth middleware
  })
  </script>