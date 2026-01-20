import { FiAward, FiBookOpen, FiClock, FiTrendingUp } from "react-icons/fi";
import DashboardCard from "../../shared/DashboardCard";
import PageHeading from "../../shared/PageHeading";
import CourseCard from "../../shared/CourserCard";
import useStudentDashboardData from "../../../../hooks/useStudentDashboardData";
import Loading from "../../../../Components/Shared/Loading";
import useCourse from "../../../../hooks/useCourse";

const Dashboard = () => {
    const { studentStats, studentStatsLoading } = useStudentDashboardData()
    const dashboardCards = [
        {
            title: "Enrolled Courses",
            count: studentStats?.enrolledCourseCount,
            icon: FiBookOpen,
            increase: `+${studentStats?.currentMonthEnrolled || 0} this month`,
            iconColor: "text-[#309255]",
            iconBg: "bg-[#eef6f1]",
        },
        {
            title: "Completed Course",
            count: studentStats?.completedCourse,
            icon: FiClock,
            increase: `+${studentStats?.completedCourse || 0} this month`,
            iconColor: "text-[#3B82F6]",
            iconBg: "bg-[#EFF6FF]",
        },
        {
            title: "Certificates Earned",
            count: studentStats?.certificatesEarned,
            icon: FiAward,
            increase: `+${studentStats?.currentMonthCertificatesEarned || 0} this month`,
            iconColor: "text-[#F59E0B]",
            iconBg: "bg-[#FFFBEB]",
        },
        {
            title: "Average Progress",
            count: `${Math.round(studentStats?.avgProgress)}%`,
            icon: FiTrendingUp,
            increase: `${studentStats?.percentageIncrease > 0 ? "+" : ""}${studentStats?.percentageIncrease || 0}%`,
            iconColor: "text-[#8B5CF6]",
            iconBg: "bg-[#F5F3FF]",
        },
    ];

    const { courses, courseLoading } = useCourse({ searchTerm: "", page: 1, status: "", category: "", sortOrder: "", sortBy: "", limit: 3, isFree: "" })

    return (
        <div className="p-6">
            <PageHeading title="Student Dashboard" subtitle="Track your learning progress and achievements" />
            {
                studentStatsLoading ? <div className="bg-linear-to-b from-[#e7f8ee] to-white p-4 sm:p-6 font-sans text-gray-900 min-h-[calc(100vh-48px)] m-6 rounded-xl flex items-center justify-center">
                    <Loading message="Loading dashboard data..." fullScreen={false} />
                </div> : <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        dashboardCards.map((card, index) => (<DashboardCard key={index} title={card.title} count={card.count} icon={card.icon} increase={card.increase} iconColor={card.iconColor} iconBg={card.iconBg} />))
                    }

                </div>
            }


            <div className="rounded-xl p-6 bg-white">
                <p className="mb-2">Continue Learning</p>

                {
                    courseLoading ? <div className="bg-linear-to-b from-[#e7f8ee] to-white p-4 sm:p-6 font-sans text-gray-900 min-h-[calc(100vh-48px)] m-6 rounded-xl flex items-center justify-center">
                        <Loading message="Loading courses..." fullScreen={false} />
                    </div> :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {
                                courses?.data.map(c => (
                                    <CourseCard key={c._id} thumbnail={c?.course?.thumbnail} title={c?.course?.title} instructor={c?.instructorUser?.name} progress={c?.progressPercentage} buttonText={c?.course?.buttonText} id={c.courseId} />
                                ))
                            }

                        </div>
                }
            </div>
        </div>
    );
};

export default Dashboard;