import { useState, useContext } from 'react';
import { AuthContext } from '../../Providers/AuthContext';
import CourseCard from '../../Components/Shared/CourseCard';
import ReadyToStart from '../../Components/Home/ReadyToStart';
import Loading from '../../Components/Shared/Loading';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import Pagination from '../Dashboard/shared/Pagination';

const AllCourses = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit } = useForm()
    const [page, setPage] = useState(1);
    const limit = 10;
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [sortBy, setSortBy] = useState("");

    const axiosPublic = useAxios()

    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosPublic('/categories/active/list')
            return res.data.data
        }
    })

    const { data, isLoading } = useQuery({
        queryKey: ["adminCourses", searchTerm, page, status, category, sortOrder, sortBy, limit],
        queryFn: async () => {
            const res = await axiosPublic(`/new-courses/user/courses?searchTerm=${searchTerm}&page=${page}&limit=${limit}&status=${status}&category=${category}&sortOrder=${sortOrder}&sortBy=${sortBy}`);
            return res.data.data;
        },
    });


    if (isLoading) return <Loading message="Loading courses..." fullScreen={true} />;

    const onSubmit = data => {
        setSearchTerm(data.searchTerm || "");
        setStatus(data.status || "");
        setCategory(data.category || "");
        setPage(1);

        const sortData = data.sort.split("-")
        setSortBy(sortData[0])
        setSortOrder(sortData[1])
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0 py-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">All Courses</h1>
                    <p className="text-gray-600">Explore our wide range of courses and start learning today.</p>
                </div>

                <form onChange={handleSubmit(onSubmit)} className="bg-white p-4 rounded-xl my-6 flex items-center gap-4">
                    {/* search term */}
                    <input type="text" {...register("searchTerm")} id="searchTerm" className="p-3 border border-gray-300 rounded-md w-full" placeholder="Search categories, instructor name, level or language..." />
                    {/* category  */}
                    <select {...register("category")} className="p-3 border border-gray-300 rounded-md w-full md:w-1/5">
                        <option value="">All Status</option>
                        {
                            categoriesLoading ? <option>Loading...</option> : categories.map(cat => (
                                <option key={cat._id} value={cat.slug}>{cat.name}</option>
                            ))
                        }
                    </select>
                    {/* status */}
                    <select {...register("status")} className="p-3 border border-gray-300 rounded-md w-full md:w-1/5">
                        <option value="">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                    {/* sorting */}
                    <select {...register("sort")} id="sortBy" className="p-3 border border-gray-300 rounded-md">
                        <option value="">Sort By</option>
                        <option value="discountedPrice-asc">Price: Low to High</option>
                        <option value="discountedPrice-desc">Price: High to Low</option>
                        <option value="createdAt-desc">Newest First</option>
                        <option value="createdAt-asc">Oldest First</option>
                    </select>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.data.map(course => (
                        <CourseCard key={course._id} course={course} user={user} />
                    ))}
                </div>
                <div className="mt-4">
                    <Pagination page={page} setPage={setPage} total={data?.meta?.total || 0} limit={limit} />
                </div>
            </div>
            <ReadyToStart />
        </div>
    );
};

export default AllCourses;