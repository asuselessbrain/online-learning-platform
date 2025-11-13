import { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../../Providers/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const MyProfile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [enrollments, setEnrollments] = useState([]);
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        displayName: '',
        photoURL: ''
    });

    const fetchUserData = useCallback(async () => {
        if (!user?.email) return;

        try {
            setLoading(true);
            const enrollmentsRes = await axios.get(`https://online-learning-platform-backend-two.vercel.app/api/v1/my-enrollments?studentEmail=${user.email}`);
            setEnrollments(enrollmentsRes.data.data);

            const coursesRes = await axios.get(`https://online-learning-platform-backend-two.vercel.app/api/v1/courses/my-added-courses?instructorEmail=${user.email}`);
            setMyCourses(coursesRes.data.data);
        // eslint-disable-next-line no-unused-vars
        } catch(err) {
            toast.error('Failed to load profile data');
        } finally {
            setLoading(false);
        }
    }, [user?.email]);

    useEffect(() => {
        if (user) {
            setFormData({
                displayName: user.displayName || '',
                photoURL: user.photoURL || ''
            });
            fetchUserData();
        }
    }, [user, fetchUserData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await updateUser({
                displayName: formData.displayName,
                photoURL: formData.photoURL
            });
            setEditing(false);
            toast.success('Profile updated successfully!');
        } catch {
            toast.error('Failed to update profile');
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Please login to view your profile</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-[#309255] text-white p-6">
                        <div className="flex items-center space-x-4">
                            <img
                                src={user.photoURL }
                                alt="Profile"
                                className="w-20 h-20 rounded-full border-4 border-white"
                            />
                            <div>
                                <h1 className="text-2xl font-bold">{user.displayName || 'User'}</h1>
                                <p className="text-[#e7f8ee]">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-[#e7f8ee] rounded-lg p-6 text-center">
                                <div className="text-3xl font-bold text-[#309255] mb-2">{enrollments.length}</div>
                                <p className="text-gray-600">Enrolled Courses</p>
                            </div>
                            <div className="bg-[#e7f8ee] rounded-lg p-6 text-center">
                                <div className="text-3xl font-bold text-[#309255] mb-2">{myCourses.length}</div>
                                <p className="text-gray-600">Created Courses</p>
                            </div>
                            <div className="bg-[#e7f8ee] rounded-lg p-6 text-center">
                                <div className="text-3xl font-bold text-[#309255] mb-2">
                                    {enrollments.filter(e => e.status === 'completed').length}
                                </div>
                                <p className="text-gray-600">Completed Courses</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
                                <button
                                    onClick={() => setEditing(!editing)}
                                    className="bg-[#309255] hover:bg-[#267a46] text-white px-4 py-2 rounded-lg transition duration-200"
                                >
                                    {editing ? 'Cancel' : 'Edit Profile'}
                                </button>
                            </div>

                            {editing ? (
                                <form onSubmit={handleUpdateProfile} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Display Name
                                        </label>
                                        <input
                                            type="text"
                                            name="displayName"
                                            value={formData.displayName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309255]"
                                            placeholder="Enter your display name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Profile Picture URL
                                        </label>
                                        <input
                                            type="url"
                                            name="photoURL"
                                            value={formData.photoURL}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309255]"
                                            placeholder="Enter profile picture URL"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            type="submit"
                                            className="bg-[#309255] hover:bg-[#267a46] text-white px-6 py-2 rounded-lg transition duration-200"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditing(false)}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition duration-200"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <p className="text-gray-900">{user.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Display Name</label>
                                        <p className="text-gray-900">{user.displayName || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Account Created</label>
                                        <p className="text-gray-900">
                                            {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Enrollments</h2>
                            {loading ? (
                                <p>Loading...</p>
                            ) : enrollments.length > 0 ? (
                                <div className="space-y-4">
                                    {enrollments.slice(0, 5).map(enrollment => (
                                        <div key={enrollment._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <h3 className="font-medium text-gray-900">{enrollment.courseId.title}</h3>
                                                <p className="text-sm text-gray-600">Enrolled on {new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-sm ${
                                                enrollment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                enrollment.status === 'enrolled' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {enrollment.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">No enrollments yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;