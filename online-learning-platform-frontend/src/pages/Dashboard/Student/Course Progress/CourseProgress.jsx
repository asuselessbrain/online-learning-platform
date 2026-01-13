import { FiClock, FiTrendingUp } from 'react-icons/fi';
import PageHeading from '../../shared/PageHeading';
import { LiaCertificateSolid } from 'react-icons/lia';
import { RiFocus2Line } from "react-icons/ri";
import DashboardCard from '../../shared/DashboardCard';
import { useForm } from 'react-hook-form';
import ProgressBar from '../../shared/ProgressBar';
import { useState } from 'react';
import Pagination from '../../shared/Pagination';
import { use } from 'react';
import { AuthContext } from '../../../../Providers/AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../../hooks/useAxios';
import Certificate from '../Certificates/Certificate';

const CourseProgress = () => {
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

    const courseProgressCards = [
        {
            title: "Avg Progress",
            count: "68%",
            icon: FiTrendingUp,
            increase: "+8% this week",
            iconColor: "text-[#309255]",
            iconBg: "bg-[#eef6f1]",
        },
        {
            title: "Total Hours",
            count: "76",
            icon: FiClock,
            increase: "+12 this week",
            iconColor: "text-[#3B82F6]",
            iconBg: "bg-[#EFF6FF]",
        },
        {
            title: "Completed",
            count: "93",
            icon: LiaCertificateSolid,
            increase: "lessons",
            iconColor: "text-[#F59E0B]",
            iconBg: "bg-[#FFFBEB]",
        },
        {
            title: "Streak",
            count: "7",
            icon: RiFocus2Line,
            increase: "days",
            iconColor: "text-[#8B5CF6]",
            iconBg: "bg-[#F5F3FF]",
        },
    ];


    const { user } = use(AuthContext)

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

    const { data, isLoading } = useQuery({
        queryKey: ["my-courses", searchTerm, page, status, category, sortOrder, sortBy, limit, isFree],
        queryFn: async () => {
            const res = await axiosSecure(`/enrolment/${profile?._id}?searchTerm=${searchTerm}&page=${page}&limit=${limit}&status=${status}&category=${category}&sortOrder=${sortOrder}&sortBy=${sortBy}&isFree=${isFree}`);
            return res.data.data;
        },
    });

    // course.title
    // course.modules
    // progressPercentage
    const onSubmit = data => {
        setSearchTerm(data.searchTerm)
        setStatus(data.status)
        setIsFree(data.isFree)
        setCategory(data.category)
        setSortBy("createdAt")
        setSortOrder(data.sortOrder)
        setPage(1);
    }

    const getTotalLessons = modules =>
        modules.reduce((sum, m) => sum + m.lectures.length, 0);

    return (
        <div className='p-6'>
            <PageHeading title="Course Progress" subtitle="Track your learning progress and achievements" />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-6'>
                {
                    courseProgressCards.map((card, index) => (
                        <DashboardCard key={index} title={card.title} count={card.count} icon={card.icon} increase={card.increase} iconColor={card.iconColor} iconBg={card.iconBg} />
                    ))
                }
            </div>

            <div className="bg-white rounded-xl p-4 my-6">
                <form onChange={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <input type="text" {...register("searchTerm")} id="search" className="w-full p-3 rounded-md border border-[#E5E7EB] col-span-1 md:col-span-2" placeholder="Search by course name" />
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
                    </select>
                    <select {...register("sortOrder")} id="sortBy" className="p-3 border border-gray-300 rounded-md">
                        <option value="">Sort By</option>
                        <option value="des">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>
                </form>
            </div>

            <div className="rounded-xl p-6 bg-white">
                <p className="mb-2">Progress by Course ({data?.meta?.total || 0})</p>
                {
                    isLoading ? <p>Loading...</p> : <div>
                        {
                            data?.data.map(course => (<div key={course._id} className='border border-[#E5E7EB] rounded-xl p-4 mb-4 hover:border-[#309255] transition-all duration-500'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <h3 className='text-xl'>{course.course.title}</h3>
                                        <div className='text-sm text-[#4A5565] flex items-center gap-6 my-2'>
                                            <p>{course.completedLectures.length}/{getTotalLessons(course.modules)} lessons</p>
                                            {/* <p className='flex items-center gap-1'><FiClock /> {course.duration}</p> */}
                                        </div>
                                    </div>
                                    <h3 className='text-2xl text-[#309255]'>{Math.floor(course.progressPercentage)}%</h3>
                                </div>
                                <ProgressBar value={`${course.progressPercentage}%`} />
                            </div>))
                        }
                    </div>
                }

            </div>
            <Pagination page={page} setPage={setPage} total={data?.meta.total} limit={limit} />

        </div>
    );
};

export default CourseProgress;