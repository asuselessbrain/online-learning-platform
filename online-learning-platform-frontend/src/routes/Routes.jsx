import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Root from "../Layout/Root";
import AllCourses from "../pages/Courses/AllCourses";
import Dashboard from "../Layout/Dashboard";
import DashboardSummary from "../pages/Dashboard/DashboardSummary";
import AddCourse from "../pages/Dashboard/AddCourse";
import MyAddedCourses from "../pages/Dashboard/MyAddedCourses";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import MyEnrollments from "../pages/Dashboard/MyEnrollments";
import MyProfile from "../pages/Dashboard/MyProfile";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/courses",
                element: <AllCourses />
            },
            {
                path: "/courses/:id",
                element: <CourseDetails />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                index: true,
                element: <DashboardSummary />
            }
            ,
            {
                path: "add-course",
                element: <AddCourse />
            },
            {
                path: "my-courses",
                element: <MyAddedCourses />
            },
            {
                path: "my-enrollments",
                element: <MyEnrollments />
            },
            {
                path: "my-profile",
                element: <MyProfile />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/registration",
        element: <Registration />
    }
])