const { resolve } = require('path')
const { defineConfig } = require('vite')
const { importMaps } = require('vite-plugin-import-maps')

export default defineConfig({
    base: '/jkos-theme-ui/',
    plugins: [
        
    ],
    server: {
        open: '/index.html',
        port: 3116,
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                '01': resolve(__dirname, '01/index.html'),
                '02': resolve(__dirname, '02/index.html'),
                '03': resolve(__dirname, '03/index.html'),
            }
        }
    }
})