import { useNavigate, useParams } from "react-router";
import useAxios from "../../../../hooks/useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { FiCheckSquare, FiClock, FiEdit2, FiFile, FiFileText, FiPlus, FiTrash2, FiVideo } from "react-icons/fi";
import { AuthContext } from "../../../../Providers/AuthContext";
import { use } from "react";
import PlayVideo from "../../Instructor/ManageCourseContent/PlayVideo";
import { toPng } from "html-to-image";
import { useRef } from "react";
import Certificate from "../Certificates/Certificate";
import { toast } from "react-toastify";

const EnrolledCourseDetails = () => {
    const axiosPublic = useAxios();
    const { id } = useParams();
    const [moduleIsOpen, setModuleIsOpen] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const axiosSecure = useAxios()
    const [showNotReadyMsg, setShowNotReadyMsg] = useState(false);
    const ref = useRef(null)
    const navigate = useNavigate()


    const { user } = use(AuthContext)

    const { data: profile } = useQuery({
        queryKey: ['myProfile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}/profile`);
            return res.data.data;
        },
        enabled: !!user?.email,
    })

    const { data: course, isLoading: courseLoading } = useQuery({
        queryKey: ["userCourse", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/enrolment/single-course/${profile._id}/${id}`);
            return res.data.data;
        },
        enabled: !!id && !!profile,
    });


    const calculateDuration = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const secs = ((time % 3600) % 60).toFixed(0);

        if (hours > 0) return `${hours} h ${minutes} m ${secs} s`;
        if (minutes > 0) return `${minutes} m ${secs} s`;
        return `${secs} s`;
    };

    // 🟩 Flatten all video lessons in correct order
    const videoLectures = course?.modules?.flatMap(m =>
        m.lectures
            .filter(l => l.type === "video")
            .map(l => ({ ...l, moduleNo: m.moduleNo }))
    ) || [];

    const currentVideo = videoLectures[currentIndex];
    const url = currentVideo?.videoUrl;

    // 🟩 Auto select first module + video
    useEffect(() => {
        if (!course?.modules?.length) return;

        setModuleIsOpen(course.modules[0].moduleNo);
        setCurrentIndex(0);
    }, [course]);

    const handleNext = () => {
        handleVideoProgress();

        if (currentIndex >= videoLectures.length - 1) {
            setShowNotReadyMsg(true);
            return;
        }
        setShowNotReadyMsg(false);

        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setModuleIsOpen(videoLectures[nextIndex].moduleNo);
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex);
            setModuleIsOpen(videoLectures[prevIndex].moduleNo);
            setShowNotReadyMsg(false)
        }
    };

    const { data: enrollment, isLoading } = useQuery({
        queryKey: ["enrolled-course", course?._id],
        enabled: !!course?._id,
        queryFn: async () => {
            const res = await axiosSecure(`/enrolment/course/${course._id}`)
            return res.data.data
        }
    })


    const { mutate, isPending } = useMutation({
        enabled: !!enrollment?._id && !!course?._id && !!isLoading,
        mutationFn: async (lectureId) => axiosSecure.patch(`/enrolment/${enrollment._id}/${lectureId}/${course._id}`)
    })

    const handleVideoProgress = () => {

        const lessonId = currentVideo._id

        if (enrollment?.completedLectures.includes(lessonId)) return;

        mutate(lessonId)
    }

    const totalLectures = course?.modules.reduce((sum, m) => sum + m.lectures.length, 0) || 0

    const { mutate: createCertificate, isPending: certificatePending } = useMutation({
        mutationFn: async (certificateData) => await axiosSecure.post('/certificate', certificateData),
        onSuccess: () => {
            navigate("/student/certificates")
            toast.success("Certificate Generated Successfully")
        },
        onError: () => toast.error("Failed to generate certificate")
    })

    const generateCertificate = async () => {
        if (!ref.current) return;

        const dataUrl = await toPng(ref.current);

        const form = new FormData();
        form.append("file", dataUrl);
        form.append("upload_preset", "my_preset");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dwduymu1l/image/upload",
            { method: "POST", body: form }
        );

        const data = await res.json();

        const certificateData = {
            studentId: profile?._id,
            courseId: course?._id,
            certificateUrl: data.secure_url,
            studentName: profile?.name,
            courseName: course?.title,
            instructorName: course?.instructorId?.userId?.name
        }

        createCertificate(certificateData)
    };


    console.log(totalLectures === enrollment?.completedLectures.length )
    return (
        <div className="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left side video */}
            <div className="w-full md:col-span-2">
                <div className="w-full h-125 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                    {showNotReadyMsg ? (
                        <div className="text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-md p-4 max-w-md text-center">
                            🚧 Next module is not cooked yet.
                            <br />
                            New content will be added soon.
                        </div>
                    ) : (
                        <PlayVideo url={url} />
                    )}
                </div>

                <div className="flex items-center gap-4 justify-end my-6">
                    <button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0 | isPending}
                        className="px-4 py-2 bg-white border cursor-pointer disabled:cursor-no-drop border-[#309255] text-[#309255] rounded-md"
                    >
                        Previous
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={isPending}
                        className="px-4 py-2 bg-[#309255] border border-[#309255] text-white rounded-md cursor-pointer disabled:cursor-no-drop"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Right side module list */}
            <div className="md:col-span-1">
                <section className="bg-white rounded-xl p-4">
                    <h2 className="font-semibold mb-3">Modules ({course?.modules?.length || 0})</h2>

                    {courseLoading ? (
                        <div className="text-center py-6">Loading modules...</div>
                    ) : course?.modules?.length === 0 ? (
                        <div className="text-center py-6">No modules yet.</div>
                    ) : (
                        <ul className="space-y-3">
                            {course?.modules?.map(m => (
                                <div
                                    key={m._id}
                                    onClick={() => setModuleIsOpen(m.moduleNo)}
                                    className="border rounded-lg bg-white shadow-sm mb-6 p-4 border-[#e7f8ee]"
                                >
                                    {/* Module Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="text-[15px] font-medium">Module {m.moduleNo}: {m.title}</div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-xs text-gray-500">{m.lectures.length} lessons</div>
                                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                                    <FiClock /> {calculateDuration(m.duration)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {moduleIsOpen === m.moduleNo && (
                                        <>
                                            {m.lectures.length === 0 ? (
                                                <div className="py-6 text-center text-gray-500 text-sm italic">
                                                    No lessons yet.
                                                </div>
                                            ) : (
                                                <ul className="flex flex-col gap-3">
                                                    {m.lectures.map(l => {
                                                        const idx = videoLectures.findIndex(v => v._id === l._id);
                                                        const isActive = idx === currentIndex;

                                                        return (
                                                            <li
                                                                key={l._id}
                                                                className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer
                                                                    ${isActive ? 'border-[#309255] bg-[#e7f8ee]' : 'border-[#e7f8ee] hover:bg-[#f9fdfb]'}`}
                                                                onClick={() => {
                                                                    if (idx !== -1) {
                                                                        setCurrentIndex(idx);
                                                                        setModuleIsOpen(l.moduleNo);
                                                                    }
                                                                }}
                                                            >
                                                                {/* Left content */}
                                                                <div className="flex items-center gap-3">
                                                                    <div className="text-[#309255] text-xl">
                                                                        {l.type === "video" && <FiVideo />}
                                                                        {l.type === "document" && <FiFileText />}
                                                                        {l.type === "text" && <FiFile />}
                                                                        {l.type === "quiz" && <FiCheckSquare />}
                                                                    </div>

                                                                    <div>
                                                                        <div className="font-medium text-sm">{l.lectureNo}. {l.title}</div>
                                                                        <div className="flex items-center gap-3">
                                                                            <span className="text-xs text-gray-500">
                                                                                {calculateDuration(l.duration)}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                        </ul>
                    )}
                    {
                        (totalLectures === enrollment?.completedLectures.length && !enrollment?.completed) && <button onClick={generateCertificate} disabled={certificatePending} className="border border-green-600 text-green-600 px-4 py-2 w-full cursor-pointer disabled:cursor-no-drop rounded-md hover:bg-green-600 hover:text-white transition-all duration-700">
                            Complete
                        </button>
                    }
                </section>
            </div>
            <div style={{ position: "absolute", top: "-9999px" }}>
                <Certificate ref={ref} studentName={profile?.name} courseName={course?.title} />
            </div>
        </div>
    );
};

export default EnrolledCourseDetails;
