import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './assets/css/index.css';
import App from './App.jsx';

// Create a QueryClient instance
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1, // Retry failed queries once
            refetchOnWindowFocus: false, // Disable refetching on window focus
        },
    },
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>,
);
