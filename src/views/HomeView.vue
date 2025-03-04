<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { StockType } from '@/types/stock'
import Chart from 'chart.js/auto' // I'll let vite handle bundle sizes, I do not have much time to that here

import Modal from '../components/CxModal.vue'
import CxCard from '../components/CxCard.vue'
import CxTableRow from '../components/CxTableRow.vue'
/** icons */
import IconPlus from '../components/icons/IconPlus.vue'
import IconTrendingDown from '../components/icons/IconTrendingDown.vue'
import IconTrendingUp from '../components/icons/IconTrendingUp.vue'

import { useStocksStore } from '../stores/store.ts'

/** local states */
const showModal = ref(false)
const activeTab = ref(0)
const stocks = ref<{ [key: string]: StockType }>({})
const activeKey = ref<number | string>('')

const loading = ref(false)

/** component logic */
const tabs = ['stocks', 'watchlists']

const store = useStocksStore()

/** chartjs stuff */
const chartRef = ref(null)

// Sample data
// I will stick with this sample data because non of the endpoint can be trusted with this response because I quickly hit the limit. Plus, Alpha do not return any error in fact.
const chartData = {
  labels: ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01', '2023-06-01'],
  datasets: [
    {
      label: 'Closing Price',
      data: [150.25, 155.5, 160.75, 158.3, 170.45, 180.6],
      borderColor: '#2563eb',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#2563eb',
    },
  ],
}

const chartjsINIT = () => {
  const ctx = chartRef.value || document.getElementById('chart-canvas')

  if (ctx) {
    for (let i = 0; i < ctx.length; i++) {
      new Chart(ctx[i].getContext('2d'), {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false,
              },
              title: {
                display: false,
                text: 'Date',
              },
              ticks: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
              title: {
                display: false,
                text: 'Price ($)',
              },
              ticks: {
                display: false,
              },
              beginAtZero: false,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `Price: $${context.parsed.y.toFixed(2)}`
                },
              },
            },
            legend: {
              display: false,
            },
          },
        },
      })
    }
  }
}

onMounted(async () => {
  try {
    loading.value = true
    await store.fetchStocks()
    await store.fetchTrends()
    stocks.value = store.stocks
  } catch (error) {
    console.error('Error fetching stocks:', error)
  } finally {
    loading.value = false
    setTimeout(() => {
      chartjsINIT()
    }, 1000)
  }
})
</script>

<template>
  <main class="space-y-6">
    <div>
      <div class="ml-auto flex w-fit bg-gray-200 py-2 px-1 rounded-md text-[#555]">
        <button
          v-for="(i, index) in tabs"
          :key="i"
          class="border border-[#555]/20 px-6 text-base flex py-2 transition-all ease-linear"
          @click="activeTab = index"
          :class="{
            'font-medium bg-white text-[#222]': activeTab == index,
            'rounded-tl-md rounded-bl-md': i == 'stocks',
            'rounded-tr-md rounded-br-md': i == 'watchlists',
          }"
        >
          {{ i }}
        </button>
      </div>
    </div>
    <div v-if="tabs[activeTab] == 'stocks'" class="space-y-6">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Popular Stocks</h1>
      </div>
      <div class="relative max-w-full max-md:overflow-x-scroll">
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
            </tr>
          </thead>

          <tbody v-if="!loading">
            <template v-if="store.searchQuery">
              <CxTableRow
                :stocks="store.filterResults"
                @toggle-active-row="
                  ({ key }) => {
                    showModal = !showModal
                    activeKey = key
                  }
                "
                :active-index="activeKey"
              />
            </template>
            <template v-if="!store.searchQuery">
              <tr
                v-for="(stock, key) in stocks"
                :key="key"
                class="border-b border-[#888]/20 hover:bg-[#888]/30"
                @click="
                  () => {
                    showModal = !showModal
                    activeKey = key
                  }
                "
              >
                <th scope="row" class="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                  {{ stocks[key].symbol }}
                </th>
                <td class="px-6 py-4">{{ stocks[key].name }}</td>
                <td class="px-6 py-4">{{ stocks[key].price }}</td>
                <td class="px-6 py-4"><canvas id="chart-canvas" ref="chartRef"></canvas></td>
                <td class="px-6 py-4">
                  <span className="flex justify-center items-center h-full gap-1"
                    >{{ stocks[key].change }} <IconTrendingUp v-if="stocks[key].change > 0" />
                    <IconTrendingDown v-else
                  /></span>
                </td>
                <td
                  class="px-6 py-4 -z-10"
                  :class="{
                    'bg-red-200/50': stocks[key].changePercent < 0,
                    'bg-green-200/50': stocks[key].changePercent > 0,
                  }"
                >
                  {{ stocks[key].changePercent }}
                </td>
                <td class="px-6 py-4">
                  {{ Number(stocks[key].marketCap / 1000).toFixed(2) }}
                  <span class="text-[#222]">B</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div v-if="loading == true" class="text-black text-3xl">loading..</div>
      </div>
    </div>
    <div id="waitlist-section" class="gap-2 flex justify-center items-center" v-else>
      <div v-if="Object.keys(store.waitlists).length < 1">
        <div class="mt-4 p-6 border rounded-lg bg-[#ccc]/20 text-center">
          <p class="text-[#555]">
            Your watchlist is empty. <br />
            click a stock from the stocks tab, see the details and add to waitlist.
          </p>
        </div>
      </div>
      <CxCard v-for="(waitlist, key) in store.waitlists" :key="key">
        <div class="flex justify-between">
          <p class="text-xl font-semibold tracking-tight">{{ waitlist.symbol }}</p>
          <button
            class="bg-red-500 text-white rounded-md px-2 py-1"
            @click="store.deleteStockFromWatchlist(waitlist.symbol)"
          >
            delete
          </button>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <span class="text-3xl tracking-tighter font-semibold">${{ waitlist.price }}</span>
            <div
              :class="{
                'text-green-400': waitlist.change > 0,
                'text-red-400': waitlist.change < 0,
              }"
            >
              <span>{{ waitlist.change }} </span>
              <span>( {{ waitlist.changePercent }}% )</span>
            </div>
          </div>
        </div>
        <div class="flex gap-8 font-semibold">
          <div class="w-[7rem]">
            <p class="flex flex-col">
              <span class="text-[#999] font-normal tracking-tight">CAP</span>
              <span class="text-[#222]">${{ Number(waitlist.marketCap / 1000).toFixed(2) }} B</span>
            </p>
          </div>
          <div class="w-[8rem]">
            <p class="flex flex-col">
              <span class="text-[#999] font-normal tracking-tight">Co full name</span>
              <span class="text-[#222]">{{ waitlist.name }}</span>
            </p>
          </div>
        </div>
      </CxCard>
    </div>
  </main>
  <teleport to="#modal-point">
    <Modal :showing="showModal" @toggle-modal="showModal = false">
      <div class="w-full space-y-5">
        <div class="space-y-2">
          <div class="flex flex-col">
            <span class="text-3xl font-bold tracking-tight">{{ stocks[activeKey].symbol }}</span>
            <span class="text-[#222]">{{ stocks[activeKey].name }}.</span>
          </div>
          <div
            v-if="store.waitlists[activeKey]?.symbol"
            class="border border-[#777]/60 rounded-md px-3 font-normal text-base text-[#ccc] flex py-2 w-fit"
          >
            <IconPlus /> Added to waitlist
          </div>
          <button
            v-if="!store.waitlists[activeKey]?.symbol"
            class="border border-[#555]/60 rounded-md px-3 font-normal text-base text-[#555] flex py-2"
            @click="store.addStockToWatchlist(stocks[activeKey].symbol)"
          >
            <IconPlus class="text-[#555] stroke-1" /> Add to Watchlist
          </button>
        </div>
        <div class="flex gap-4 text-[#222] font-semibold">
          <CxCard>
            <p class="text-xl font-semibold tracking-tight">Pricing Information</p>
            <div class="flex justify-between items-center">
              <div>
                <span class="text-5xl tracking-tighter font-semibold"
                  >${{ stocks[activeKey].price }}</span
                >
                <div
                  :class="{
                    'text-red-400': stocks[activeKey].change < 0,
                    'text-green-400': stocks[activeKey].change > 0,
                  }"
                >
                  <span>{{ stocks[activeKey].change }} </span>
                  <span>( {{ stocks[activeKey].changePercent }} )</span>
                </div>
              </div>
              <div class="flex flex-col">
                <span class="text-[#999] font-normal tracking-tight">Market Cap</span>
                <span
                  >${{ Number(stocks[activeKey].marketCap / 1000).toFixed(2) }}
                  <span class="text-[#222]">B</span></span
                >
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
      </div>
    </Modal>
  </teleport>
</template>

<style scoped>
#chart-canvas {
  height: 100px;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  padding: 5px;
  border-radius: 8px;
}
</style>
