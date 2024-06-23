import {createBrowserRouter} from "react-router-dom"
import App from "./App"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegistrationPage from "./pages/RegistrationPage"
import Roster from "./pages/Roster"
import UserDashboard from "./pages/UserDashboard"
import NotFoundPage from "./pages/NotFoundPage"
import CreateRoster from "./pages/CreateRoster"
import UpdateRoster from './pages/UpdateRoster'

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                index: true,
                element: <HomePage />
            },
            {
                path:'login/',
                element: <LoginPage />
            },
            {
                path:'registration/',
                element: <RegistrationPage />
            },
            {
                path:'roster/',
                element: <Roster />
            },
            {
                path:'dashboard/',
                element: <UserDashboard />,
            },
            {
                path:'dashboard/create/',
                element: <CreateRoster/>
            },
            {
                path:'dashboard/update/',
                element: <UpdateRoster/>
            }
            
        ],
        errorElement:<NotFoundPage />
    }
])

export default router;