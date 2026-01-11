import { useState, useEffect, useContext, use } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../../Providers/AuthContext';
import { toast } from 'react-toastify';
import Loading from '../../Components/Shared/Loading';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { FiShare2, FiHeart, FiPlay, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const embedVideo = (url) => {
    if (!url) return '';
    try {
        const parsed = new URL(url);
        const host = parsed.hostname.toLowerCase();

        if (host.includes('youtube.com')) {
            const v = parsed.searchParams.get('v');
            if (v) return `https://www.youtube.com/embed/${v}`;
        }
        if (host === 'youtu.be') {
            const id = parsed.pathname.split('/').filter(Boolean)[0];
            if (id) return `https://www.youtube.com/embed/${id}`;
        }
        if (host.includes('vimeo.com')) {
            const id = parsed.pathname.split('/').filter(Boolean).pop();
            if (id) return `https://player.vimeo.com/video/${id}`;
        }
        return url;
        // eslint-disable-next-line no-unused-vars
    } catch (e) {
        return url;
    }
};

const PriceBlock = ({ course }) => {
    if (!course) return <div className="text-3xl font-bold text-[#309255] mb-2">৳ 0</div>;
    if (course.isFree) return <div className="text-3xl font-bold text-[#309255] mb-2">Free</div>;

    const original = course.price || 0;
    const discounted = course.discountedPrice ?? course.discountPrice;

    if (discounted && discounted < original) {
        return (
            <div className="mb-2">
                <div className="text-3xl font-bold text-[#309255]">৳ {discounted}</div>
                <div className="text-sm text-gray-500 line-through">৳ {original}</div>
            </div>
        );
    }

    return <div className="text-3xl font-bold text-[#309255] mb-2">৳ {original}</div>;
};

const CourseDetails = () => {
    const { id } = useParams();
    const { user } = use(AuthContext);
    const [enrollmentStatus, setEnrollmentStatus] = useState(null);
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([]);
    const [ratingStats, setRatingStats] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewForm, setReviewForm] = useState({ rating: 5, review: '' });
    const [submittingReview, setSubmittingReview] = useState(false);
    const [userReview, setUserReview] = useState(null);

    const axiosPublic = useAxios();
    const axiosSecure = useAxios()

    const { data: course, isLoading } = useQuery({
        queryKey: ['course', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/new-courses/${id}`);
            return res.data.data;
        }
    })

    const instructor = course?.instructorId && {
        name: course?.instructorId?.userId?.name,
        email: course?.instructorId?.userId?.email,
        photo: course?.instructorId?.userId?.photoUrl,
        bio: course?.instructorId?.bio,
        phone: course?.instructorId?.phoneNumber,
        expertise: course?.instructorId?.expertise || course?.instructorId?.skills || [],
        rating: course?.instructorId?.rating || course?.instructorId?.rating,
    };

    const [activeTab, setActiveTab] = useState('overview');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [openSections, setOpenSections] = useState({});

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('Course link copied to clipboard');
            // eslint-disable-next-line no-unused-vars
        } catch (e) {
            toast.error('Failed to copy link');
        }
    };

    const toggleBookmark = () => {
        setBookmarked((b) => !b);
        toast.info(bookmarked ? 'Removed from saved' : 'Saved to bookmarks');
    };

    const toggleSection = (i) => {
        setOpenSections((s) => ({ ...s, [i]: !s[i] }));
    };
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

    const { data: profile } = useQuery({
        queryKey: ['myProfile', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}/profile`);
            return res.data.data;
        },
        enabled: !!user?.email,
    })
    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => await axiosSecure.post(`/enrolment`, data),
        onSuccess: () => {
            navigate('/student/my-enrolled-courses')
            toast.success("Enrollment Successful")
        },
        onError: (error) => {
            toast.error(error.message || "Enrollment Fail")
        }
    })
    const { data: isCourseEnrolled, isLoading: isCourseEnrolledLoading } = useQuery({
        queryKey: ['isCourseEnrolled', profile?._id, course?._id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/enrolment/${profile?._id}/${course?._id}`);
            return res.data.data;
        },
        enabled: !!user?.email,
    })

    const handleEnroll = () => {
        mutate({
            userId: profile?._id,
            courseId: course?._id
        })
    }

    if (isLoading || isCourseEnrolledLoading) return <Loading message="Loading course details..." fullScreen={true} />;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-0">
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
                                <div className="flex items-center justify-between gap-4 mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-[#309255] px-3 py-1 rounded-full text-sm font-medium">
                                            {course?.category?.name || course?.category || course?.categoryId?.name || 'Category'}
                                        </span>
                                        <span className="bg-[#e7f8ee] text-[#309255] px-3 py-1 rounded-full text-sm font-medium">
                                            {course.level}
                                        </span>
                                        <span className="bg-[#e7f8ee] text-[#309255] px-3 py-1 rounded-full text-sm font-medium">
                                            {course.duration}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button onClick={() => setPreviewOpen(true)} title="Preview" className="bg-white/10 hover:bg-white/20 p-2 rounded-md transition">
                                            <FiPlay />
                                        </button>
                                        <button onClick={handleShare} title="Share" className="bg-white/10 hover:bg-white/20 p-2 rounded-md transition">
                                            <FiShare2 />
                                        </button>
                                        <button onClick={toggleBookmark} title="Save" className={`p-2 rounded-md transition ${bookmarked ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'}`}>
                                            <FiHeart className={`${bookmarked ? 'text-red-400' : ''}`} />
                                        </button>
                                    </div>
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
                        {/* Tabs */}
                        <div className="mb-6 flex items-center gap-3">
                            {['overview', 'curriculum', 'reviews'].map((t) => (
                                <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-md font-medium ${activeTab === t ? 'bg-[#309255] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                    {t === 'overview' ? 'Overview' : t === 'curriculum' ? 'Curriculum' : 'Reviews'}
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                {/* Overview Tab */}
                                {activeTab === 'overview' && (
                                    <div>
                                        <div className="mb-6">
                                            <h2 className="text-xl font-semibold mb-3 text-gray-800">About This Course</h2>
                                            <p className="text-gray-600 leading-relaxed">{course.description}</p>
                                        </div>

                                        {course.previewVideo && (
                                            <div className="mb-6">
                                                <h3 className="text-lg font-semibold mb-3 text-gray-800">Course Preview</h3>
                                                <div className="w-full bg-black rounded-lg overflow-hidden">
                                                    <iframe
                                                        title="course-preview-inline"
                                                        src={embedVideo(course.previewVideo)}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowFullScreen
                                                        className="w-full h-64 md:h-96"
                                                    ></iframe>
                                                </div>
                                            </div>
                                        )}

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

                                        {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                                            <div className="mb-6">
                                                <h3 className="text-lg font-semibold mb-2 text-gray-800">What you'll learn</h3>
                                                <ul className="list-disc pl-5 text-gray-700">
                                                    {course.learningOutcomes.map((o, i) => <li key={i}>{o}</li>)}
                                                </ul>
                                            </div>
                                        )}

                                        {course.prerequisites && course.prerequisites.length > 0 && (
                                            <div className="mb-6">
                                                <h3 className="text-lg font-semibold mb-2 text-gray-800">Prerequisites</h3>
                                                <ul className="list-disc pl-5 text-gray-700">
                                                    {course.prerequisites.map((p, i) => <li key={i}>{p}</li>)}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Curriculum Tab */}
                                {activeTab === 'curriculum' && (
                                    <div className="mb-6">
                                        <h2 className="text-xl font-semibold mb-3 text-gray-800">Curriculum</h2>
                                        {course.curriculum && course.curriculum.length > 0 ? (
                                            <div className="space-y-3">
                                                {course.curriculum.map((section, i) => (
                                                    <div key={i} className="bg-white border border-gray-100 rounded-lg p-4">
                                                        <button onClick={() => toggleSection(i)} className="w-full flex items-center justify-between">
                                                            <div className="text-left">
                                                                <div className="font-semibold">{section.title || `Section ${i + 1}`}</div>
                                                                {section.description && <div className="text-sm text-gray-500">{section.description}</div>}
                                                            </div>
                                                            <div className="ml-4">{openSections[i] ? <FiChevronUp /> : <FiChevronDown />}</div>
                                                        </button>
                                                        {openSections[i] && (
                                                            <div className="mt-3">
                                                                {(section.items || []).map((item, j) => (
                                                                    <div key={j} className="py-2 border-t border-gray-100 flex items-center justify-between">
                                                                        <div>
                                                                            <div className="font-medium">{item.title || `Item ${j + 1}`}</div>
                                                                            {item.duration && <div className="text-sm text-gray-500">{item.duration}</div>}
                                                                        </div>
                                                                        {item.type && <div className="text-xs bg-gray-100 px-2 py-1 rounded">{item.type}</div>}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-gray-500">No curriculum available.</div>
                                        )}
                                    </div>
                                )}

                            </div>
                            <div className="lg:col-span-1">
                                <div className="bg-[#e7f8ee] rounded-lg p-6 sticky top-6">
                                    <div className="text-center mb-6">
                                        <PriceBlock course={course} />
                                        <p className="text-gray-600 text-sm">Course Fee</p>
                                    </div>

                                    <button
                                        onClick={handleEnroll}
                                        disabled={isPending || isCourseEnrolled}
                                        className={`w-full font-semibold py-3 px-4 rounded-lg transition duration-200 mb-4 ${isCourseEnrolled
                                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                            : 'bg-[#309255] hover:bg-[#267a46] text-white'
                                            }`}
                                    >
                                        {isPending ? 'Processing...' :
                                            isCourseEnrolled ? 'Enrolled' : 'Enroll Now'}
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
                                            <span className="font-medium">{course?.category?.name || course?.category || course?.categoryId?.name || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Preview Modal */}
                        {previewOpen && (
                            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                                <div className="bg-white rounded-lg overflow-hidden max-w-3xl w-full">
                                    <div className="flex justify-end p-3">
                                        <button onClick={() => setPreviewOpen(false)} className="text-gray-600 hover:text-gray-900">Close</button>
                                    </div>
                                    <div className="p-4">
                                        {course.previewVideo ? (
                                            <div className="aspect-video w-full">
                                                <iframe
                                                    title="course-preview"
                                                    src={embedVideo(course.previewVideo)}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                    className="w-full h-96"
                                                />
                                            </div>
                                        ) : (
                                            <div className="p-6 text-center text-gray-600">No preview available.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {(course.instructorId) && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-3 text-gray-800">About the Instructor</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <img
                                            src={instructor?.photo || ''}
                                            alt={instructor?.name || 'Instructor'}
                                            className="w-20 h-20 rounded-full object-cover border-2 border-[#309255]"
                                        />

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between gap-4">
                                                <div>
                                                    <h4 className="text-lg font-semibold text-gray-800">{instructor?.name || 'Instructor'}</h4>
                                                    {instructor?.email && <p className="text-gray-600 text-sm">{instructor.email}</p>}
                                                    {instructor?.phone && <p className="text-gray-600 text-sm">{instructor.phone}</p>}
                                                </div>
                                                {instructor?.rating && (
                                                    <div className="text-right">
                                                        <div className="text-sm text-gray-500">Instructor Rating</div>
                                                        <div className="text-lg font-semibold text-[#309255]">{instructor.rating}</div>
                                                    </div>
                                                )}
                                            </div>

                                            {instructor?.bio && (
                                                <p className="mt-3 text-gray-700">{instructor.bio}</p>
                                            )}

                                            {(instructor?.expertise && instructor.expertise.length > 0) && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {instructor.expertise.map((exp, i) => (
                                                        <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{exp}</span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="mt-3 flex gap-3 items-center">
                                                {instructor?.email && (
                                                    <a href={`mailto:${instructor.email}`} className="text-sm text-[#309255] underline">Contact</a>
                                                )}
                                                {instructor?._id && (
                                                    <span className="text-sm text-gray-500">Profile ID: {instructor._id}</span>
                                                )}
                                            </div>
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
                                            {/* Reviews Tab */}
                                            {activeTab === 'reviews' && (
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
                                            )}
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails;


