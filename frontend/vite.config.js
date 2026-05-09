import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { getProxyOptions } from 'frappe-ui/src/utils/vite-dev-server'
import { webserver_port } from '../../../sites/common_site_config.json'

export default defineConfig(({ mode }) => {
  return {
    base:
      mode === 'development'
        ? '/'
        : '/assets/jobpro/frontend/',

  plugins: [
    vue(),
  ],
  server: {
    port: 8080,
    proxy: {
			'^/(api|app|assets|files)': {
				target: "https://jobpro.teamprohr.com",
				changeOrigin: true,
				secure: false
			},
		},
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: `../jobpro/public/frontend`,
    emptyOutDir: true,
    target: 'es2015',
  },
  optimizeDeps: {
    include: ['frappe-ui > feather-icons', 'showdown', 'engine.io-client'],
  },
}
})
