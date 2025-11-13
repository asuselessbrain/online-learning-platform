import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Providers/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import { use } from 'react';

const MyEnrollments = () => {
    const { user } = use(AuthContext);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEnrollments = async () => {
            if (!user?.email) return;
            try {
                setLoading(true);
                const res = await axios.get(`https://online-learning-platform-backend-two.vercel.app/api/v1/my-enrollments?studentEmail=${user.email}`);
                setEnrollments(res.data.data);
                setError(null);
            } catch {
                setError('Failed to load enrollments');
            } finally {
                setLoading(false);
            }
        };
        fetchEnrollments();
    }, [user]);

    const handleUnenroll = async (courseId) => {
        try {
            await axios.delete('https://online-learning-platform-backend-two.vercel.app/api/v1/unenroll', {
                data: { studentEmail: user.email, courseId }
            });
            setEnrollments(enrollments.filter(e => e.courseId._id !== courseId));
            toast.success('Unenrolled successfully');
        } catch {
            toast.error('Failed to unenroll');
        }
    };

    if (!user) return <div className="min-h-screen flex items-center justify-center"><p>Please login to view your enrollments</p></div>;
    if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading enrollments...</p></div>;
    if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">My Enrollments</h1>
                    <p className="text-gray-600">Courses you've enrolled in.</p>
                </div>

                {enrollments.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">You haven't enrolled in any courses yet.</p>
                        <Link to="/courses" className="text-[#309255] hover:underline mt-2 inline-block">
                            Browse courses
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enrollments.map(enrollment => (
                            <div key={enrollment._id} className="bg-white border border-[rgba(48,146,85,0.2)] hover:border-[#309255] rounded-xl p-6 transition-all duration-700">
                                <img 
                                    src={enrollment.courseId.thumbnail} 
                                    alt={enrollment.courseId.title} 
                                    className="h-48 w-full object-cover rounded-xl mb-4" 
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{enrollment.courseId.title}</h3>
                                <p className="text-gray-600 mb-2">{enrollment.courseId.category}</p>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[#309255] font-semibold">${enrollment.courseId.price}</span>
                                    <span className={`px-2 py-1 rounded text-sm ${
                                        enrollment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        enrollment.status === 'enrolled' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {enrollment.status}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Link 
                                        to={`/courses/${enrollment.courseId._id}`}
                                        className="flex-1 bg-[#309255] hover:bg-[#267a46] text-white text-center py-2 px-4 rounded-lg transition duration-200"
                                    >
                                        View Course
                                    </Link>
                                    <button 
                                        onClick={() => handleUnenroll(enrollment.courseId._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200"
                                    >
                                        Unenroll
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyEnrollments;