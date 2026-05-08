import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
	base: process.env.NODE_ENV === "development"
	? "/"
	: "/assets/jobpro/frontend/",
	server: {
		port: 8000, // Change this to your desired port
		proxy: {
			"/api": {
				target: "http://localhost:8002",
				changeOrigin: true,
				secure: false
			},
		},
	allowedHosts: ["jobpro.teamprohr.com"]
	},
	plugins: [
		vue(),
		vueDevTools(),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		},
	},
	build: {
		outDir: "../jobpro/public/frontend",  // 🔥 direct output
		emptyOutDir: true,
	}
})
