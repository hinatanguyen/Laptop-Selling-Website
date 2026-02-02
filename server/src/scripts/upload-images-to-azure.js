import { BlobServiceClient } from '@azure/storage-blob'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '../../.env') })

/**
 * Script to upload all local images to Azure Blob Storage
 * Run this after setting up Azure Storage Account
 */

async function uploadImagesToAzure() {
  try {
    // Check for Azure credentials
    const accountName = process.env.AZURE_STORAGE_ACCOUNT
    const accountKey = process.env.AZURE_STORAGE_KEY
    const containerName = process.env.AZURE_STORAGE_CONTAINER || 'product-images'

    if (!accountName || !accountKey) {
      throw new Error('Missing Azure Storage credentials. Set AZURE_STORAGE_ACCOUNT and AZURE_STORAGE_KEY in .env')
    }

    console.log('📦 Connecting to Azure Blob Storage...')
    console.log(`Account: ${accountName}`)
    console.log(`Container: ${containerName}`)

    // Create blob service client using connection string
    const connectionString = `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accountKey};EndpointSuffix=core.windows.net`
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString)

    const containerClient = blobServiceClient.getContainerClient(containerName)

    // Create container if it doesn't exist
    console.log('\n📁 Creating container (if not exists)...')
    await containerClient.createIfNotExists({
      access: 'blob' // Public access for images
    })

    // Read local uploads directory
    const uploadsDir = path.join(__dirname, '../../public/uploads')
    console.log(`\n📂 Reading local uploads from: ${uploadsDir}`)

    let files
    try {
      files = await fs.readdir(uploadsDir)
    } catch (error) {
      console.error(`❌ Cannot read uploads directory: ${error.message}`)
      console.log('Make sure the directory exists and contains images')
      process.exit(1)
    }

    // Filter image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)
    })

    if (imageFiles.length === 0) {
      console.log('⚠️  No image files found in uploads directory')
      process.exit(0)
    }

    console.log(`\n📸 Found ${imageFiles.length} images to upload\n`)

    // Upload each image
    const results = []
    for (const [index, filename] of imageFiles.entries()) {
      try {
        const filePath = path.join(uploadsDir, filename)
        const fileBuffer = await fs.readFile(filePath)
        
        // Get content type based on extension
        const ext = path.extname(filename).toLowerCase()
        const contentTypeMap = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.gif': 'image/gif',
          '.webp': 'image/webp'
        }
        const contentType = contentTypeMap[ext] || 'application/octet-stream'

        // Upload to Azure
        const blockBlobClient = containerClient.getBlockBlobClient(filename)
        await blockBlobClient.uploadData(fileBuffer, {
          blobHTTPHeaders: { blobContentType: contentType }
        })

        const url = blockBlobClient.url
        console.log(`✅ [${index + 1}/${imageFiles.length}] ${filename}`)
        console.log(`   ${url}`)

        results.push({
          filename,
          url,
          success: true
        })
      } catch (error) {
        console.log(`❌ [${index + 1}/${imageFiles.length}] ${filename} - ${error.message}`)
        results.push({
          filename,
          error: error.message,
          success: false
        })
      }
    }

    // Summary
    const successful = results.filter(r => r.success).length
    const failed = results.filter(r => !r.success).length

    console.log('\n' + '='.repeat(60))
    console.log('📊 UPLOAD SUMMARY')
    console.log('='.repeat(60))
    console.log(`✅ Successful: ${successful}`)
    console.log(`❌ Failed: ${failed}`)
    console.log(`📦 Total: ${results.length}`)
    console.log('='.repeat(60))

    if (successful > 0) {
      console.log('\n🔄 NEXT STEPS:')
      console.log('1. Update your database product image URLs from:')
      console.log('   /uploads/filename.jpg')
      console.log('   TO:')
      console.log(`   https://${accountName}.blob.core.windows.net/${containerName}/filename.jpg`)
      console.log('\n2. Run this SQL query on your Azure PostgreSQL database:')
      console.log(`
UPDATE products 
SET image_url = REPLACE(
  image_url, 
  '/uploads/', 
  'https://${accountName}.blob.core.windows.net/${containerName}/'
)
WHERE image_url LIKE '/uploads/%';
      `)
      console.log('\n3. Configure your Azure App Service with these environment variables:')
      console.log(`   UPLOAD_PROVIDER=azure`)
      console.log(`   AZURE_STORAGE_ACCOUNT=${accountName}`)
      console.log(`   AZURE_STORAGE_KEY=<your-key>`)
      console.log(`   AZURE_STORAGE_CONTAINER=${containerName}`)
    }

    process.exit(failed > 0 ? 1 : 0)

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

// Run the script
uploadImagesToAzure()
