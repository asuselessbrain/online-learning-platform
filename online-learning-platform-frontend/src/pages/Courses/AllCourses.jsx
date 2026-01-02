import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Providers/AuthContext';
import CourseCard from '../../Components/Shared/CourseCard';
import ReadyToStart from '../../Components/Home/ReadyToStart';
import Loading from '../../Components/Shared/Loading';

const AllCourses = () => {
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sortDir, setSortDir] = useState('desc');
    const [categories, setCategories] = useState([]);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, category, sortDir]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (search) params.append('q', search);
                if (category) params.append('category', category);
                params.append('sortBy', 'createdAt');
                params.append('sortDir', sortDir);
                params.append('page', currentPage.toString());
                params.append('limit', itemsPerPage.toString());
                
                const res = await axios.get(`https://online-learning-platform-backend-two.vercel.app/api/v1/courses?${params.toString()}`);
                setCourses(res.data.data);
                setTotalItems(res.data.meta.total);
                setTotalPages(Math.ceil(res.data.meta.total / itemsPerPage));
                
                // Extract categories from all courses (not just current page)
                const allCoursesRes = await axios.get(`https://online-learning-platform-backend-two.vercel.app/api/v1/courses?limit=1000`);
                const cats = new Set();
                (allCoursesRes.data.data || []).forEach(c => { if (c.category) cats.add(c.category); });
                setCategories(Array.from(cats).sort());
                
                setError(null);
            } catch {
                setError('Failed to load courses');
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [search, category, sortDir, currentPage, itemsPerPage]);

    if (loading) return <Loading message="Loading courses..." fullScreen={true} />;
    if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">All Courses</h1>
                    <p className="text-gray-600">Explore our wide range of courses and start learning today.</p>
                </div>
                
                <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

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
                
                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-8 bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-700">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} courses
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            
                            {/* Page numbers */}
                            <div className="flex space-x-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                                                currentPage === pageNum
                                                    ? 'bg-[#309255] text-white'
                                                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>
                            
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <ReadyToStart />
        </div>
    );
};

export default AllCourses;