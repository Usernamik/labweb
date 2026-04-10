<template>
  <div class="bg-gray-50 min-h-screen p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-800">
          Тарифні плани
        </h1>
        <div class="flex gap-3">
          <NuxtLink to="/subscription" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Оформити підписку
          </NuxtLink>
          <NuxtLink to="/table" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Таблиця продуктів
          </NuxtLink>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="product in products"
          :key="product.name"
          class="card max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-200 transition-all duration-300"
        >
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">
            {{ product.name }}
          </h2>
          <p class="text-gray-500 text-sm mb-4">
            7-days free then:
          </p>
          <div class="mb-1">
            <span class="text-5xl font-bold text-gray-900">${{ product.price }}</span>
            <span class="text-gray-500 text-lg">/month</span>
          </div>
          <p class="text-gray-400 text-sm mb-6">
            {{ product.billing }}
          </p>
          <hr class="border-t border-gray-200 my-6">

          <ul class="space-y-4 text-gray-700 text-sm mb-8">
            <li
              v-for="feature in product.features"
              :key="feature"
              class="flex items-start gap-3"
            >
              <svg class="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Тарифні плани'
})

defineOptions({
  name: 'ProductsPage'
})

const products = [
  {
    name: 'Starter',
    price: '83.25',
    billing: 'Billed yearly at $999.00',
    features: [
      'Primary user + 0 free team members (extra team members for $35/month)',
      'Save unlimited properties',
      '10,000 exports (additional exports at $0.02 each)',
      '500 free skip traces (additional skip tracing at $0.08 each)',
      'Imports $0.01'
    ]
  },
  {
    name: 'Team',
    price: '207.50',
    billing: 'Billed yearly at $2,490.00',
    features: [
      'Primary user + 2 free team members (extra team members for $25/month)',
      'Save unlimited properties',
      '50,000 exports (additional exports at $0.01 each)',
      '1,000 free skip traces (additional skip tracing at $0.08 each)',
      'Imports $0.01'
    ]
  },
  {
    name: 'Business',
    price: '457.50',
    billing: 'Billed yearly at $5,490.00',
    features: [
      'Primary user + 6 free team members (extra team members for $20/month)',
      'Save unlimited properties',
      '100,000 exports (additional exports at $0.01 each)',
      '2,000 free skip traces (additional skip tracing at $0.08 each)',
      'Imports $0.01'
    ]
  }
]
</script>

<style scoped>
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>
