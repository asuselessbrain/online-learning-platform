import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Root from "../Layout/Root";
import AllCourses from "../pages/Courses/AllCourses";
import DashboardSummary from "../pages/Dashboard/DashboardSummary";
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
import ProfileSetting from "../pages/Dashboard/Student/ProfileSetting/ProfileSetting";
import InstructorDashboard from "../pages/Dashboard/Instructor/Dashboard/InstructorDashboard";
import AdminDashboard from "../pages/Dashboard/Admin/Dashboard/AdminDashboard";
import CreateCourse from "../pages/Dashboard/Admin/CreateCourse/CreateCourse";
import ManageCategory from "../pages/Dashboard/Admin/ManageCategory/ManageCategory";
import ManageInstructor from "../pages/Dashboard/Admin/ManageInstructor/ManageInstructor";
import AddInstructor from "../pages/Dashboard/Admin/ManageInstructor/AddInstructor";
import InstructorDetailsPage from "../pages/Dashboard/Admin/ManageInstructor/InstructorDetailsPage";
import ManageCourses from "../pages/Dashboard/Admin/ManageCourses/ManageCourses";
import ViewCourseDetailsForAdmin from "../pages/Dashboard/Admin/ManageCourses/ViewCourseDetailsForAdmin";
import EditCourse from "../pages/Dashboard/Admin/ManageCourses/EditCourse";

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
            {
                path: "profile",
                element: <ProfileSetting />,
                loader: () => fetch('/district.json').then(res => res.json())
            }
        ]
    },
    {
        path: "/instructor",
        element: <DashboardLayout />,
        children: [
            {
                path: "dashboard",
                element: <InstructorDashboard />
            }
        ]
    },
    {
        path: "/admin",
        element: <DashboardLayout />,
        children: [
            {
                path: "dashboard",
                element: <AdminDashboard />
            },
            {
                path: "add-course",
                element: <CreateCourse />
            },
            {
                path: "manage-category",
                element: <ManageCategory />
            },
            {
                path: "manage-instructors",
                element: <ManageInstructor />
            },
            {
                path: "add-instructor",
                element: <AddInstructor />,
                loader: () => fetch('/district.json').then(res => res.json())
            },
            {
                path: "view-instructor/:id",
                element: <InstructorDetailsPage />
            },
            {
                path: "manage-courses",
                element: <ManageCourses />
            },
            {
                path: "edit-course/:id",
                element: <EditCourse />
            },
            {
                path: "view-course/:id",
                element: <ViewCourseDetailsForAdmin />
            }
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