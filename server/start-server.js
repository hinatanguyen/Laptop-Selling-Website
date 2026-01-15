#!/usr/bin/env node
import { exec } from 'child_process';
import { promisify } from 'util';
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

const execAsync = promisify(exec);

async function killPortProcesses(port) {
  try {
    console.log(`🔍 Checking for processes on port ${port}...`);
    const { stdout } = await execAsync(`lsof -ti:${port}`);
    
    if (stdout.trim()) {
      console.log(`⚠️  Found processes using port ${port}. Killing them...`);
      await execAsync(`lsof -ti:${port} | xargs kill -9`);
      console.log(`✅ Killed all processes on port ${port}`);
      
      // Wait a moment for processes to fully terminate
      await new Promise(resolve => setTimeout(resolve, 1000));
    } else {
      console.log(`✅ Port ${port} is free`);
    }
  } catch (error) {
    // If lsof returns no results, it means port is free
    console.log(`✅ Port ${port} is free`);
  }
}

async function startServer() {
  const port = process.env.PORT || 5000;
  
  console.log('🚀 Starting server...');
  console.log('🔍 Environment variables:');
  console.log('DB_NAME:', process.env.DB_NAME);
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_PORT:', process.env.DB_PORT);
  
  await killPortProcesses(port);
  
  // Import and start the actual server
  await import('./src/server.js');
}

startServer().catch(console.error);