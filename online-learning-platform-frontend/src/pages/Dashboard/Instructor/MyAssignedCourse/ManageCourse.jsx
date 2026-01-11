import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router";
import AddModuleModal from "./AddModuleModal";
import useAxios from "../../../../hooks/useAxios";
import { FiArrowDown, FiCheckCircle, FiCheckSquare, FiChevronDown, FiClock, FiEdit2, FiFile, FiFileText, FiPlus, FiTrash2, FiVideo } from "react-icons/fi";
import AddLesson from "../ManageCourseContent/AddLesson";

const ManageCourse = () => {
    const { id } = useParams();
    const axiosPublic = useAxios();
    const [isOpen, setIsOpen] = useState(false);
    const [addLessonOpen, setAddLessonOpen] = useState(false)
    const [moduleIsOpen, setModuleIsOpen] = useState("")
    const [instructorId, setInstructorId] = useState("")
    const [moduleId, setModuleId] = useState("")

    const { data: course, isLoading: courseLoading, refetch: refetchCourse } = useQuery({
        queryKey: ["instructorCourse", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/new-courses/${id}`);
            return res.data.data;
        },
        enabled: !!id,
    });

    console.log(course)

    if (courseLoading) return <div className="p-6">Loading course...</div>;
    if (!course) return <div className="p-6">Course not found.</div>;

    const calculateDuration = (time) => {
        const hours = Math.floor(time / 3600)
        const minutes = Math.floor((time % 3600) / 60)
        const secs = ((time % 3600) % 60).toFixed(0)

        if (hours > 0) {
            return `${hours} h ${minutes} m ${secs} s`;
        } else if (minutes > 0) {
            return `${minutes} m ${secs} s`;
        } else {
            return `${secs} s`;
        }
    }

    const handleAddLesson = (data) => {
        setAddLessonOpen(!addLessonOpen)
        setInstructorId(data.instructorId)
        setModuleId(data.moduleId)
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold">{course.title}</h1>
                    <p className="text-sm text-gray-500">{course.subtitle}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-white border border-[#309255] text-[#309255] rounded-md">Add Module</button>
                    <button className="px-4 py-2 bg-[#309255] text-white rounded-md">Continue Course</button>
                </div>
            </div>

            <section className="bg-white rounded-xl p-4">
                <h2 className="font-semibold mb-3">Modules ({course?.modules?.length || 0})</h2>

                {courseLoading ? (
                    <div className="text-center py-6">Loading modules...</div>
                ) : course?.modules?.length === 0 ? (
                    <div className="text-center py-6">No modules yet. Use "Add Module" to create one.</div>
                ) : (
                    <ul className="space-y-3">
                        {course?.modules?.map((m) => (
                            <div onClick={() => setModuleIsOpen(m.moduleNo)} className="border rounded-lg bg-white shadow-sm mb-6 p-4 border-[#e7f8ee]">

                                {/* Module Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <div className="text-[15px] font-medium">Module {m.moduleNo}: {m.title}</div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-xs text-gray-500">{m.lectures.length} lessons</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1"><FiClock /> {calculateDuration(m.duration)}</div>
                                        </div>
                                    </div>

                                    {/* Module actions */}
                                    <div className="flex gap-2">
                                        <button className="text-[#309255] text-sm hover:opacity-75">
                                            <FiEdit2 />
                                        </button>
                                        <button className="text-red-500 text-sm hover:opacity-75">
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>

                                {
                                    moduleIsOpen === m.moduleNo && <>
                                        {/* Lessons */}
                                        {m.lectures.length === 0 ? (
                                            <div className="py-6 text-center text-gray-500 text-sm italic">
                                                No lessons yet. Add a new lesson.
                                            </div>
                                        ) : (
                                            <ul className="flex flex-col gap-3">
                                                {m.lectures.map(l => (
                                                    <li key={l._id}
                                                        className="flex items-center justify-between border rounded-lg p-3 hover:bg-[#f9fdfb] border-[#e7f8ee]">

                                                        <div className="flex items-center gap-3">
                                                            {/* video/file icon */}
                                                            <div className="text-[#309255] text-xl">
                                                                {l.type === "video" && <FiVideo />}
                                                                {l.type === "document" && <FiFileText />}
                                                                {l.type === "text" && <FiFile />}
                                                                {l.type === "quiz" && <FiCheckSquare />}
                                                            </div>

                                                            {/* content */}
                                                            <div>
                                                                <div className="font-medium text-sm">{l.lectureNo}. {l.title}</div>

                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-xs text-gray-500">{calculateDuration(l.duration)}</span>
                                                                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#e7f8ee] text-[#309255] font-medium">
                                                                        Published
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* actions */}
                                                        <div className="flex items-center gap-2 text-sm">

                                                            <button className="text-[#309255] hover:opacity-75">
                                                                {
                                                                    l.status === 'draft' ? <FiFile /> : <FiCheckCircle />
                                                                }
                                                            </button>
                                                            <button className="text-[#309255] hover:opacity-75">
                                                                <FiEdit2 />
                                                            </button>
                                                            <button className="text-red-500 hover:opacity-75">
                                                                <FiTrash2 />
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Add Lesson */}
                                        <button
                                            onClick={() => handleAddLesson({ instructorId: m.instructorId, moduleId: m._id })}
                                            className="w-full mt-4 py-3 border border-dashed rounded-lg text-sm flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
                                        >
                                            <FiPlus /> Add Lesson to Module
                                        </button>
                                    </>
                                }

                            </div>
                        ))}
                    </ul>
                )}
            </section>

            {
                addLessonOpen && <AddLesson setOpen={setAddLessonOpen} refetch={refetchCourse} courseId={id} instructorId={instructorId} moduleId={moduleId} />
            }

            {isOpen && <AddModuleModal setOpen={setIsOpen} refetch={refetchCourse} courseId={id} />}
        </div>
    );
};

export default ManageCourse;
