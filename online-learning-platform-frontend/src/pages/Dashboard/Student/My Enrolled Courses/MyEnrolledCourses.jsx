import { useForm } from "react-hook-form";
import PageHeading from "../../shared/PageHeading";
import CourseCard from "../../shared/CourserCard";
import { use, useState } from "react";
import Pagination from "../../shared/Pagination";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { AuthContext } from "../../../../Providers/AuthContext";

const MyEnrolledCourses = () => {
    const { register, handleSubmit } = useForm();
    const [page, setPage] = useState(1);
    const limit = 10;
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('');
    const [isFree, setIsFree] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const axiosSecure = useAxios()

    const onSubmit = data => {
        setSearchTerm(data.searchTerm)
        setStatus(data.status)
        setIsFree(data.isFree)
        setCategory(data.category)
        setSortBy("createdAt")
        setSortOrder(data.sortOrder)
        setPage(1);
    }

    const { user } = use(AuthContext)

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

    const { data: profile } = useQuery({
        queryKey: ['myProfile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}/profile`);
            return res.data.data;
        },
        enabled: !!user?.email,
    })

    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosSecure('/categories/active/list')
            return res.data.data
        }
    })

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["my-courses", searchTerm, page, status, category, sortOrder, sortBy, limit, isFree],
        queryFn: async () => {
            const res = await axiosSecure(`/enrolment/${profile?._id}?searchTerm=${searchTerm}&page=${page}&limit=${limit}&status=${status}&category=${category}&sortOrder=${sortOrder}&sortBy=${sortBy}&isFree=${isFree}`);
            return res.data.data;
        },
    });

    return (
        <div className="p-6">
            <PageHeading title="My Enrolled Courses" subtitle="View and manage your enrolled courses" />
            <div className="bg-white rounded-xl p-4 my-6">
                <form onChange={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    <input type="text" {...register("searchTerm")} id="search" className="w-full p-3 rounded-xl border border-[#E5E7EB] col-span-1 md:col-span-2" placeholder="Search by course name" />
                    <select {...register("category")} className="p-3 border border-gray-300 rounded-md w-full">
                        <option value="">All Category</option>
                        {
                            categoriesLoading ? <option>Loading...</option> : categories.map(cat => (
                                <option key={cat._id} value={cat.slug}>{cat.name}</option>
                            ))
                        }
                    </select>
                    <select id="status" {...register("status")} className="w-full p-3 rounded-xl border border-[#E5E7EB]">
                        <option value="">All Status</option>
                        {
                            ["pending", "active", "completed", "cancelled"].map(s => (<option value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>))
                        }
                        <option value="completed">Completed</option>
                        <option value="inProgress">In Progress</option>
                    </select>
                    <select {...register("isFree")} className="p-3 border border-gray-300 rounded-md w-full">
                        <option value="">Course Type</option>
                        <option value="true">Free</option>
                        <option value="false">Paid</option>
                    </select>
                    <select {...register("sortOrder")} id="sortBy" className="p-3 border border-gray-300 rounded-md">
                        <option value="">Sort By</option>
                        <option value="des">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>
                </form>
            </div>
            {
                data?.data.length === 0 ? <p className="text-center">No Enrolled course found</p> : <><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-stretch">

                    {
                        isLoading ? <p>Loading...</p> : data.data.map(c => (<CourseCard thumbnail={c?.course?.thumbnail} title={c?.course?.title} instructor={c?.instructorUser?.name} progress={c?.progressPercentage} buttonText={c?.course?.buttonText} id={c.courseId} />))
                    }

                </div>

                    <div className="mt-4">
                        <Pagination page={page} setPage={setPage} total={data?.meta.total} limit={limit} />
                    </div>
                </>
            }
        </div>
    );
};

export default MyEnrolledCourses;