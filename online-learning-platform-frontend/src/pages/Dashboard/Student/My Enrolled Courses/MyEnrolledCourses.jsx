import { useForm } from "react-hook-form";
import PageHeading from "../../shared/PageHeading";
import CourseCard from "../../shared/CourserCard";
import { useState } from "react";
import Pagination from "../../shared/Pagination";

const MyEnrolledCourses = () => {
    const { register, handleSubmit } = useForm();
    const [page, setPage] = useState(1);

    const onSubmit = data => {
        console.log(data);
    }

    const courseProgressData = [
        {
            id: 1,
            thumbnail: "https://i.ibb.co.com/CsNgf1kj/Screenshot-2026-01-03-180517.png",
            title: "Complete Web Development Bootcamp",
            instructor: "Dr. Samsuzzman",
            progress: 70,
            buttonText: "Continue Course",
        },
        {
            id: 2,
            thumbnail: "https://webapplicationdevelopments.com/wp-content/uploads/2023/08/vecteezy_3d-render-seo-data-an-analytics-user-interface-for-web_8884028_341-1-scaled.jpg",
            title: "UI/UX Design Masterclass",
            instructor: "Jhankar Mahbub",
            progress: 45,
            buttonText: "Resume Course",
        },
        {
            id: 3,
            thumbnail: "https://media2.dev.to/dynamic/image/width=1280,height=720,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fl8codoa12swslg7ljozk.jpeg",
            title: "React & Tailwind Advanced",
            instructor: "Sumit Saha",
            progress: 85,
            buttonText: "Continue Course",
        },
    ];

    // const totalPages = data ? Math.ceil(data.meta.total / limit) : 1;
    // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const totalPages = 10;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className="p-6">
            <PageHeading title="My Enrolled Courses" subtitle="View and manage your enrolled courses" />
            <div className="bg-white rounded-xl p-4 my-6">
                <form onChange={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input type="text" {...register("search")} id="search" className="w-full p-3 rounded-xl border border-[#E5E7EB] col-span-1 md:col-span-2" placeholder="Search by course name" />
                    <select id="courseName" {...register("courseName")} className="w-full p-3 rounded-xl border border-[#E5E7EB]">
                        <option value="">All Categories</option>
                        <option value="webDevelopment">Web Development</option>
                        <option value="design">Design</option>
                        <option value="dataScience">Data Science</option>
                    </select>
                    <select id="status" {...register("status")} className="w-full p-3 rounded-xl border border-[#E5E7EB]">
                        <option value="">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="inProgress">In Progress</option>
                    </select>
                </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-stretch">
                {
                    courseProgressData.map(course => (<CourseCard thumbnail={course.thumbnail} title={course.title} instructor={course.instructor} progress={course.progress} buttonText={course.buttonText} />))
                }
                
            </div>

            <Pagination page={page} setPage={setPage} pageNumbers={pageNumbers} totalPages={totalPages} />
        </div>
    );
};

export default MyEnrolledCourses;