import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { use } from "react";
import { AuthContext } from "../../Providers/AuthContext";

const MyAddedCourses = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortDir, setSortDir] = useState("desc");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const dropdownRef = useRef(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        shortDescription: '',
        description: '',
        price: '',
        duration: '',
        level: '',
        tags: '',
        instructorName: '',
        instructorEmail: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const {user} = use(AuthContext)

    const fetchCourses = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://online-learning-platform-backend-two.vercel.app/api/v1/my-added-courses?instructorEmail=${user?.email}`);
            setCourses(res.data.data);
            setError(null);
        } catch (err) {
            console.error("Failed to load courses:", err);
            setError("Failed to load courses");
        } finally {
            setLoading(false);
        }
    }, [user?.email]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    useEffect(() => {
        if (!showFilters) return;
        const onDocClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowFilters(false);
            }
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [showFilters]);

    const categories = useMemo(() => {
        const set = new Set();
        courses.forEach((course) => {
            if (course.category) set.add(course.category);
        });
        return [...set];
    }, [courses]);

    const levels = useMemo(() => {
        const set = new Set();
        courses.forEach((course) => {
            if (course.level) set.add(course.level);
        });
        return [...set];
    }, [courses]);

    const filteredCourses = useMemo(() => {
        let filtered = [...courses];

        if (selectedCategory) {
            filtered = filtered.filter(
                (course) => course.category === selectedCategory
            );
        }

        if (selectedLevel) {
            filtered = filtered.filter((course) => course.level === selectedLevel);
        }

        if (searchQuery.trim() !== "") {
            const regex = new RegExp(searchQuery.trim(), "i");
            filtered = filtered.filter(
                (course) =>
                    regex.test(course.title) || regex.test(course.shortDescription)
            );
        }

        filtered.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortDir === "asc" ? dateA - dateB : dateB - dateA;
        });

        return filtered;
    }, [courses, selectedCategory, selectedLevel, searchQuery, sortDir]);

    useEffect(() => {
        setPage(1);
    }, [selectedCategory, selectedLevel, searchQuery, sortDir]);

    const totalPages = Math.max(1, Math.ceil(filteredCourses.length / limit));
    const paginatedCourses = useMemo(() => {
        const start = (page - 1)
        return filteredCourses.slice(start, start + limit);
    }, [filteredCourses, page, limit]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`https://online-learning-platform-backend-two.vercel.app/api/v1/courses/${id}`);

            if (res.data.success) {
                toast.success("Course deleted successfully");
                await fetchCourses();
            }
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            toast.error("Failed to delete course");
        }
    };

    const handleEdit = (course) => {
        setEditingCourse(course);
        setFormData({
            title: course.title || '',
            category: course.category || '',
            shortDescription: course.shortDescription || '',
            description: course.description || '',
            price: course.price?.toString() || '',
            duration: course.duration || '',
            level: course.level || '',
            tags: course.tags?.join(', ') || '',
            instructorName: course.instructorName || '',
            instructorEmail: course.instructorEmail || '',
        });
        setFormErrors({});
        setModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!formData.title.trim()) errors.title = "Title is required.";
        if (!formData.category.trim()) errors.category = "Category is required.";
        if (!formData.shortDescription.trim()) errors.shortDescription = "Short description is required.";
        if (!formData.description.trim()) errors.description = "Full description is required.";
        if (!formData.price.trim()) errors.price = "Price is required.";
        else if (isNaN(formData.price) || Number(formData.price) <= 0) errors.price = "Price must be a positive number.";
        if (!formData.duration.trim()) errors.duration = "Duration is required.";
        if (!formData.level) errors.level = "Please select a course level.";
        if (!formData.instructorName.trim()) errors.instructorName = "Instructor name is required.";
        if (!formData.instructorEmail.trim()) errors.instructorEmail = "Instructor email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.instructorEmail)) errors.instructorEmail = "Instructor email is invalid.";

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setSaving(true);

        let thumbnailUrl = editingCourse.thumbnail || ''; // default to existing

        const fileInput = document.getElementById('edit-thumbnail');
        if (fileInput && fileInput.files[0]) {
            // Upload to Cloudinary
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);
            formData.append('upload_preset', "my_preset")

            const imgRes = await fetch('https://api.cloudinary.com/v1_1/dwduymu1l/image/upload', {
                method: "POST",
                body: formData
            })
            const resData = await imgRes.json();
            thumbnailUrl = resData.secure_url;
        }

        const updateData = {
            title: formData.title,
            category: formData.category,
            shortDescription: formData.shortDescription,
            description: formData.description,
            price: Number(formData.price),
            duration: formData.duration,
            level: formData.level,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            thumbnail: thumbnailUrl,
            instructorName: formData.instructorName,
            instructorEmail: formData.instructorEmail,
        };

        try {
            const res = await axios.put(`https://online-learning-platform-backend-two.vercel.app/api/v1/courses/${editingCourse._id}`, updateData, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.data.success) {
                toast.success("Course updated successfully");
                setModalOpen(false);
                await fetchCourses();
            }
        // eslint-disable-next-line no-unused-vars
        } catch (_err) {
            toast.error("Failed to update course");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p>{error}</p>;


    return (
        <>
            <div className="p-6 bg-gray-50 min-h-screen">
                <h2 className="text-2xl font-semibold mb-4 text-[#309255]">My Courses</h2>

                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                    <div className="flex-1">
                        <label className="sr-only">Search</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search courses by title or description..."
                                className="w-full border border-gray-200 rounded-md p-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#309255]/30"
                            />
                            <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="11" cy="11" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowFilters((s) => !s)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white text-[#309255] border-[#309255] shadow-sm hover:bg-[#309255]/10"
                            aria-expanded={showFilters}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#309255" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h18M6 12h12M10 19h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <span className="font-medium">Filters</span>
                        </button>

                        {showFilters && (
                            <div ref={dropdownRef} className="absolute left-0 mt-2 w-72 bg-white border border-gray-200 shadow-lg rounded-lg p-4 z-20">
                                <div className="mb-3">
                                    <label className="block text-sm font-medium mb-1">Category</label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full border border-gray-200 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#309255]/30"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Level</label>
                                    <select
                                        value={selectedLevel}
                                        onChange={(e) => setSelectedLevel(e.target.value)}
                                        className="w-full border border-gray-200 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#309255]/30"
                                    >
                                        <option value="">All Levels</option>
                                        {levels.map((lvl) => (
                                            <option key={lvl} value={lvl}>{lvl}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="mr-2 font-medium">Sort by Date:</label>
                        <select
                            value={sortDir}
                            onChange={(e) => setSortDir(e.target.value)}
                            className="border border-gray-200 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#309255]/30"
                        >
                            <option value="asc">Oldest First</option>
                            <option value="desc">Newest First</option>
                        </select>
                    </div>
                </div>

                {filteredCourses.length === 0 ? (
                    <p>No courses found.</p>
                ) : (
                    <>
                        <div className="md:hidden">
                            <div className="space-y-4">
                                {paginatedCourses.map((course) => (
                                    <div key={course._id} className="bg-white rounded-lg shadow p-4">
                                        <div className="flex items-start gap-4">
                                            <img src={course.thumbnail} alt={course.title || 'Course'} className="w-28 h-16 object-cover rounded-md" />
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <h3 className="text-sm font-medium text-gray-900">{course.title}</h3>
                                                    <div className="text-sm text-gray-500">${(course.price ?? 0).toString()}</div>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">{course.category || '-'}</p>
                                                <p className="text-sm text-gray-700 mt-2">{(course.shortDescription || course.shortDesc || '').slice(0, 100)}{(course.shortDescription || course.shortDesc || '').length > 100 ? '...' : ''}</p>
                                                <div className="mt-3 flex items-center gap-2">
                                                    <a href={`#/courses/${course._id}`} className="text-xs px-2 py-1 rounded border border-[#309255] text-[#309255]">View</a>
                                                    <button onClick={() => handleEdit(course)} className="text-xs px-2 py-1 rounded bg-[#309255] text-white">Edit</button>
                                                    <button onClick={() => handleDelete(course._id)} className="text-xs px-2 py-1 rounded border border-red-200 text-red-600">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-md border border-gray-100">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead style={{ backgroundColor: '#e7f8ee' }}>
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Thumbnail</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Title</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Category</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Short description</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Level</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Duration</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {paginatedCourses.map((course) => (
                                        <tr key={course._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <img
                                                    src={course?.thumbnail}
                                                    alt={course.title || 'Course'}
                                                    className="w-40 h-24 object-cover rounded-md border"
                                                />
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <div className="text-sm text-gray-700">{course.category || '-'}</div>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <div className="text-sm text-gray-700">{(course.shortDescription || course.shortDesc || '').slice(0, 120)}{(course.shortDescription || course.shortDesc || '').length > 120 ? '...' : ''}</div>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <div className="text-sm text-gray-700">${(course.price ?? 0).toString()}</div>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <div className="text-sm text-gray-700">{course.level || '-'}</div>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <div className="text-sm text-gray-700">{course.duration || '-'}</div>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <div className="flex items-center gap-2">
                                                    <Link to={`/courses/${course._id}`} className="text-sm px-3 py-1 rounded border border-[#309255] text-[#309255] hover:bg-[#309255] hover:text-white transition">View</Link>
                                                    <button onClick={() => handleEdit(course)} className="text-sm px-3 py-1 rounded bg-[#309255] text-white hover:opacity-95 transition">Edit</button>
                                                    <button onClick={() => handleDelete(course._id)} className="text-sm px-3 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50 transition">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={8} className="bg-white p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm text-gray-600">Showing {paginatedCourses.length} of {filteredCourses.length}</div>
                                                <div className="flex items-center gap-2">
                                                    <label className="text-sm text-gray-600">Per page</label>
                                                    <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }} className="p-1 border border-gray-200 rounded shadow-sm">
                                                        <option value={5}>5</option>
                                                        <option value={10}>10</option>
                                                        <option value={20}>20</option>
                                                    </select>
                                                    <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded text-[#309255] hover:bg-[#309255] hover:text-white transition disabled:opacity-50">Prev</button>
                                                    <span className="px-3 text-sm text-gray-700">Page {page} of {totalPages}</span>
                                                    <button disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded text-[#309255] hover:bg-[#309255] hover:text-white transition disabled:opacity-50">Next</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </>
                )}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-4 text-[#309255]">Edit Course</h3>
                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Title</label>
                                        <input
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]"
                                        />
                                        {formErrors.title && <div className="text-xs text-red-600 mt-1">{formErrors.title}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Category</label>
                                        <input
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]"
                                        />
                                        {formErrors.category && <div className="text-xs text-red-600 mt-1">{formErrors.category}</div>}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Short description</label>
                                    <input
                                        value={formData.shortDescription}
                                        onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                        className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]"
                                    />
                                    {formErrors.shortDescription && <div className="text-xs text-red-600 mt-1">{formErrors.shortDescription}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full description</label>
                                    <textarea
                                        rows={6}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Price (BDT)</label>
                                        <input
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]"
                                        />
                                        {formErrors.price && <div className="text-xs text-red-600 mt-1">{formErrors.price}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                                        <input
                                            placeholder="e.g. 4h 30m"
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]"
                                        />
                                        {formErrors.duration && <div className="text-xs text-red-600 mt-1">{formErrors.duration}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Level</label>
                                        <select
                                            value={formData.level}
                                            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                            className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]"
                                        >
                                            <option value="">Select level</option>
                                            {levels.map((l) => <option key={l} value={l}>{l}</option>)}
                                        </select>
                                        {formErrors.level && <div className="text-xs text-red-600 mt-1">{formErrors.level}</div>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                                        <input
                                            id="edit-thumbnail"
                                            type="file"
                                            accept="image/*"
                                            className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                                        <input
                                            value={formData.tags}
                                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Instructor Name</label>
                                        <input
                                            value={formData.instructorName}
                                            onChange={(e) => setFormData({ ...formData, instructorName: e.target.value })}
                                            className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]"
                                        />
                                        {formErrors.instructorName && <div className="text-xs text-red-600 mt-1">{formErrors.instructorName}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Instructor Email</label>
                                        <input
                                            value={formData.instructorEmail}
                                            onChange={(e) => setFormData({ ...formData, instructorEmail: e.target.value })}
                                            className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]"
                                        />
                                        {formErrors.instructorEmail && <div className="text-xs text-red-600 mt-1">{formErrors.instructorEmail}</div>}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(false)}
                                        className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-4 py-2 rounded bg-[#309255] hover:bg-[#267a46] text-white font-semibold disabled:opacity-50"
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyAddedCourses;
