import dotenv from 'dotenv'
import { query } from '../config/database.js'

dotenv.config()

async function run() {
  console.log('🔧 Applying database indexes and extensions...')
  try {
    // Enable useful extensions (safe if already installed)
    await query(`CREATE EXTENSION IF NOT EXISTS pg_trgm;`)

    // Products indexes
    await query(`
      CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
      CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
      CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
      -- Accelerate ILIKE searches using trigram
      CREATE INDEX IF NOT EXISTS idx_products_name_trgm ON products USING gin (name gin_trgm_ops);
      CREATE INDEX IF NOT EXISTS idx_products_desc_trgm ON products USING gin (description gin_trgm_ops);
      CREATE INDEX IF NOT EXISTS idx_products_brand_trgm ON products USING gin (brand gin_trgm_ops);
      -- Support slug/name lookups
      CREATE INDEX IF NOT EXISTS idx_products_lower_name ON products((lower(name)));
        -- Canonical slug identical to client slugify
        CREATE INDEX IF NOT EXISTS idx_products_slug_canonical ON products (
          (
            regexp_replace(
              regexp_replace(
                regexp_replace(lower(btrim(name)), '[^a-z0-9\s-]', '', 'g'),
                '\\s+', '-', 'g'
              ),
              '-+', '-', 'g'
            )
          )
        );
    `)

    // Orders & order_items indexes
    await query(`
      CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
      CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
      -- Digits-only expression index (btree)
      CREATE INDEX IF NOT EXISTS idx_orders_customer_phone_digits ON orders ((regexp_replace(customer_phone, '[^0-9]', '', 'g')));
      -- Trigram index for contains match on digits-only
      CREATE INDEX IF NOT EXISTS idx_orders_customer_phone_trgm ON orders USING gin ((regexp_replace(customer_phone, '[^0-9]', '', 'g')) gin_trgm_ops);
      CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
      CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);
    `)

    // Users indexes
    await query(`
      CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
      CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
      CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
      CREATE INDEX IF NOT EXISTS idx_users_phone_digits ON users ((regexp_replace(phone, '[^0-9]', '', 'g')));
      CREATE INDEX IF NOT EXISTS idx_users_phone_trgm ON users USING gin ((regexp_replace(phone, '[^0-9]', '', 'g')) gin_trgm_ops);
    `)

    console.log('✅ Index migration complete')
  } catch (err) {
    console.error('❌ Failed to apply indexes:', err)
    process.exitCode = 1
  }
}

run()
