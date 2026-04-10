export default defineEventHandler(async (_event) => {
  const plans = [
    {
      id: 'basic',
      name: 'Базовий',
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      monthlyDuration: 'місяць',
      yearlyDuration: 'рік',
      features: ['Базові функції', 'Підтримка по email', 'До 5 проектів']
    },
    {
      id: 'standard',
      name: 'Стандартний',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      monthlyDuration: 'місяць',
      yearlyDuration: 'рік',
      features: ['Усі функції Базового', 'Пріоритетна підтримка', 'До 20 проектів', 'API доступ']
    },
    {
      id: 'premium',
      name: 'Преміум',
      monthlyPrice: 49.99,
      yearlyPrice: 499.99,
      monthlyDuration: 'місяць',
      yearlyDuration: 'рік',
      features: ['Усі функції Стандартного', '24/7 підтримка', 'Необмежено проектів', 'Свої інтеграції']
    },
    {
      id: 'team',
      name: 'Team - Щомісячна',
      monthlyPrice: 29.99,
      yearlyPrice: 0,
      monthlyDuration: 'місяць',
      yearlyDuration: '',
      features: ['Командна робота', 'Необмежено користувачів', 'Спільний доступ', 'Аналітика команди']
    },
    {
      id: 'enterprise',
      name: 'Enterprise - Щомісячна',
      monthlyPrice: 99.99,
      yearlyPrice: 0,
      monthlyDuration: 'місяць',
      yearlyDuration: '',
      features: ['Повна персоналізація', 'Спеціальна підтримка', 'SLA гарантія', 'Власна інфраструктура']
    }
  ]

  return {
    success: true,
    data: plans
  }
})
