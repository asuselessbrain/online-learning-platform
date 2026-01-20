import { useForm } from "react-hook-form";
import PageHeading from "../../shared/PageHeading";
import CourseCard from "../../shared/CourserCard";
import { useState } from "react";
import Pagination from "../../shared/Pagination";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import Loading from "../../../../Components/Shared/Loading";
import useCourse from "../../../../hooks/useCourse";

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



    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosSecure('/categories/active/list')
            return res.data.data
        }
    })

    const { courses, courseLoading } = useCourse({ searchTerm, page, status, category, sortOrder, sortBy, limit, isFree })


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
                            ["pending", "active", "completed", "cancelled"].map(s => (<option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>))
                        }
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
                courses?.data.length === 0 ? <p className="text-center">No Enrolled course found</p> : <><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-stretch">

                    {
                        courseLoading ? <div className="bg-linear-to-b from-[#e7f8ee] to-white col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4 p-4 sm:p-6 font-sans text-gray-900 min-h-[calc(100vh-48px)] m-6 rounded-xl flex items-center justify-center">
                            <Loading message="Loading courses ..." fullScreen={false} />
                        </div> : courses?.data.map(c => (<CourseCard key={c._id} thumbnail={c?.course?.thumbnail} title={c?.course?.title} instructor={c?.instructorUser?.name} progress={c?.progressPercentage} buttonText={c?.course?.buttonText} id={c.courseId} />))
                    }

                </div>

                    <div className="mt-4">
                        <Pagination page={page} setPage={setPage} total={courses?.meta.total} limit={limit} />
                    </div>
                </>
            }
        </div>
    );
};

export default MyEnrolledCourses;