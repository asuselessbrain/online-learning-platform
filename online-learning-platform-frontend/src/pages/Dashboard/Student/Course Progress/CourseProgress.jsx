import { FiClock, FiTrendingUp } from 'react-icons/fi';
import PageHeading from '../../shared/PageHeading';
import { LiaCertificateSolid } from 'react-icons/lia';
import { RiFocus2Line } from "react-icons/ri";
import DashboardCard from '../../shared/DashboardCard';
import { useForm } from 'react-hook-form';
import ProgressBar from '../../shared/ProgressBar';
import { useState } from 'react';
import Pagination from '../../shared/Pagination';

const CourseProgress = () => {
    const { register, handleSubmit } = useForm();
    const [page, setPage] = useState(1);
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

    const courseProgressList = [
        {
            id: 1,
            title: "Complete Web Development Bootcamp",
            completedLessons: 36,
            totalLessons: 48,
            duration: "28h 45m",
            progress: 75,
        },
        {
            id: 2,
            title: "React & Tailwind Advanced",
            completedLessons: 20,
            totalLessons: 30,
            duration: "18h 10m",
            progress: 66,
        },
        {
            id: 3,
            title: "UI/UX Design Masterclass",
            completedLessons: 15,
            totalLessons: 25,
            duration: "14h 30m",
            progress: 60,
        },
        {
            id: 4,
            title: "Backend Development with Node.js",
            completedLessons: 42,
            totalLessons: 50,
            duration: "32h 05m",
            progress: 84,
        },
    ];



    const onSubmit = data => {
        console.log(data);
    }

    // const totalPages = data ? Math.ceil(data.meta.total / limit) : 1;
    // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const totalPages = 10;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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

            <div className="rounded-xl p-6 bg-white">
                <p className="mb-2">Progress by Course</p>
                <div>
                    {
                        courseProgressList.map(course => (<div key={course.id} className='border border-[#E5E7EB] rounded-xl p-4 mb-4 hover:border-[#309255] transition-all duration-500'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h3 className='text-xl'>{course.title}</h3>
                                    <div className='text-sm text-[#4A5565] flex items-center gap-6 my-2'>
                                        <p>{course.completedLessons}/{course.totalLessons} lessons</p>
                                        <p className='flex items-center gap-1'><FiClock /> {course.duration}</p>
                                    </div>
                                </div>
                                <h3 className='text-2xl text-[#309255]'>{course.progress}%</h3>
                            </div>
                            <ProgressBar value={`${course.progress}%`} />
                        </div>))
                    }
                </div>
            </div>
            <Pagination page={page} setPage={setPage} pageNumbers={pageNumbers} totalPages={totalPages} />
        </div>
    );
};

export default CourseProgress;