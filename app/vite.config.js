export default {
    root: 'client',
    publicDir: 'dist',
    server: {
        proxy: {
            '/api': 'http://localhost:3000',
            '/socket.io': {
                target: 'ws://localhost:3000',
                ws: true,
            },
        }
    }
}