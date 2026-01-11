import { useParams } from "react-router";
import useAxios from "../../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { FiCheckCircle, FiCheckSquare, FiClock, FiEdit2, FiFile, FiFileText, FiPlus, FiTrash2, FiVideo } from "react-icons/fi";
import PlayVideo from "./PlayVideo";

const ViewCourseContent = () => {
    const axiosPublic = useAxios();
    const { id } = useParams();
    const [moduleIsOpen, setModuleIsOpen] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const { data: course, isLoading: courseLoading } = useQuery({
        queryKey: ["instructorCourse", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/new-courses/${id}`);
            return res.data.data;
        },
        enabled: !!id,
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
        if (currentIndex < videoLectures.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setModuleIsOpen(videoLectures[nextIndex].moduleNo);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex);
            setModuleIsOpen(videoLectures[prevIndex].moduleNo);
        }
    };

    return (
        <div className="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left side video */}
            <div className="w-full rounded-xl md:col-span-2">
                <PlayVideo url={url} />

                <div className="flex items-center gap-4 justify-end my-6">
                    <button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="px-4 py-2 bg-white border cursor-pointer disabled:cursor-no-drop border-[#309255] text-[#309255] rounded-md"
                    >
                        Previous
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={currentIndex === videoLectures.length - 1}
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
                </section>
            </div>
        </div>
    );
};

export default ViewCourseContent;
