<script setup lang="ts">
import { PropType } from 'vue'
import type { StockType } from '@/types/stock'
/** icons */
import IconTrendingDown from '../components/icons/IconTrendingDown.vue'
import IconTrendingUp from '../components/icons/IconTrendingUp.vue'

defineProps({
  stocks: {
    type: Object as PropType<{ [key: string]: StockType }>,
  },
  activeIndex: {
    type: String,
  },
})

// for humans: pardon all these messy emits. The fact that vue's props can't take a callback is horrible
const emits = defineEmits(['toggleActiveRow'])
const emitActiveRow = (key: string | number) => emits('toggleActiveRow', { key })
</script>
<template>
  <tr
    v-for="(stock, key) in stocks"
    :key="key"
    class="border-b border-[#888]/20 hover:bg-[#888]/30"
    @click="emitActiveRow(key)"
  >
    <th scope="row" class="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
      {{ stock.symbol }}
    </th>
    <td class="px-6 py-4">{{ stock.name }}</td>
    <td class="px-6 py-4">{{ stock.price }}</td>
    <td class="px-6 py-4">N/A</td>
    <td class="px-6 py-4 flex gap-1">
      {{ stock.change }} <IconTrendingUp v-if="stock.change > 0" />
      <IconTrendingDown v-else />
    </td>
    <td
      class="px-6 py-4 -z-10"
      :class="{
        'bg-red-200/50': stock.changePercent < 0,
        'bg-green-200/50': stock.changePercent > 0,
      }"
    >
      {{ stock.changePercent }}
    </td>
    <td class="px-6 py-4">
      {{ Number(stock.marketCap / 1000).toFixed(2) }}
      <span class="text-[#222]">B</span>
    </td>
  </tr>
</template>

<style scoped>
.sekx_tr td {
  padding: 10px 20px;
  font-weight: bold;
}
</style>
