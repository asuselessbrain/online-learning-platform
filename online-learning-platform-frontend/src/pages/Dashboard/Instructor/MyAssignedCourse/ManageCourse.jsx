import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router";
import AddModuleModal from "./AddModuleModal";
import useAxios from "../../../../hooks/useAxios";

const ManageCourse = () => {
    const { id } = useParams();
    const axiosPublic = useAxios();
    const [isOpen, setIsOpen] = useState(false);

    const { data: course, isLoading: courseLoading, refetch: refetchCourse } = useQuery({
        queryKey: ["instructorCourse", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/new-courses/${id}`);
            return res.data.data;
        },
        enabled: !!id,
    });



    if (courseLoading) return <div className="p-6">Loading course...</div>;
    if (!course) return <div className="p-6">Course not found.</div>;


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

            {isOpen && <AddModuleModal setOpen={setIsOpen} userId={course.instructorId?._id || course.instructor?._id} courseId={id} />}
        </div>
    );
};

export default ManageCourse;
