<script setup lang="ts">
import { ref } from 'vue'
import IconSearch from './components/icons/IconSearch.vue'

import { useStocksStore } from './stores/store.ts'

const search = ref('')
const store = useStocksStore()
</script>

<template>
  <div class="container max-w-6xl mx-auto px-4 pb-8 space-y-6">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <h1 class="text-4xl font-bold mb-6 tracking-tight">Stock Tracker</h1>
    </header>

    <form class="relative flex gap-2">
      <div class="relative flex-1">
        <input
          type="text"
          class="w-full text-[#444] placeholder:text-[#444] border rounded-md px-2 py-3 flex h-10 border-[#444] bg-transparent ring-[#444] focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 outline-none pr-10"
          placeholder="Search by ticker symbol (e.g., AAPL, MSFT, GOOGL)"
          value=""
          v-model="search"
          @input="store.setSearchQuery(search)"
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
