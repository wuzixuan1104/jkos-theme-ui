const { resolve } = require('path')
export default {
    base: '/jkos-theme-ui/',
    plugins: [],
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
            }
        }
    }
}