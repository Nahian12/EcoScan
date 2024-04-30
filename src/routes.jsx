import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import MyNavbar from "./Components/Layout/MyNavbar";
import LitterMap from "./Components/Pages/LitterMap";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <MyNavbar />
            },
            {
                path: "/littermap",
                element: <LitterMap />,
            },
                
            //     children: [
            //         {
            //             path: '/',
            //             element: <Navigate to="/about" />
            //         },
            //         {
            //             path: "/upload",
            //             element: <Upload />,
            //         },
            //         {
            //             path: "/gallery",
            //             element: <LitterGallery />,
            //         },
            //         {
            //             path: "/tag",
            //             element: <LitterTag />,
            //         },
            //         {
            //             path: "/cleanup",
            //             element: <Cleanup />,
            //         },
            //         {
            //             path: "/createTeam",
            //             element: <CreateTeam />
            //         },
            //         {
            //             path: "/joinTeam",
            //             element: <JoinTeam />
            //         },
            //         {
            //             path: "/myTeam",
            //             element: <ViewTeam />
            //         },
            //         {
            //             path: "/worldcup",
            //             element: <WorldCup />
            //         },
            //         {
            //             path: "/worldCupLeaderboards",
            //             element: <WorldCupLeaderboards />
            //         },
            //     ]
            // },
            // {
            //     path: "/about",
            //     element: <About />,
            // },
            // {
            //     path: "/global",
            //     element: <GlobalMap />,
            // },
            // {
            //     path: "/",
            //     element: <GuestLayout />,
            //     children: [
            //         {
            //             path: "/login",
            //             element: <Login />,
            //         },
            //         {
            //             path: "/signup",
            //             element: <Signup />,
            //         },
            //     ],
            // },
            // {
            //     path: '/community',
            //     element: <Community />
            // },
        ],
    },
    // {
    //     path: "*",
    //     element: <NotFound />,
    // },
]);

export default routes;