<script setup lang="ts">
import { ref } from 'vue'
import Modal from '../components/CxModal.vue'
import CxCard from '../components/CxCard.vue'

const showModal = ref(false)
</script>

<template>
  <main>
    <h1 class="text-2xl font-semibold mb-6 tracking-tight">Popular Stocks</h1>
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-[#333]">
        <thead class="text-base text-[#444]">
          <tr>
            <th scope="col" class="px-6 py-3 bg-gray-50 font-medium">Ticker</th>
            <th scope="col" class="px-6 py-3 bg-gray-50 font-medium">Name</th>
            <th scope="col" class="px-6 py-3 bg-gray-50 font-medium">Price</th>
            <th scope="col" class="px-6 py-3 bg-gray-50 font-medium">Trend</th>
            <th scope="col" class="px-6 py-3 bg-gray-50 font-medium">Change</th>
            <th scope="col" class="px-6 py-3 bg-gray-50 font-medium">Change Percent</th>
            <th scope="col" class="px-6 py-3 bg-gray-50 font-medium">Market Cap</th>
            <th scope="col" class="px-6 py-3 bg-gray-50 font-medium">P/E</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="e in 5"
            :key="e"
            class="border-b border-[#888]/20 hover:bg-[#888]/30"
            @click="showModal = !showModal"
          >
            <th scope="row" class="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
              AAPL
            </th>
            <td class="px-6 py-4">Apple Inc</td>
            <td class="px-6 py-4">138.2</td>
            <td class="px-6 py-4">$2999</td>
            <td class="px-6 py-4">2333 B</td>
            <td class="px-6 py-4">$2999</td>
            <td class="px-6 py-4">$2999</td>
            <td class="px-6 py-4">30.2</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal :showing="showModal" @toggle-modal="showModal = false">
      <div class="w-full space-y-5">
        <div class="flex justify-between">
          <div class="flex flex-col">
            <span class="text-3xl font-bold tracking-tight">AAPL</span>
            <span class="text-[#222]">Apple Inc.</span>
          </div>
          <div>Add to Watchlist</div>
        </div>
        <div class="flex gap-4 text-[#222] font-semibold">
          <CxCard>
            <p class="text-xl font-semibold tracking-tight">Pricing Information</p>
            <div class="flex justify-between items-center">
              <div>
                <span class="text-5xl tracking-tighter font-semibold">$233</span>
                <div class="text-green-400">
                  <span>344 </span>
                  <span>( 344% )</span>
                </div>
              </div>
              <div class="flex flex-col">
                <span class="text-[#999] font-normal tracking-tight">Market Cap</span>
                <span>$2333 B</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-y-2 font-semibold">
              <div class="w-[10rem]">
                <p class="flex flex-col">
                  <span class="text-[#999] font-normal tracking-tight">Open</span>
                  <span class="text-[#222]">186.5</span>
                </p>
              </div>
              <div class="w-[20rem]">
                <p class="flex flex-col">
                  <span class="text-[#999] font-normal tracking-tight">Previous close</span>
                  <span class="text-[#222]">186.5</span>
                </p>
              </div>
              <div class="w-[20rem]">
                <p class="flex flex-col">
                  <span class="text-[#999] font-normal tracking-tight">Day's Range</span>
                  <span class="text-[#222]">186.5</span>
                </p>
              </div>
              <div class="w-[20rem]">
                <p class="flex flex-col">
                  <span class="text-[#999] font-normal tracking-tight">52 week range</span>
                  <span class="text-[#222]">186.5</span>
                </p>
              </div>
            </div>
          </CxCard>
          <CxCard>
            <p class="text-xl font-semibold tracking-tight">Information Information</p>
            <div class="flex justify-between items-center">
              <div class="flex flex-col">
                <span class="text-[#999] font-normal tracking-tight">Volume</span>
                <span>$2333344</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[#999] font-normal tracking-tight">Av. Volume</span>
                <span>$2333 B</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-y-2 font-semibold">
              <div class="w-[10rem]">
                <p class="flex flex-col">
                  <span class="text-[#999] font-normal tracking-tight">Open</span>
                  <span class="text-[#222]">186.5</span>
                </p>
              </div>
              <div class="w-[20rem]">
                <p class="flex flex-col">
                  <span class="text-[#999] font-normal tracking-tight">Previous close</span>
                  <span class="text-[#222]">186.5</span>
                </p>
              </div>
              <div class="w-[20rem]">
                <p class="flex flex-col">
                  <span class="text-[#999] font-normal tracking-tight">Day's Range</span>
                  <span class="text-[#222]">186.5</span>
                </p>
              </div>
              <div class="w-[20rem]">
                <p class="flex flex-col">
                  <span class="text-[#999] font-normal tracking-tight">52 week range</span>
                  <span class="text-[#222]">186.5</span>
                </p>
              </div>
            </div>
          </CxCard>
        </div>
        <CxCard>
          <p>Price Trend</p>
          <div class="h-[10rem]"></div>
        </CxCard>
      </div>
    </Modal>
  </main>
</template>
