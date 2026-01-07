import DashboardCard from "../../shared/DashboardCard";
import PageHeading from "../../shared/PageHeading";
import { FiBookOpen, FiUsers, FiStar, FiTrendingUp } from "react-icons/fi";

const InstructorDashboard = () => {

    const dashboardCards = [
        {
            title: "Assigned Courses",
            count: "8",
            icon: FiBookOpen,
            increase: "+2 new",
            iconColor: "text-[#309255]",
            iconBg: "bg-[#eef6f1]",
        },
        {
            title: "Total Students",
            count: "342",
            icon: FiUsers,
            increase: "+28 this week",
            iconColor: "text-[#3B82F6]",
            iconBg: "bg-[#EFF6FF]",
        },
        {
            title: "Average Rating",
            count: "4.8",
            icon: FiStar,
            increase: "+0.2",
            iconColor: "text-[#F59E0B]",
            iconBg: "bg-[#FFFBEB]",
        },
        {
            title: "Course Completion",
            count: "76%",
            icon: FiTrendingUp,
            increase: "+4%",
            iconColor: "text-[#8B5CF6]",
            iconBg: "bg-[#F5F3FF]",
        },
    ];

    return (
        <div className="p-6">
            <PageHeading title="Instructor Dashboard" subtitle="Manage your assigned courses and track student progress" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  my-6 gap-6">
                {
                    dashboardCards.map((card, index) => (
                        <DashboardCard key={index} title={card.title} count={card.count} icon={card.icon} increase={card.increase} iconColor={card.iconColor} iconBg={card.iconBg} />
                    ))
                }
            </div>

            <div className="">

            </div>
        </div>
    );
};

export default InstructorDashboard;