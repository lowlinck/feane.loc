import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import sass from 'vite-plugin-sass';
import path from 'path';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/scss/app.scss', 'resources/js/app.js', 'resources/js/components/ExampleComponent.vue'],
      refresh: true,
    }),
    vue(),
    sass(),
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@popperjs/core': path.resolve(__dirname, 'node_modules/@popperjs/core/dist/umd/popper.min.js') // Update the path as needed
    }
  },
  define: {
    Popper: ['@popperjs/core', 'default'] // Make Popper.js available as a global variable
  }
});
