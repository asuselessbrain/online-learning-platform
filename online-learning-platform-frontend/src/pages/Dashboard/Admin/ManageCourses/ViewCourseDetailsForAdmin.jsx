import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router";
import useAxios from "../../../../hooks/useAxios";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2, FiExternalLink, FiCheck, FiClock, FiPlay } from "react-icons/fi";

const ViewCourseDetailsForAdmin = () => {
    const { id } = useParams();
    console.log(id)
    const axiosSecure = useAxios();
    const navigate = useNavigate();

    const { data: course, isLoading } = useQuery({
        queryKey: ["course", id],
        queryFn: async () => {
            const res = await axiosSecure(`/new-courses/${id}`);
            return res.data.data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async () => await axiosSecure.delete(`/courses/${id}`),
        onSuccess: () => {
            toast.success("Course deleted");
        },
        onError: () => toast.error("Failed to delete course"),
    });

    // const toggleMutation = useMutation({
    //     mutationFn: async (newStatus) => await axiosSecure.put(`/courses/${id}`, { status: newStatus }),
    //     onSuccess: async () => {
    //         toast.success("Course status updated");
    //         await queryClient.invalidateQueries(["course", id]);
    //         await queryClient.invalidateQueries(["adminCourses"]);
    //     },
    //     onError: () => toast.error("Failed to update status"),
    // });

    if (isLoading) return <div className="p-6">Loading...</div>;
    if (!course) return <div className="p-6">Course not found.</div>;

    const embedVideo = (url) => {
        if (!url) return "";
        try {
            const parsed = new URL(url);
            const host = parsed.hostname.toLowerCase();

            // YouTube long URL e.g. https://www.youtube.com/watch?v=ID
            if (host.includes("youtube.com")) {
                const v = parsed.searchParams.get("v");
                if (v) return `https://www.youtube.com/embed/${v}`;
            }

            // YouTube short URL e.g. https://youtu.be/ID
            if (host === "youtu.be") {
                const id = parsed.pathname.split("/").filter(Boolean)[0];
                if (id) return `https://www.youtube.com/embed/${id}`;
            }

            // Vimeo URL e.g. https://vimeo.com/ID
            if (host.includes("vimeo.com")) {
                const id = parsed.pathname.split("/").filter(Boolean).pop();
                if (id) return `https://player.vimeo.com/video/${id}`;
            }

            // If already an embed URL or unknown host, return as-is
            return url;
        // eslint-disable-next-line no-unused-vars
        } catch (e) {
            return url;
        }
    };

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="relative w-full md:w-xl rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-200 bg-white">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-44 md:h-72 object-cover" />

                    {/* subtle gradient for text legibility */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/40 via-transparent to-transparent" />

                    {/* Price badge (top-left) */}
                        <div className="absolute left-3 top-3 bg-white/95 text-sm text-gray-900 px-3 py-1 rounded-full font-semibold shadow">
                            {course.isFree ? (
                                "Free"
                            ) : course.discountPrice && course.discountPrice < course.price ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-[#0f5132]">৳ {course.discountPrice}</span>
                                    <span className="text-xs text-gray-400 line-through">৳ {course.price}</span>
                                </div>
                            ) : (
                                <span className="text-sm font-semibold">৳ {course.price}</span>
                            )}
                        </div>

                    {/* Status badge (top-right) */}
                    <div className="absolute right-3 top-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium shadow ${course.status === "published" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}`}>{course.status === "published" ? "Published" : "Draft"}</span>
                    </div>

                    {/* Play preview button (center) */}
                    <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow hover:scale-105 transition">
                        <FiPlay className="text-xl text-[#309255]" />
                    </button>

                    {/* bottom-left meta: category */}
                    <div className="absolute left-4 bottom-4 text-white">
                        <div className="text-xs md:text-sm font-medium drop-shadow">{course.category?.name || course.categoryId?.name || "Category"}</div>
                        <div className="text-sm md:text-base font-semibold drop-shadow truncate max-w-48">{course.title.length > 36 ? course.title.slice(0, 36) + "..." : course.title}</div>
                    </div>
                </div>

                <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight">{course.title}</h2>
                    <p className="text-sm md:text-base text-gray-500 mt-1">{course.subtitle}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            <FiClock /> <span>Level: {course.level || "N/A"}</span>
                        </span>
                        <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{course.language}</span>
                        <span className="inline-flex items-center gap-2 bg-[#E6F4EA] text-[#0f5132] px-3 py-1 rounded-full text-sm">{course.enrolledCount || course.enrollments?.length || 0} students</span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link to={`/admin/edit-course/${course._id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#309255] text-[#309255] rounded-md shadow-sm hover:bg-[#f0fbf4]"><FiEdit /> Edit</Link>
                        <button
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#309255] text-white rounded-md shadow hover:bg-[#267a43]"
                            // onClick={() => toggleMutation.mutate(course.status === "published" ? "draft" : "published")}
                        >
                            <FiCheck /> {course.status === "published" ? "Unpublish" : "Publish"}
                        </button>
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700" onClick={() => deleteMutation.mutate()}><FiTrash2 /> Delete</button>
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md" onClick={() => navigate(-1)}>Back</button>
                    </div>
                </div>

                <div className="w-full md:w-64 mt-4 md:mt-0">
                    <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-500">Price</div>
                            <div className="text-2xl font-semibold mt-1">
                                {course.isFree ? (
                                    "Free"
                                ) : course.discountedPrice && course.discountedPrice < course.price ? (
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-2xl font-bold text-[#0f5132]">৳ {course.discountedPrice}</span>
                                        <span className="text-sm text-gray-400 line-through">৳ {course.price}</span>
                                    </div>
                                ) : (
                                    <span>৳ {course.price}</span>
                                )}
                            </div>
                        <div className="text-sm text-gray-500 mt-3">Enrolled</div>
                        <div className="text-lg font-medium">{course.enrolledCount || course.enrollments?.length || 0}</div>
                    </div>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <section>
                        <h3 className="text-xl font-semibold mb-3">Description</h3>
                        <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg border border-gray-100 shadow-sm">{course.description}</p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-3">Learning Outcomes</h3>
                        <div className="flex flex-wrap gap-2">
                            {course.learningOutcomes?.map((item, idx) => (
                                <span key={idx} className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-full px-3 py-2 text-sm shadow-sm">
                                    <FiCheck className="text-green-500" />
                                    <span className="text-gray-700">{item}</span>
                                </span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-3">Prerequisites</h3>
                        <div className="flex flex-col gap-2">
                            {course.prerequisites?.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-white border border-gray-100 rounded-md p-3">
                                    <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-green-600">✓</div>
                                    <div className="text-gray-700">{item}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-3">Preview</h3>
                        {course.previewVideo ? (
                            <div className="w-full bg-black rounded-lg overflow-hidden">
                                <iframe
                                    title="preview"
                                    src={embedVideo(course.previewVideo)}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="w-full h-64 md:h-94"
                                ></iframe>
                            </div>
                        ) : (
                            <div className="text-gray-500">No preview available.</div>
                        )}
                    </section>
                </div>

                <aside className="space-y-4">
                    <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl font-semibold text-gray-700">{(course.instructor?.name || course.instructorId?.userId?.name || course.instructorName || "").split(" ").map(n => n?.[0] || "").slice(0, 2).join("")}</div>
                            <div className="flex-1">
                                <div className="font-semibold">{course.instructor?.name || course.instructorId?.userId?.name || course.instructorName || "N/A"}</div>
                                <div className="text-sm text-gray-500">{course.instructor?.email || course.instructorId?.userId?.email || ""}</div>
                                <div className="text-xs text-gray-400 mt-1">{course.instructorId?.status === "active" ? "Verified Instructor" : "Instructor"}</div>
                                <div className="mt-3 text-sm text-gray-600">{course.instructor?.bio || course.instructorId?.bio || "No bio available."}</div>
                            </div>
                        </div>
                        <div className="mt-3 grid grid-cols-1 gap-2 text-sm">
                            {course.instructorId?.phoneNumber && <div className="text-gray-700"><strong>Phone:</strong> {course.instructorId.phoneNumber}</div>}
                            {course.instructorId?.nidNumber && <div className="text-gray-700"><strong>NID:</strong> {course.instructorId.nidNumber}</div>}
                            {course.instructorId?.address && <div className="text-gray-700"><strong>Location:</strong> {course.instructorId.address.district}, {course.instructorId.address.upazila}</div>}
                            {course.instructorId?.expertise && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {course.instructorId.expertise.map((exp, i) => (
                                        <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{exp}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                        <h4 className="font-semibold">Category</h4>
                        <div className="mt-2 text-sm text-gray-700">{course.category?.name || course.categoryId?.name || "N/A"}</div>
                        <div className="text-xs text-gray-500">{course.category?.slug || course.categoryId?.slug}</div>
                        {course.categoryId?.description && <div className="mt-2 text-sm text-gray-600">{course.categoryId.description}</div>}
                    </div>

                    <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                        <h4 className="font-semibold">Meta</h4>
                        <div className="mt-2 text-sm text-gray-700">Level: {course.level}</div>
                        <div className="text-sm text-gray-700">Language: {course.language}</div>
                        <div className="text-sm text-gray-700">Created: {new Date(course.createdAt).toLocaleString()}</div>
                        <div className="text-sm text-gray-700">Updated: {new Date(course.updatedAt).toLocaleString()}</div>
                        <div className="mt-2 text-sm text-gray-700">Rating: {course.rating ?? course.instructorId?.rating ?? 0} · Reviews: {course.totalReviews ?? course.instructorId?.totalReviews ?? 0}</div>
                    </div>

                    <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                        <h4 className="font-semibold">Target Audience</h4>
                        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                            {(course.targetAudience || []).map((t, i) => (<li key={i}>{t}</li>))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ViewCourseDetailsForAdmin;