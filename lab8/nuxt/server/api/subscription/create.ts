export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email || !body.plan) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email та план підписки є обов\'язковими'
    })
  }

  if (!body.billingType || !['monthly', 'yearly'].includes(body.billingType)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Невірний тип підписки'
    })
  }

  if (typeof body.price !== 'number' || body.price <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Невірна ціна підписки'
    })
  }

  const subscriptionData = {
    id: Math.random().toString(36).substr(2, 9),
    email: body.email,
    firstName: body.firstName || '',
    lastName: body.lastName || '',
    plan: body.plan,
    billingType: body.billingType,
    price: body.price,
    cardLast4: body.cardLast4,
    createdAt: new Date().toISOString(),
    nextBillingDate: calculateNextBillingDate(body.billingType),
    status: 'active'
  }

  return {
    success: true,
    message: `Subscription activated successfully! Billing ${subscriptionData.billingType === 'monthly' ? 'monthly' : 'yearly'}.`,
    data: subscriptionData
  }
})

function calculateNextBillingDate(billingType: 'monthly' | 'yearly'): string {
  const date = new Date()
  if (billingType === 'monthly') {
    date.setMonth(date.getMonth() + 1)
  } else {
    date.setFullYear(date.getFullYear() + 1)
  }
  return date.toISOString()
}
