<template>
  <div class="bg-gray-50 min-h-screen p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-800">
          Тарифні плани
        </h1>
        <NuxtLink to="/table" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
          Переглянути таблицю продуктів
        </NuxtLink>
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
            >
              {{ feature }}
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
