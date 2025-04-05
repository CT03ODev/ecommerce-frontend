import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        mkcert(), // Add the mkcert plugin
    ],
    server: {
        https: true, // Enable HTTPS
        host: 'localhost', // Optional: Specify the host
        port: 3000, // Optional: Specify the port
    },
});
