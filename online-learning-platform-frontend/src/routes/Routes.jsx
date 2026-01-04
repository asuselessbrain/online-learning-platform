import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Root from "../Layout/Root";
import AllCourses from "../pages/Courses/AllCourses";
import DashboardSummary from "../pages/Dashboard/DashboardSummary";
import AddCourse from "../pages/Dashboard/AddCourse";
import MyAddedCourses from "../pages/Dashboard/MyAddedCourses";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import MyEnrollments from "../pages/Dashboard/MyEnrollments";
import MyProfile from "../pages/Dashboard/MyProfile";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Terms from "../pages/Terms/Terms";
import Privacy from "../pages/Privacy/Privacy";
import Faq from "../pages/Faq/Faq";
import Support from "../pages/Support/Support";
import ProtectedRoute from "../Providers/ProtectedRoute";
import DashboardLayout from "../Layout/Dashboard";
import Dashboard from "../pages/Dashboard/Student/Dashboard/Dashboard";
import MyEnrolledCourses from "../pages/Dashboard/Student/My Enrolled Courses/MyEnrolledCourses";
import CourseProgress from "../pages/Dashboard/Student/Course Progress/CourseProgress";
import Certificates from "../pages/Dashboard/Student/Certificates/Certificates";

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
                path: "/terms",
                element: <Terms />
            },
            {
                path: "/courses/:id",
                element: <CourseDetails />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            }
            ,
            {
                path: "/privacy",
                element: <Privacy />
            }
            ,
            {
                path: "/faq",
                element: <Faq />
            }
            ,
            {
                path: "/support",
                element: <Support />
            }
        ]
    },
    {
        path: "/student",
        element: <DashboardLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "my-enrolled-courses",
                element: <MyEnrolledCourses />
            },
            {
                path: "course-progress",
                element: <CourseProgress />
            },
            {
                path: "certificates",
                element: <Certificates />
            },
        ]
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            {
                index: true,
                element: <ProtectedRoute><DashboardSummary /></ProtectedRoute>
            }
            ,
            {
                path: "add-course",
                element: <ProtectedRoute><AddCourse /></ProtectedRoute>
            },
            {
                path: "my-courses",
                element: <ProtectedRoute><MyAddedCourses /></ProtectedRoute>
            },
            {
                path: "my-enrollments",
                element: <ProtectedRoute><MyEnrollments /></ProtectedRoute>
            },
            {
                path: "my-profile",
                element: <ProtectedRoute><MyProfile /></ProtectedRoute>
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