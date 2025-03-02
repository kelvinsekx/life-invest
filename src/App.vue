<script setup lang="ts">
import CxInput from './components/CxInput.vue'
import IconSearch from './components/icons/IconSearch.vue'
</script>

<template>
  <div class="container max-w-6xl mx-auto px-4 py-8 space-y-6">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <h1 class="text-4xl font-bold mb-6 tracking-tight">Stock Tracker</h1>
    </header>

    <form class="relative flex gap-2">
      <div class="relative flex-1">
        <CxInput
          type="text"
          placeholder="Search by ticker symbol (e.g., AAPL, MSFT, GOOGL)"
          value=""
          class="pr-10"
        />
      </div>
      <button
        type="submit"
        class="bg-[#222] text-white flex items-center rounded-md px-3 py-1 gap-x-2"
      >
        <IconSearch class="h-4 w-4 mr-2" />
        Search
      </button>
    </form>

    <RouterView />
  </div>
</template>
