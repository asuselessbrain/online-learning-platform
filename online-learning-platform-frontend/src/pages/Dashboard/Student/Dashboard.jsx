import { FiAward, FiBookOpen, FiClock, FiTrendingUp } from "react-icons/fi";
import DashboardCard from "../shared/DashboardCard";
import PageHeading from "../shared/PageHeading";
import CourseCard from "../shared/CourseCard";

const Dashboard = () => {
    const dashboardCards = [
        {
            title: "Enrolled Courses",
            count: "6",
            icon: FiBookOpen,
            increase: "+1 this month",
            iconColor: "text-[#309255]",
            iconBg: "bg-[#eef6f1]",
        },
        {
            title: "Learning Hours",
            count: "124",
            icon: FiClock,
            increase: "+12 this week",
            iconColor: "text-[#3B82F6]",
            iconBg: "bg-[#EFF6FF]",
        },
        {
            title: "Certificates Earned",
            count: "3",
            icon: FiAward,
            increase: "+1 this month",
            iconColor: "text-[#F59E0B]",
            iconBg: "bg-[#FFFBEB]",
        },
        {
            title: "Average Progress",
            count: "68%",
            icon: FiTrendingUp,
            increase: "+8%",
            iconColor: "text-[#8B5CF6]",
            iconBg: "bg-[#F5F3FF]",
        },
    ];

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
    return (
        <div className="p-6">
            <PageHeading title="Student Dashboard" subtitle="Track your learning progress and achievements" />
            <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                    dashboardCards.map((card, index) => (<DashboardCard key={index} title={card.title} count={card.count} icon={card.icon} increase={card.increase} iconColor={card.iconColor} iconBg={card.iconBg} />))
                }

            </div>

            <div className="rounded-xl p-6 bg-white">
                <p className="mb-2">Continue Learning</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        courseProgressData.map(course => (
                            <CourseCard key={course.id} thumbnail={course.thumbnail} title={course.title} instructor={course.instructor} progress={course.progress} />
                        ))
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Dashboard;