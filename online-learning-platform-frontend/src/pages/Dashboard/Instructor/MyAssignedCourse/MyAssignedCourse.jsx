import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../Providers/AuthContext";
import useAxios from "../../../../hooks/useAxios";
import PageHeading from "../../../Dashboard/shared/PageHeading";
import Pagination from "../../../Dashboard/shared/Pagination";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import AddModuleModal from "./AddModuleModal";

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const MyAssignedCourse = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxios();
    const { register, handleSubmit } = useForm()
    const [courseId, setCourseId] = useState("")

    // filters / ui state
    const [page, setPage] = useState(1);
    const limit = 10;
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('');
    const [isFree, setIsFree] = useState(''); // '' | 'true' | 'false'
    const [level, setLevel] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState(''); // 'price' or 'createdAt'
    const [sortOrder, setSortOrder] = useState(''); // 'asc' | 'des'
    const [isOpen, setIsOpen] = useState(false)

    // fetch profile id
    const { data: profile } = useQuery({
        queryKey: ['myProfile', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}/profile`);
            return res.data.data;
        },
        enabled: !!user?.email,
    })

    const { data: categoryData, isLoading: categoryLoading } = useQuery({
        queryKey: ['courseCategories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/categories/active/list');
            return res.data.data;
        }
    });
    // build query params
    const queryKey = ['myAssignedCourses', profile?._id, page, limit, searchTerm, status, isFree, level, category, sortBy, sortOrder];

    const { data, isLoading, refetch } = useQuery({
        queryKey,
        queryFn: async () => {
            if (!profile?._id) return { meta: { total: 0, page: 1, limit }, data: [] };
            const params = new URLSearchParams();
            params.set('page', page);
            params.set('limit', limit);
            if (status) params.set('status', status);
            if (isFree !== '') params.set('isFree', isFree);
            if (level) params.set('level', level);
            if (category) params.set('category', category);
            if (searchTerm) params.set('searchTerm', searchTerm);
            if (sortBy) params.set('sortBy', sortBy);
            if (sortOrder) params.set('sortOrder', sortOrder);

            const url = `/new-courses/instructor/${profile._id}/assigned-courses?${params.toString()}`;
            const res = await axiosPublic.get(url);
            return res.data.data;
        },
        enabled: !!profile?._id,
        keepPreviousData: true,
    })

    const total = data?.meta?.total || 0;
    const courses = data?.data || [];

    const handleApplyFilters = (data) => {
        setSearchTerm(data.searchTerm)
        setStatus(data.status)
        setIsFree(data.isFree)
        setLevel(data.level)
        setCategory(data.category)
        if (data.sort!=="") {
            const sortData = data.sort.split("-")

            setSortBy(sortData[0])
            setSortOrder(sortData[1])
        }else{
            setSortBy("")
            setSortOrder("")
        }
        setPage(1);
        refetch();
    }

    const handleCreateModule = (id) => {
        setIsOpen(!isOpen)
        setCourseId(id)
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between flex-col md:flex-row gap-4">
                <PageHeading title="My Assigned Courses" subtitle="Manage courses assigned to you" />
            </div>

            <form onChange={handleSubmit(handleApplyFilters)} className="bg-white p-4 rounded-xl my-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                <input {...register("searchTerm")} type="text" className="p-3 border border-gray-300 rounded-md w-full md:w-1/3" placeholder="Search title or category..." />

                <select {...register('status')} className="p-3 border border-gray-300 rounded-md w-full md:w-1/6">
                    <option value="">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                </select>

                <select {...register("isFree")} className="p-3 border border-gray-300 rounded-md w-full md:w-1/6">
                    <option value="">All</option>
                    <option value="true">Free</option>
                    <option value="false">Paid</option>
                </select>

                <select {...register("level")} className="p-3 border border-gray-300 rounded-md w-full md:w-1/6">
                    <option value="">All Levels</option>
                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>

                <select {...register("category")} className="p-3 border border-gray-300 rounded-md w-full md:w-1/6">


                    <option value="">
                        {categoryLoading ? 'Loading categories...' : 'All Category'}
                    </option>
                    {categoryData?.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <select {...register("sort")} className="p-3 border border-gray-300 rounded-md w-full md:w-1/6">
                    <option value="">Sort By</option>
                    <option value="price-asc">Price Low to High</option>
                    <option value="price-desc">Price High to Low</option>
                    <option value="createdAt-desc">Newest First</option>
                    <option value="createdAt-asc">Oldest First</option>
                </select>
            </form>

            <div className="bg-white rounded-xl p-4 my-6">
                <p className="mb-2 font-semibold">Courses ({total})</p>
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#F3F4F6]">
                            <tr>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Level</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">CreatedAt</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-6">Loading...</td>
                                </tr>
                            ) : courses.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-6">No courses found.</td>
                                </tr>
                            ) : (
                                courses.map((course) => (
                                    <tr key={course._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{course.title}</td>
                                        <td className="px-4 py-3">{course.category?.name || course.category || 'N/A'}</td>
                                        <td className="px-4 py-3">{course.level || 'N/A'}</td>
                                        <td className="px-4 py-3">{course.isFree ? 'Free' : course.price ? `${course.price} BDT` : '—'}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${course.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {course.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">{new Date(course.createdAt).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 flex gap-2">
                                            <Link to={`/instructor/manage-course/${course._id}`} className="text-[#309255] p-2 rounded-md border border-[#E6F4EA] hover:bg-[#eefbf3]">View</Link>
                                            <button onClick={()=>handleCreateModule(course._id)} className="p-2 rounded-md bg-white border border-[#309255] text-[#309255] hover:bg-[#e7f8ee]">Add  New Module</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {
                    isOpen && <AddModuleModal setOpen={setIsOpen} refetch={refetch} courseId={courseId} />
                }

                <div className="mt-4">
                    <Pagination page={page} setPage={setPage} total={total} limit={limit} />
                </div>
            </div>
        </div>
    );
};

export default MyAssignedCourse;