<template>
    <div class="flex h-screen">
      <div class="flex flex-col w-[60%] relative bg-red-200">
        <div class="absolute flex flex-row justify-between items-center py-4 px-6">
          <h1 class="font-spectral text-xl font-semibold flex flex-row items-center justify-center gap-[4px]">
            <ShieldCheck />
            Keyvaultify
          </h1>
        </div>
        <div class="flex h-screen justify-center items-center">
          <slot />
        </div>
      </div>
        <div class="flex w-[40%] bg-[#F2F0EF] h-full" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ShieldCheck } from 'lucide-vue-next'
  
  const { user } = useAuth()
  
  onMounted(() => {
    if (user.value) {
      navigateTo('/dashboard')
    }
  })
  </script>