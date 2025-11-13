import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Providers/AuthContext';
import CourseCard from '../../Components/Shared/CourseCard';
import ReadyToStart from '../../Components/Home/ReadyToStart';

const AllCourses = () => {
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sortDir, setSortDir] = useState('desc');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (search) params.append('q', search);
                if (category) params.append('category', category);
                params.append('sortBy', 'createdAt');
                params.append('sortDir', sortDir);
                
                const res = await axios.get(`https://online-learning-platform-backend-two.vercel.app/api/v1/courses?${params.toString()}`);
                setCourses(res.data.data);
                // derive categories from fetched courses
                const cats = new Set();
                (res.data.data || []).forEach(c => { if (c.category) cats.add(c.category); });
                setCategories(Array.from(cats).sort());
                setError(null);
            } catch {
                setError('Failed to load courses');
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [search, category, sortDir]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading courses...</p></div>;
    if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">All Courses</h1>
                    <p className="text-gray-600">Explore our wide range of courses and start learning today.</p>
                </div>
                
                {/* Filters and Search */}
                <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search Input */}
                        <div>
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                                Search Courses
                            </label>
                            <input
                                type="text"
                                id="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by title or category..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309255] focus:border-transparent"
                            />
                        </div>
                        
                        {/* Category Filter */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309255] focus:border-transparent"
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Sort Direction */}
                        <div>
                            <label htmlFor="sortDir" className="block text-sm font-medium text-gray-700 mb-1">
                                Order
                            </label>
                            <select
                                id="sortDir"
                                value={sortDir}
                                onChange={(e) => setSortDir(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309255] focus:border-transparent"
                            >
                                <option value="desc">Newest First</option>
                                <option value="asc">Oldest First</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                        <CourseCard key={course._id} course={course} user={user} />
                    ))}
                </div>
            </div>
            <ReadyToStart />
        </div>
    );
};

export default AllCourses;