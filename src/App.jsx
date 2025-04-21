import './assets/css/index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import MainLayout from './components/layouts/MainLayout';
import AuthRedirect from './components/AuthRedirect';
import PrivateRoute from './components/PrivateRoute';
import useAuthStore from "./stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';
import Router from './routes';

function App() {
    const { refreshSession } = useAuthStore();

    // Use React Query to handle session refresh
    const { isLoading, isSuccess } = useQuery({
        queryKey: ['refreshSession'],
        queryFn: async () => {
            return refreshSession();
        },
    });

    return (
        <>
            {isSuccess && <BrowserRouter>
                <Routes>
                    {routes.map(({ path, page: Page, layout: Layout, authRedirect = false, isPrivate = false }, index) => {
                        return (
                            <Route 
                                key={index}
                                path={path} 
                                element={
                                    isPrivate ? (
                                        <PrivateRoute>
                                            <MainLayout>
                                                <Page />
                                            </MainLayout>
                                        </PrivateRoute>
                                    ) : (
                                        <AuthRedirect authRedirect={authRedirect}>
                                            <MainLayout>
                                                <Page />
                                            </MainLayout>
                                        </AuthRedirect>
                                    )
                                } 
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>}
            <Toaster
                position="top-right"
            />
        </>
    );
}

export default App;
