import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';


export default defineConfig({
  plugins: [
    vue({
      script: {
        refSugar: true
      }
    }),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons()
      ],
    }),

    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),

    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },

  server: {
    open: true,
    port: 3000
  }
})
