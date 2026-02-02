import pg from 'pg'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '../../.env') })

const { Client } = pg

/**
 * Update database product image URLs from local to Azure Blob Storage
 */
async function updateImageUrls() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  })

  try {
    console.log('🔗 Connecting to database...')
    await client.connect()
    console.log('✅ Connected!\n')

    // Get Azure Storage config
    const accountName = process.env.AZURE_STORAGE_ACCOUNT || 'laptopstorestorage'
    const containerName = process.env.AZURE_STORAGE_CONTAINER || 'product-images'
    const azureBaseUrl = `https://${accountName}.blob.core.windows.net/${containerName}/`

    console.log('⚙️  Configuration:')
    console.log(`   Storage Account: ${accountName}`)
    console.log(`   Container: ${containerName}`)
    console.log(`   Base URL: ${azureBaseUrl}\n`)

    // Step 1: Check current state
    console.log('📊 Checking current image URLs...')
    const checkQuery = `
      SELECT 
        COUNT(*) as total_products,
        COUNT(CASE WHEN image_url LIKE '/uploads/%' THEN 1 END) as local_urls,
        COUNT(CASE WHEN image_url LIKE '%blob.core.windows.net%' THEN 1 END) as azure_urls
      FROM products;
    `
    const checkResult = await client.query(checkQuery)
    const stats = checkResult.rows[0]
    
    console.log(`   Total products: ${stats.total_products}`)
    console.log(`   Using local URLs (/uploads/): ${stats.local_urls}`)
    console.log(`   Using Azure URLs: ${stats.azure_urls}\n`)

    if (parseInt(stats.local_urls) === 0) {
      console.log('✅ No local URLs found - nothing to update!')
      await client.end()
      return
    }

    // Step 2: Show sample of what will be updated
    console.log('📋 Sample of products to be updated:')
    const sampleQuery = `
      SELECT id, name, image_url
      FROM products
      WHERE image_url LIKE '/uploads/%'
      LIMIT 5;
    `
    const sampleResult = await client.query(sampleQuery)
    sampleResult.rows.forEach(row => {
      const oldUrl = row.image_url
      const newUrl = oldUrl.replace('/uploads/', azureBaseUrl)
      console.log(`   [${row.id}] ${row.name}`)
      console.log(`       OLD: ${oldUrl}`)
      console.log(`       NEW: ${newUrl}`)
    })

    console.log('\n⚠️  This will update the database. Press Ctrl+C to cancel...')
    console.log('⏳ Starting update in 3 seconds...\n')
    
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Step 3: Update image_url column
    console.log('🔄 Updating image_url column...')
    const updateQuery = `
      UPDATE products 
      SET image_url = REPLACE(image_url, '/uploads/', $1)
      WHERE image_url LIKE '/uploads/%'
      RETURNING id;
    `
    const updateResult = await client.query(updateQuery, [azureBaseUrl])
    console.log(`✅ Updated ${updateResult.rowCount} products\n`)

    // Step 4: Update additional_images if column exists
    console.log('🔄 Checking for additional_images column...')
    const columnsQuery = `
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'products' AND column_name = 'additional_images';
    `
    const columnsResult = await client.query(columnsQuery)
    
    if (columnsResult.rows.length > 0) {
      console.log('   Found additional_images column, updating...')
      
      // Get products with additional_images
      const additionalQuery = `
        SELECT id, additional_images
        FROM products
        WHERE additional_images IS NOT NULL 
          AND additional_images::text LIKE '%/uploads/%';
      `
      const additionalResult = await client.query(additionalQuery)
      
      let updatedCount = 0
      for (const row of additionalResult.rows) {
        try {
          let images = row.additional_images
          if (typeof images === 'string') {
            images = JSON.parse(images)
          }
          
          if (Array.isArray(images)) {
            const updatedImages = images.map(url => 
              url.replace('/uploads/', azureBaseUrl)
            )
            
            await client.query(
              'UPDATE products SET additional_images = $1 WHERE id = $2',
              [JSON.stringify(updatedImages), row.id]
            )
            updatedCount++
          }
        } catch (err) {
          console.log(`   ⚠️  Skipped product ${row.id}: ${err.message}`)
        }
      }
      console.log(`✅ Updated additional_images for ${updatedCount} products\n`)
    } else {
      console.log('   No additional_images column found, skipping...\n')
    }

    // Step 5: Verify the update
    console.log('✅ Verifying update...')
    const verifyResult = await client.query(checkQuery)
    const newStats = verifyResult.rows[0]
    
    console.log(`   Total products: ${newStats.total_products}`)
    console.log(`   Using local URLs: ${newStats.local_urls}`)
    console.log(`   Using Azure URLs: ${newStats.azure_urls}\n`)

    // Show sample of updated products
    console.log('📋 Sample of updated products:')
    const verifyQuery = `
      SELECT id, name, image_url
      FROM products
      WHERE image_url LIKE '%blob.core.windows.net%'
      LIMIT 5;
    `
    const verifyRowsResult = await client.query(verifyQuery)
    verifyRowsResult.rows.forEach(row => {
      console.log(`   [${row.id}] ${row.name}`)
      console.log(`       ${row.image_url}`)
    })

    console.log('\n' + '='.repeat(60))
    console.log('✅ UPDATE COMPLETE!')
    console.log('='.repeat(60))
    console.log(`Updated ${updateResult.rowCount} product image URLs`)
    console.log('All image URLs now point to Azure Blob Storage')
    console.log('='.repeat(60))

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    console.error(error.stack)
    process.exit(1)
  } finally {
    await client.end()
    console.log('\n🔌 Database connection closed')
  }
}

// Run the script
updateImageUrls()
