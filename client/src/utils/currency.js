// Utility for formatting amounts directly in VND (no USD conversion)

export function formatVND(amount = 0) {
  const value = Math.round(Number(amount) || 0);
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

