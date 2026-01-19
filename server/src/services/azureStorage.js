import { BlobServiceClient } from '@azure/storage-blob'
import path from 'path'

function getBlobServiceClient() {
  const conn = process.env.AZURE_STORAGE_CONNECTION_STRING
  const account = process.env.AZURE_STORAGE_ACCOUNT
  const key = process.env.AZURE_STORAGE_KEY

  if (conn) return BlobServiceClient.fromConnectionString(conn)

  if (account && key) {
    const url = `https://${account}.blob.core.windows.net`
    const SharedKeyCredential = (await import('@azure/storage-blob')).StorageSharedKeyCredential
    const cred = new SharedKeyCredential(account, key)
    return new BlobServiceClient(url, cred)
  }

  throw new Error('Azure Storage credentials missing: set AZURE_STORAGE_CONNECTION_STRING or AZURE_STORAGE_ACCOUNT/AZURE_STORAGE_KEY')
}

export async function uploadBufferToAzure(containerName, buffer, originalName, contentType) {
  const blobServiceClient = getBlobServiceClient()
  const containerClient = blobServiceClient.getContainerClient(containerName)
  await containerClient.createIfNotExists({ access: 'blob' })

  const ext = path.extname(originalName) || '.bin'
  const fileBase = path.basename(originalName, ext)
  const unique = `${fileBase}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
  const blockBlobClient = containerClient.getBlockBlobClient(unique)

  const options = contentType ? { blobHTTPHeaders: { blobContentType: contentType } } : {}
  await blockBlobClient.uploadData(buffer, options)

  // Public URL (container access set to Blob)
  return {
    url: blockBlobClient.url,
    filename: unique
  }
}
