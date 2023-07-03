
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { createRequire } from 'module'
import dotenv from 'dotenv'

const require = createRequire(import.meta.url)
dotenv.config({ path: require.resolve('./.env') })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
