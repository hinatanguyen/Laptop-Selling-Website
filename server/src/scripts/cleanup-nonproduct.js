import dotenv from 'dotenv'
import { query } from '../config/database.js'

dotenv.config()

async function tableExists(tableName) {
  const res = await query(
    `SELECT EXISTS (
       SELECT 1 FROM information_schema.tables 
       WHERE table_schema='public' AND table_name=$1
     ) AS exists`,
    [tableName]
  )
  return Boolean(res.rows[0]?.exists)
}

async function cleanup() {
  try {
    console.log('🧹 Cleaning non-product data (orders, order_items, contact_messages)...')

    const hasOrderItems = await tableExists('order_items')
    const hasOrders = await tableExists('orders')

    // Truncate related tables together to satisfy FK constraints
    if (hasOrderItems && hasOrders) {
      await query('TRUNCATE TABLE order_items, orders RESTART IDENTITY CASCADE')
      console.log('✅ Cleared order_items and orders')
    } else if (hasOrderItems) {
      await query('TRUNCATE TABLE order_items RESTART IDENTITY')
      console.log('✅ Cleared order_items')
    } else if (hasOrders) {
      await query('TRUNCATE TABLE orders RESTART IDENTITY CASCADE')
      console.log('✅ Cleared orders')
    }

    if (await tableExists('contact_messages')) {
      await query('TRUNCATE TABLE contact_messages RESTART IDENTITY')
      console.log('✅ Cleared contact_messages')
    }

    // Intentionally do NOT touch users to preserve admin/test accounts
    console.log('🎉 Cleanup complete. Products left intact.')
    process.exit(0)
  } catch (err) {
    console.error('❌ Cleanup failed:', err)
    process.exit(1)
  }
}

cleanup()
