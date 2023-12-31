import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('swiper-')
      }
    }
  }), vueJsx()],
  server: {
    port: 8080,
  },
  build: {
    sourcemap: true,
    minify: false
  }
})
