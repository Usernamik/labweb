<script setup lang="ts">
import { computed, ref, watch } from 'vue'

type Product = {
  id: number
  title: string
  description: string
  price: number
  rating: number
  brand: string
  category: string
  thumbnail: string
}

useHead({
  title: 'Список продуктів - Таблиця'
})

defineOptions({
  name: 'ProductsTablePage'
})

const { data, pending } = useFetch<{ products: Product[] }>(
  'https://dummyjson.com/products?limit=100'
)

const products = computed(() => data.value?.products ?? [])

const searchQuery = ref('')
const page = ref(1)
const pageSize = ref(10)

const sortBy = ref<keyof Product>('title')
const sortDirection = ref<'asc' | 'desc'>('asc')

const showDisplayMenu = ref(false)
const showSortMenu = ref(false)
const showActionsMenu = ref(false)

const visibleColumns = ref({
  title: true,
  description: true,
  price: true,
  rating: true,
  brand: true,
  category: true,
  thumbnail: true
})

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return products.value

  return products.value.filter((product) => {
    return [
      product.title,
      product.description,
      product.price.toString(),
      product.rating.toString(),
      product.brand,
      product.category
    ].some(value => value.toLowerCase().includes(query))
  })
})

const sortedProducts = computed(() => {
  const rows = [...filteredProducts.value]
  const direction = sortDirection.value === 'asc' ? 1 : -1
  const key = sortBy.value

  rows.sort((a, b) => {
    const left = a[key]
    const right = b[key]

    if (typeof left === 'number' && typeof right === 'number') {
      return (left - right) * direction
    }

    return String(left).localeCompare(String(right), 'uk', { sensitivity: 'base' }) * direction
  })

  return rows
})

const total = computed(() => sortedProducts.value.length)

const pageCount = computed(() => {
  const pages = Math.ceil(total.value / pageSize.value)
  return pages > 0 ? pages : 1
})

watch([searchQuery, pageSize], () => {
  page.value = 1
})

const paginatedProducts = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return sortedProducts.value.slice(start, start + pageSize.value)
})

function toggleSort(column: keyof Product) {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortDirection.value = 'asc'
  }

  page.value = 1
}

function goPrev() {
  page.value = Math.max(1, page.value - 1)
}

function goNext() {
  page.value = Math.min(pageCount.value, page.value + 1)
}

const pageNumbers = computed(() => {
  return Array.from({ length: pageCount.value }, (_, i) => i + 1)
})
</script>

<template>
  <div class="bg-white p-6 font-sans text-sm min-h-screen">
    <div class="max-w-[1280px] mx-auto">
      <div class="flex items-center justify-between py-2 mb-4">
        <h1 class="text-2xl font-bold text-gray-800">
          Список продуктів
        </h1>
        <div class="flex gap-3">
          <NuxtLink to="/subscription" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
            Оформити підписку
          </NuxtLink>
          <NuxtLink to="/" class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
            Назад до планів
          </NuxtLink>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between py-2 px-1 mb-1">
          <div></div>

          <div class="flex items-center gap-3 text-gray-500 text-xs">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Пошук по всій таблиці..."
              class="border border-gray-200 rounded-md px-3 py-2 w-72 outline-none focus:ring-0"
            >

            <div class="flex items-center gap-5 relative">
              <div class="relative">
                <button
                  type="button"
                  class="flex items-center gap-1 hover:text-gray-800 bg-blue-600 text-white px-3 py-2 rounded-md transition-colors"
                  @click="showDisplayMenu = !showDisplayMenu"
                >
                  Display
                  <span class="text-xs">▼</span>
                </button>
                <div v-if="showDisplayMenu" class="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-10">
                  <label v-for="column in Object.keys(visibleColumns)" :key="column" class="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      :checked="visibleColumns[column as keyof typeof visibleColumns]"
                      @change="visibleColumns[column as keyof typeof visibleColumns] = !visibleColumns[column as keyof typeof visibleColumns]"
                      class="w-4 h-4"
                    >
                    <span class="text-sm text-gray-700">{{ column }}</span>
                  </label>
                </div>
              </div>

              <div class="relative">
                <button
                  type="button"
                  class="flex items-center gap-1 hover:text-gray-800 bg-blue-600 text-white px-3 py-2 rounded-md transition-colors"
                  @click="showSortMenu = !showSortMenu"
                >
                  Sort by
                  <span class="text-xs">▼</span>
                </button>
                <div v-if="showSortMenu" class="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-10 min-w-max">
                  <button
                    v-for="column in ['title', 'price', 'rating', 'brand', 'category']"
                    :key="column"
                    type="button"
                    class="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100 rounded"
                    @click="sortBy = column as keyof Product; showSortMenu = false"
                  >
                    {{ column }}
                  </button>
                </div>
              </div>

              <div class="relative">
                <button
                  type="button"
                  class="flex items-center gap-1 hover:text-gray-800 bg-blue-600 text-white px-3 py-2 rounded-md transition-colors"
                  @click="showActionsMenu = !showActionsMenu"
                >
                  Actions
                  <span class="text-xs">▼</span>
                </button>
                <div v-if="showActionsMenu" class="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-10">
                  <button type="button" class="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100 rounded">
                    Export to CSV
                  </button>
                  <button type="button" class="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100 rounded">
                    Print
                  </button>
                </div>
              </div>
            </div>

            <div class="ml-2 flex items-center gap-2">
              <span>Items</span>
              <select
                v-model.number="pageSize"
                class="border border-gray-200 rounded-md px-2 py-2"
              >
                <option :value="5">
                  5
                </option>
                <option :value="10">
                  10
                </option>
                <option :value="20">
                  20
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="w-full overflow-x-auto border border-gray-200 rounded-sm">
          <table class="w-full text-sm text-left text-gray-800 border-collapse">
            <thead>
              <tr class="border-b border-gray-200 text-gray-500 text-xs bg-white">
                <th v-if="visibleColumns.title" class="px-3 py-2 font-medium cursor-pointer select-none hover:bg-gray-100 transition-colors" @click="toggleSort('title')">
                  Назва
                  <span v-if="sortBy === 'title'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
                  <span v-else class="ml-1 text-gray-300">↕</span>
                </th>
                <th v-if="visibleColumns.description" class="px-3 py-2 font-medium cursor-pointer select-none hover:bg-gray-100 transition-colors" @click="toggleSort('description')">
                  Опис
                  <span v-if="sortBy === 'description'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
                  <span v-else class="ml-1 text-gray-300">↕</span>
                </th>
                <th v-if="visibleColumns.price" class="px-3 py-2 font-medium cursor-pointer select-none hover:bg-gray-100 transition-colors" @click="toggleSort('price')">
                  Ціна
                  <span v-if="sortBy === 'price'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
                  <span v-else class="ml-1 text-gray-300">↕</span>
                </th>
                <th v-if="visibleColumns.rating" class="px-3 py-2 font-medium cursor-pointer select-none hover:bg-gray-100 transition-colors" @click="toggleSort('rating')">
                  Оцінка
                  <span v-if="sortBy === 'rating'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
                  <span v-else class="ml-1 text-gray-300">↕</span>
                </th>
                <th v-if="visibleColumns.brand" class="px-3 py-2 font-medium cursor-pointer select-none hover:bg-gray-100 transition-colors" @click="toggleSort('brand')">
                  Бренд
                  <span v-if="sortBy === 'brand'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
                  <span v-else class="ml-1 text-gray-300">↕</span>
                </th>
                <th v-if="visibleColumns.category" class="px-3 py-2 font-medium cursor-pointer select-none hover:bg-gray-100 transition-colors" @click="toggleSort('category')">
                  Категорія
                  <span v-if="sortBy === 'category'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
                  <span v-else class="ml-1 text-gray-300">↕</span>
                </th>
                <th v-if="visibleColumns.thumbnail" class="px-3 py-2 font-medium">
                  Фото
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-if="pending"
                class="hover:bg-gray-200 transition-colors"
              >
                <td colspan="8" class="px-3 py-6 text-center text-gray-500">
                  Завантаження...
                </td>
              </tr>

              <tr
                v-for="product in paginatedProducts"
                :key="product.id"
                class="border-b border-gray-100 hover:bg-gray-200 transition-colors"
              >
                <td v-if="visibleColumns.title" class="px-3 py-3">
                  <div class="font-bold text-gray-900 text-xs underline underline-offset-2 cursor-pointer">
                    {{ product.title }}
                  </div>
                </td>
                <td v-if="visibleColumns.description" class="px-3 py-3">
                  <div class="text-gray-700 text-xs max-w-[260px] truncate">
                    {{ product.description }}
                  </div>
                </td>
                <td v-if="visibleColumns.price" class="px-3 py-3">
                  ${{ Number(product.price).toFixed(2) }}
                </td>
                <td v-if="visibleColumns.rating" class="px-3 py-3">
                  <span
                    :class="Number(product.rating) < 4.5 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'"
                  >
                    {{ Number(product.rating).toFixed(1) }}
                  </span>
                </td>
                <td v-if="visibleColumns.brand" class="px-3 py-3">
                  {{ product.brand }}
                </td>
                <td v-if="visibleColumns.category" class="px-3 py-3">
                  {{ product.category }}
                </td>
                <td v-if="visibleColumns.thumbnail" class="px-3 py-3">
                  <img
                    :src="product.thumbnail"
                    :alt="product.title"
                    class="w-[100px] h-[100px] object-cover rounded-md border border-gray-200"
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex items-center justify-between mt-4">
          <p class="text-xs text-gray-500">
            Показано {{ paginatedProducts.length }} з {{ total }} рядків
          </p>

          <div class="flex items-center gap-2">
            <button
              type="button"
              class="px-3 py-2 border border-gray-200 rounded-md disabled:opacity-50"
              :disabled="page === 1"
              @click="goPrev"
            >
              Prev
            </button>
            <button
              v-for="p in pageNumbers"
              :key="p"
              type="button"
              class="px-3 py-2 border border-gray-200 rounded-md"
              :class="p === page ? 'bg-gray-100' : ''"
              @click="page = p"
            >
              {{ p }}
            </button>
            <button
              type="button"
              class="px-3 py-2 border border-gray-200 rounded-md disabled:opacity-50"
              :disabled="page === pageCount"
              @click="goNext"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
