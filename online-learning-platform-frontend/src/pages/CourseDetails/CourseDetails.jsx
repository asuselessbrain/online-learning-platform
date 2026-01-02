import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../../Providers/AuthContext';
import { toast } from 'react-toastify';
import Loading from '../../Components/Shared/Loading';

const CourseDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enrollmentStatus, setEnrollmentStatus] = useState(null);
    const [enrolling, setEnrolling] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [ratingStats, setRatingStats] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewForm, setReviewForm] = useState({ rating: 5, review: '' });
    const [submittingReview, setSubmittingReview] = useState(false);
    const [userReview, setUserReview] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`https://online-learning-platform-backend-two.vercel.app/api/v1/courses/${id}`);
                setCourse(res.data.data);
                setRatingStats(res.data.data.ratingStats);
                setError(null);
            } catch {
                setError('Failed to load course details');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchCourse();
    }, [id]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`https://online-learning-platform-backend-two.vercel.app/api/v1/reviews/course/${id}`);
                setReviews(res.data.data);
            } catch {
                setReviews([]);
            }
        };
        if (id) fetchReviews();
    }, [id]);


    useEffect(() => {
        const fetchEnrollmentStatus = async () => {
            if (user?.email && id) {
                try {
                    const res = await axios.get(`https://online-learning-platform-backend-two.vercel.app/api/v1/enrollments/${user.email}/${id}`);
                    setEnrollmentStatus(res.data.data);
                } catch {
                    setEnrollmentStatus(null);
                }
            }
        };
        fetchEnrollmentStatus();
    }, [user?.email, id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user?.email) {
            toast.error('Please login to submit a review');
            return;
        }

        setSubmittingReview(true);
        try {
            const reviewData = {
                courseId: id,
                rating: reviewForm.rating,
                review: reviewForm.review,
                studentEmail: user.email
            };

            if (userReview) {
                await axios.put('https://online-learning-platform-backend-two.vercel.app/api/v1/reviews', reviewData);
                toast.success('Review updated successfully');
            } else {
                await axios.post('https://online-learning-platform-backend-two.vercel.app/api/v1/reviews', reviewData);
                toast.success('Review submitted successfully');
            }
            const [reviewsRes, userReviewRes] = await Promise.all([
                axios.get(`https://online-learning-platform-backend-two.vercel.app/api/v1/reviews/course/${id}`),
                axios.get(`https://online-learning-platform-backend-two.vercel.app/api/v1/reviews/my-review/${id}?studentEmail=${user.email}`)
            ]);

            setReviews(reviewsRes.data.data);
            setUserReview(userReviewRes.data.data);
            setShowReviewForm(false);
            setReviewForm({ rating: 5, review: '' });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmittingReview(false);
        }
    };

    const handleEnroll = async () => {
        if (!user?.email) {
            toast.error('Please login to enroll');
            return;
        }
        setEnrolling(true);
        try {
            if (enrollmentStatus) {
                await axios.delete('https://online-learning-platform-backend-two.vercel.app/api/v1/unenroll', {
                    data: { studentEmail: user.email, courseId: id }
                });
                setEnrollmentStatus(null);
                toast.success('Unenrolled successfully');
            } else {
                const res = await axios.post('https://online-learning-platform-backend-two.vercel.app/api/v1/enroll', {
                    studentEmail: user.email,
                    courseId: id
                });
                setEnrollmentStatus(res.data.data);
                toast.success('Enrolled successfully');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update enrollment');
        } finally {
            setEnrolling(false);
        }
    };

    if (loading) return <Loading message="Loading course details..." fullScreen={true} />;
    if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="relative">
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 bg-opacity-40 flex items-end">
                            <div className="p-6 text-white">
                                <h1 className="text-3xl sm:text-4xl font-bold mb-2">{course.title}</h1>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-[#309255] px-3 py-1 rounded-full text-sm font-medium">
                                        {course.category}
                                    </span>
                                    <span className="bg-[#e7f8ee] text-[#309255] px-3 py-1 rounded-full text-sm font-medium">
                                        {course.level}
                                    </span>
                                    <span className="bg-[#e7f8ee] text-[#309255] px-3 py-1 rounded-full text-sm font-medium">
                                        {course.duration}
                                    </span>
                                </div>
                                {ratingStats && ratingStats.totalReviews > 0 && (
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span key={star} className={`text-lg ${star <= ratingStats.averageRating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-white text-sm">
                                            {ratingStats.averageRating} ({ratingStats.totalReviews} reviews)
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold mb-3 text-gray-800">About This Course</h2>
                                    <p className="text-gray-600 leading-relaxed">{course.description}</p>
                                </div>

                                {course.shortDescription && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Short Description</h3>
                                        <p className="text-gray-600">{course.shortDescription}</p>
                                    </div>
                                )}

                                {course.tags && course.tags.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {course.tags.map((tag, index) => (
                                                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                            <div className="lg:col-span-1">
                                <div className="bg-[#e7f8ee] rounded-lg p-6 sticky top-6">
                                    <div className="text-center mb-6">
                                        <div className="text-3xl font-bold text-[#309255] mb-2">
                                            ${course.price?.toString() || '0'}
                                        </div>
                                        <p className="text-gray-600 text-sm">Course Fee</p>
                                    </div>

                                    <button
                                        onClick={handleEnroll}
                                        disabled={enrolling || course?.instructorEmail === user?.email || enrollmentStatus}
                                        className={`w-full font-semibold py-3 px-4 rounded-lg transition duration-200 mb-4 ${enrollmentStatus
                                                ? 'bg-green-500 text-white cursor-not-allowed'
                                                : course?.instructorEmail === user?.email
                                                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                                    : 'bg-[#309255] hover:bg-[#267a46] text-white'
                                            }`}
                                    >
                                        {enrolling ? 'Processing...' :
                                            course?.instructorEmail === user?.email ? 'Your Course' :
                                                enrollmentStatus ? 'Enrolled' : 'Enroll Now'}
                                    </button>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Duration:</span>
                                            <span className="font-medium">{course.duration}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Level:</span>
                                            <span className="font-medium">{course.level}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Category:</span>
                                            <span className="font-medium">{course.category}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {(course.instructorName || course.instructorEmail) && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-3 text-gray-800">About the Instructor</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={course.instructorPhoto}
                                            alt={course.instructorName || 'Instructor'}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-[#309255]"
                                        />
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800">
                                                {course.instructorName || 'Instructor'}
                                            </h4>
                                            {course.instructorEmail && (
                                                <p className="text-gray-600 text-sm">
                                                    {course.instructorEmail}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Reviews & Ratings</h3>
                                {enrollmentStatus && !userReview && (
                                    <button
                                        onClick={() => setShowReviewForm(!showReviewForm)}
                                        className="bg-[#309255] hover:bg-[#267a46] text-white px-4 py-2 rounded-lg text-sm font-medium"
                                    >
                                        Write a Review
                                    </button>
                                )}
                                {userReview && (
                                    <button
                                        onClick={() => setShowReviewForm(!showReviewForm)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                    >
                                        Edit Review
                                    </button>
                                )}
                            </div>

                            {showReviewForm && enrollmentStatus && (
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <h4 className="text-md font-semibold mb-3">
                                        {userReview ? 'Edit Your Review' : 'Write a Review'}
                                    </h4>
                                    <form onSubmit={handleReviewSubmit}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Rating
                                            </label>
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                                                        className={`text-2xl ${star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
                                                    >
                                                        ★
                                                    </button>
                                                ))}
                                                <span className="ml-2 text-sm text-gray-600">
                                                    {reviewForm.rating} star{reviewForm.rating !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Review
                                            </label>
                                            <textarea
                                                value={reviewForm.review}
                                                onChange={(e) => setReviewForm(prev => ({ ...prev, review: e.target.value }))}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#309255] focus:border-transparent"
                                                rows="4"
                                                placeholder="Share your experience with this course..."
                                                required
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                disabled={submittingReview}
                                                className="bg-[#309255] hover:bg-[#267a46] text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
                                            >
                                                {submittingReview ? 'Submitting...' : userReview ? 'Update Review' : 'Submit Review'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowReviewForm(false);
                                                    setReviewForm({ rating: userReview?.rating || 5, review: userReview?.review || '' });
                                                }}
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {ratingStats && ratingStats.totalReviews > 0 && (
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-[#309255]">{ratingStats.averageRating}</div>
                                            <div className="flex items-center justify-center mb-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span key={star} className={`text-lg ${star <= ratingStats.averageRating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="text-sm text-gray-600">{ratingStats.totalReviews} reviews</div>
                                        </div>
                                        <div className="flex-1">
                                            {[5, 4, 3, 2, 1].map((star) => (
                                                <div key={star} className="flex items-center gap-2 mb-1">
                                                    <span className="text-sm w-3">{star}</span>
                                                    <span className="text-yellow-400">★</span>
                                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-yellow-400 h-2 rounded-full"
                                                            style={{ width: `${ratingStats.totalReviews > 0 ? (ratingStats.ratingDistribution[star] / ratingStats.totalReviews) * 100 : 0}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm text-gray-600 w-8">{ratingStats.ratingDistribution[star]}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                {reviews.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review this course!</p>
                                ) : (
                                    reviews.map((review) => (
                                        <div key={review._id} className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-[#309255] rounded-full flex items-center justify-center text-white font-semibold">
                                                    {review.studentEmail.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="font-semibold text-gray-800">{review.studentEmail}</span>
                                                        <div className="flex items-center">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <span key={star} className={`text-sm ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                                                    ★
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <span className="text-sm text-gray-500">
                                                            {new Date(review.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700">{review.review}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;