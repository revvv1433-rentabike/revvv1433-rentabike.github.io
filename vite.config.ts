import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  base: "https://revvv1433-rentabike.github.io/",

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
