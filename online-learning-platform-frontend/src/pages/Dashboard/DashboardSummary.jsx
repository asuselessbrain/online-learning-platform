import React, { useState, useEffect } from "react";
import { FiX, FiBarChart2, FiMail, FiCheckCircle, FiClock, FiTrendingUp, FiStar, FiDollarSign, FiUserPlus, FiUser } from "react-icons/fi";
import { animate } from "framer-motion";
import axios from "axios";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
    Cell,
} from "recharts";



const parseNumeric = (str) => {
    if (typeof str === 'number') return { value: str, prefix: '', suffix: '' };
    const s = String(str).trim();
    const prefixMatch = s.match(/^[^0-9+-.]+/);
    const suffixMatch = s.match(/[^0-9+-.]+$/);
    const prefix = prefixMatch ? prefixMatch[0] : '';
    const suffix = suffixMatch ? suffixMatch[0] : '';
    const numStr = s.replace(/[^0-9.-]/g, '');
    let value = parseFloat(numStr || '0');
    if (/k$/i.test(suffix)) value = value * 1000;
    return { value: isNaN(value) ? 0 : value, prefix, suffix };
};

const Counter = ({ raw = 0, duration = 1.2, decimals = 0 }) => {
    const [display, setDisplay] = useState(0);
    const { value, prefix, suffix } = parseNumeric(raw);

    useEffect(() => {
        const controls = animate(display, value, {
            duration,
            onUpdate(v) {
                setDisplay(Number(v.toFixed(decimals)));
            },
        });
        return () => controls.stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString();
    return <span>{prefix}{formatted}{suffix}</span>;
};

const DashboardSummary = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [totalEnrolled, setTotalEnrolled] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState("$0");
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [messages] = useState({ unread: 5, total: 24 });
    const [completions] = useState({ count: 42, percent: 8.4 });
    const [categoriesData, setCategoriesData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);

    const chartColors = ['#34d399', '#60a5fa', '#f59e0b', '#f97316'];

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);

                const coursesRes = await axios.get('https://online-learning-platform-backend-two.vercel.app/api/v1/courses');
                const courses = coursesRes.data.data || [];
                setTotalCourses(courses.length);

                const categoryStats = {};
                courses.forEach(course => {
                    if (course.category) {
                        categoryStats[course.category] = (categoryStats[course.category] || 0) + 1;
                    }
                });
                const categoriesArray = Object.entries(categoryStats).map(([name, count]) => ({
                    name,
                    count
                }));
                setCategoriesData(categoriesArray);

                const enrollmentStatsRes = await axios.get('https://online-learning-platform-backend-two.vercel.app/api/v1/stats');
                const enrollmentStats = enrollmentStatsRes.data.data;
                setTotalEnrolled(enrollmentStats.total);

                const ratingStatsRes = await axios.get('https://online-learning-platform-backend-two.vercel.app/api/v1/reviews/overall-stats');
                const ratingStats = ratingStatsRes.data.data;
                setAverageRating(ratingStats.averageRating);
                setTotalReviews(ratingStats.totalReviews);

                setTotalUsers(4820); 
                setTotalEarnings("$12.4k");

                const monthlyStatsRes = await axios.get('https://online-learning-platform-backend-two.vercel.app/api/v1/monthly-stats?months=6');
                setMonthlyData(monthlyStatsRes.data.data);

            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="bg-linear-to-b from-[#e7f8ee] to-white p-4 sm:p-6 font-sans text-gray-900 min-h-[calc(100vh-48px)] m-6 rounded-xl">
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">Loading dashboard data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-linear-to-b from-[#e7f8ee] to-white p-4 sm:p-6 font-sans text-gray-900 min-h-[calc(100vh-48px)] m-6 rounded-xl">
                <div className="flex items-center justify-center h-64">
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-linear-to-b from-[#e7f8ee] to-white p-4 sm:p-6 font-sans text-gray-900 min-h-[calc(100vh-48px)] m-6 rounded-xl">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#309255]">Dashboard</h1>
                    <p className="text-sm text-gray-500">Overview of platform activity</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="bg-[#309255] text-white rounded-lg px-3 py-2 font-semibold ml-3">Create Course</button>
                </div>
            </header>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">

                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-md bg-[#309255]/10 text-[#309255]"><FiUserPlus className="text-lg" /></div>
                    <div>
                        <div className="text-sm text-gray-500">Total Enrolled</div>
                        <div className="text-lg font-bold text-gray-900"><Counter raw={totalEnrolled} /></div>
                        <div className="text-xs text-gray-400">across all courses</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-md bg-[#309255]/10 text-[#309255]"><FiUserPlus className="text-lg" /></div>
                    <div>
                        <div className="text-sm text-gray-500">Courses Added</div>
                        <div className="text-lg font-bold text-gray-900"><Counter raw={totalCourses} /></div>
                        <div className="text-xs text-gray-400">created this portal</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-md bg-[#309255]/10 text-[#309255]"><FiStar className="text-lg" /></div>
                    <div>
                        <div className="text-sm text-gray-500">Average Rating</div>
                        <div className="text-lg font-bold text-gray-900"><Counter raw={Number(averageRating)} decimals={1} /></div>
                        <div className="text-xs text-gray-400">average across top courses</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-md bg-[#309255]/10 text-[#309255]"><FiDollarSign className="text-lg" /></div>
                    <div>
                        <div className="text-sm text-gray-500">Total Earnings</div>
                        <div className="text-lg font-bold text-gray-900"><Counter raw={totalEarnings} /></div>
                        <div className="text-xs text-gray-400">for selected period</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-md bg-[#309255]/10 text-[#309255]"><FiUserPlus className="text-lg" /></div>
                    <div>
                        <div className="text-sm text-gray-500">Total Users</div>
                        <div className="text-lg font-bold text-gray-900"><Counter raw={totalUsers} /></div>
                        <div className="text-xs text-gray-400">registered on platform</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-md bg-[#309255]/10 text-[#309255]"><FiStar className="text-lg" /></div>
                    <div>
                        <div className="text-sm text-gray-500">Total Reviews</div>
                        <div className="text-lg font-bold text-gray-900"><Counter raw={totalReviews} /></div>
                        <div className="text-xs text-gray-400">across all courses</div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-md bg-[#309255]/10 text-[#309255]"><FiMail className="text-lg" /></div>
                    <div>
                        <div className="text-sm text-gray-500">Messages</div>
                        <div className="text-lg font-bold text-gray-900">{messages.unread} unread</div>
                        <div className="text-xs text-gray-400">{messages.total} total</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-md bg-[#309255]/10 text-[#309255]"><FiCheckCircle className="text-lg" /></div>
                    <div>
                        <div className="text-sm text-gray-500">Completions</div>
                        <div className="text-lg font-bold text-gray-900">{completions.count}</div>
                        <div className="text-xs text-gray-400">+{completions.percent}% this period</div>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="font-semibold mb-2 text-gray-800">Courses by category</div>
                    <div style={{ width: '100%', height: 220 }}>
                        <ResponsiveContainer>
                            <BarChart data={categoriesData} layout="vertical" margin={{ left: 0 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={140} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#309255">
                                    {categoriesData.map((entry, idx) => (
                                        <Cell key={`cell-${idx}`} fill={chartColors[idx % chartColors.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="font-semibold mb-2 text-gray-800">Monthly enrollments</div>
                    <div style={{ width: '100%', height: 220 }}>
                        <ResponsiveContainer>
                            <AreaChart data={monthlyData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#34d399" stopOpacity={0.6} />
                                        <stop offset="100%" stopColor="#34d399" stopOpacity={0.08} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="value" stroke="#059669" fill="url(#colorValue)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DashboardSummary;