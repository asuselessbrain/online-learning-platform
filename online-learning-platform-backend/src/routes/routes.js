import { certificateRouter } from "../modules/certificate/certificate.router.js"
import { newCourseRouter } from "../modules/course/course.router.js"
import { enrollmentRouter } from "../modules/enrollment/enrollment.router.js"
import { reviewRouter } from "../modules/review/review.router.js"
import express from "express"
import { UserRoutes } from "../modules/user/user.route.js"
import { faqRouter } from "../modules/faq/faq.router.js"
import { categoryRouter } from "../modules/category/category.router.js"
import { InstructorRouter } from "../modules/instructor/instructor.router.js"
import { blogsRouter } from "../modules/blogs/blogs.router.js"
import { moduleRouter } from "../modules/module/module.router.js"
import { lectureRouter } from "../modules/lectures/lectures.router.js"

const router = express.Router()

const routes = [
    {
        path: "/reviews",
        element: reviewRouter
    },
    {
        path: "/certificate",
        element: certificateRouter
    },
    {
        path: "/new-courses",
        element: newCourseRouter
    },
    {
        path: "/enrolment",
        element: enrollmentRouter
    },
    {
        path: "/users",
        element: UserRoutes
    },
    {
        path: "/faqs",
        element: faqRouter
    },
    {
        path: "/categories",
        element: categoryRouter
    },
    {
        path: "/instructors",
        element: InstructorRouter
    },
    {
        path: "/blogs",
        element: blogsRouter
    },
    {
        path: "/modules",
        element: moduleRouter
    },
    {
        path: "/lectures",
        element: lectureRouter
    }
]


routes.forEach(route => router.use(route.path, route.element))

export default router;