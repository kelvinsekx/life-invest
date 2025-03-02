<script setup lang="ts"></script>

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
          <tr v-for="e in 5" :key="e" class="border-b border-[#888]/20 hover:bg-[#888]/30">
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
  </main>
</template>
