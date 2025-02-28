import './assets/css/index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import routes from "./routes"
import MainLayout from './components/layouts/MainLayout'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                {routes.map(({ path, page: Page, layout: Layout }, index) => {
                    return (<Route 
                        key={index}
                        path={path} 
                        element={
                            <MainLayout>
                                <Page/>
                            </MainLayout>
                        } 
                    />)
                })}
            </Routes>
        </BrowserRouter>
    )
}

export default App
