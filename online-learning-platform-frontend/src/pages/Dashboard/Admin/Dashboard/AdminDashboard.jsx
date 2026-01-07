import { FiAward, FiBookOpen, FiClock, FiDollarSign, FiStar, FiTrendingUp, FiUserCheck, FiUsers } from "react-icons/fi";
import PageHeading from "../../shared/PageHeading";
import DashboardCard from "../../shared/DashboardCard";
import { TbCurrencyTaka } from "react-icons/tb";

const AdminDashboard = () => {
    const dashboardCards = [
        {
            title: "Total Users",
            count: "12,458",
            icon: FiUsers,
            increase: "+12%",
            iconColor: "text-[#16A34A]",
            iconBg: "bg-[#EAF7EF]",
        },
        {
            title: "Total Courses",
            count: "248",
            icon: FiBookOpen,
            increase: "+8%",
            iconColor: "text-[#2563EB]",
            iconBg: "bg-[#EFF6FF]",
        },
        {
            title: "Active Enrollments",
            count: "8,342",
            icon: FiUserCheck,
            increase: "+23%",
            iconColor: "text-[#F59E0B]",
            iconBg: "bg-[#FFFBEB]",
        },
        {
            title: "Completion Rate",
            count: "87%",
            icon: FiTrendingUp,
            increase: "+5%",
            iconColor: "text-[#8B5CF6]",
            iconBg: "bg-[#F5F3FF]",
        },
        {
            title: "Revenue (MTD)",
            count: "$45,280",
            icon: FiDollarSign,
            increase: "+18%",
            iconColor: "text-[#22C55E]",
            iconBg: "bg-[#ECFDF5]",
        },
        {
            title: "Certificates Issued",
            count: "3,126",
            icon: FiAward,
            increase: "+15%",
            iconColor: "text-[#EF4444]",
            iconBg: "bg-[#FEF2F2]",
        },
    ];

    const topPerformingCourses = [
        {
            title: "Complete Web Development Bootcamp",
            students: 1234,
            price: 12340,
            rating: 4.8,
        },
        {
            title: "Full Stack MERN Development",
            students: 980,
            price: 9850,
            rating: 4.7,
        },
        {
            title: "React & Next.js Mastery",
            students: 760,
            price: 8120,
            rating: 4.6,
        },
        {
            title: "JavaScript Fundamentals",
            students: 1540,
            price: 14200,
            rating: 4.9,
        },
        {
            title: "Backend Development with Node.js",
            students: 890,
            price: 7640,
            rating: 4.5,
        },
        {
            title: "UI/UX Design for Developers",
            students: 620,
            price: 5980,
            rating: 4.4,
        },
        {
            title: "Python for Web Development",
            students: 1100,
            price: 10450,
            rating: 4.7,
        }
    ]

    return (
        <div className="p-6">
            <PageHeading title="Admin Dashboard" subtitle="Complete platform overview and analytics" />
            <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    dashboardCards.map((card, index) => (<DashboardCard key={index} title={card.title} count={card.count} icon={card.icon} increase={card.increase} iconColor={card.iconColor} iconBg={card.iconBg} />))
                }
            </div>
            <div className="rounded-xl p-6 bg-white">
                <p className="mb-2">Top Performing Courses</p>
                <div>
                    {
                        topPerformingCourses.slice(0, 5).map(course => (<div key={course.id} className='border border-[#E5E7EB] rounded-xl p-4 mb-4 hover:border-[#309255] transition-all duration-500'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h3 className='text-xl'>{course.title}</h3>
                                    <div className='text-sm text-[#4A5565] flex items-center gap-6 my-2'>
                                        <p>{course.students} students enrolled</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="flex items-center text-[#309255]"><TbCurrencyTaka />{course.price.toLocaleString()}</p>
                                    <p className="flex items-center gap-1"><FiStar className="text-[#f0b100]" /> {course.rating}</p>
                                </div>
                            </div>
                        </div>))
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;