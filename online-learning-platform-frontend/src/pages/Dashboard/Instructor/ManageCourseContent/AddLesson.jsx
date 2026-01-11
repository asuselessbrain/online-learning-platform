import { useForm, useWatch } from "react-hook-form";
import useAxios from "../../../../hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";
import { useEffect } from "react";
import { useState } from "react";

const AddLesson = ({ setOpen, refetch, courseId, instructorId, moduleId }) => {
    const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
    const axiosSecure = useAxios();
    const [filePreview, setFilePreview] = useState(null);
    const [loading, setLoading] = useState(false)

    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosSecure.post('/lectures', data);
            return response.data;
        },
        onSuccess: () => {
            refetch();
            setOpen(false);
            toast.success("Category added successfully")
        },
        onError: (error) => toast.error(`Failed to add category: ${error.message}`),
    })

    const contentType = useWatch({ name: "type", control })

    const onSubmit = async (data) => {

        let secureUrl
        let duration

        try {
            setLoading(true)
            if (data.file?.[0]) {
                const imgData = new FormData();
                imgData.append('file', data.file[0]);
                imgData.append('upload_preset', 'my_preset');
                let url
                if (data.type === "video") url = "https://api.cloudinary.com/v1_1/dwduymu1l/video/upload"
                if (data.type === "document") url = "https://api.cloudinary.com/v1_1/dwduymu1l/raw/upload"

                const imgRes = await fetch(
                    url,
                    { method: 'POST', body: imgData }
                );
                const resData = await imgRes.json();
                console.log(resData.secure_url)
                secureUrl = resData.secure_url;
                duration = resData.duration
            }
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e)
        }

        mutate({
            ...data,
            courseId,
            secureUrl,
            duration,
            instructorId,
            moduleId
        });
        console.log({
            ...data,
            courseId,
            secureUrl,
            duration,
            instructorId,
            moduleId
        })
    }

    const file = watch("file");

    useEffect(() => {
        if (file && file[0]) {
            const selectedFile = file[0];
            if (selectedFile.type.startsWith("video/")) {
                const videoURL = URL.createObjectURL(selectedFile);
                setFilePreview({ type: "video", url: videoURL });
            } else {
                setFilePreview({ type: "document", name: selectedFile.name });
            }
        } else {
            setFilePreview(null);
        }
    }, [file]);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative p-4 w-full max-w-xl max-h-full overflow-y-auto">
                <div className="relative bg-white border border-[#e5e7eb] rounded-lg shadow-sm p-4 md:p-6">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-4 md:pb-5">
                        <h3 className="text-lg font-medium text-[#111827]">Create a Module Lecture</h3>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-[#6b7280] bg-transparent hover:bg-[#f3f4f6] hover:text-[#111827] rounded-lg text-sm w-9 h-9 inline-flex justify-center items-center"
                        >
                            <FiX size={20} />
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit(onSubmit)} className="pt-4 md:pt-6">

                        {/* Lecture Title */}
                        <div className="mb-4">
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">Lecture Title</label>
                            <input
                                type="text"
                                {...register("title")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm"
                                placeholder="Enter lecture title"
                                required
                            />
                        </div>

                        {/* Lecture No */}
                        <div className="mb-4">
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">Lecture No</label>
                            <input
                                type="number"
                                {...register("lectureNo")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm"
                                placeholder="e.g. 1"
                                required
                            />
                        </div>

                        {/* Content Type */}
                        <div className="mb-4">
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">Content Type</label>
                            <select
                                {...register("type")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm"
                                required
                            >
                                <option value="" disabled>Select Content Type</option>
                                {["video", "document", "text", "quiz"].map(t => (
                                    <option key={t} value={t}>
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status */}
                        <div className="mb-4">
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">Status</label>
                            <select
                                {...register("status")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm"
                                required
                            >
                                <option value="" disabled>Select status</option>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        {
                            contentType === 'video' || contentType === 'document' ? <div className="mb-4">
                                <label className="block mb-2.5 text-sm font-medium text-[#111827]">Upload Content</label>
                                <input
                                    type="file"
                                    accept="video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    {...register("file")}
                                    className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm"
                                />

                                {/* Preview */}
                                {filePreview && (
                                    <div className="mt-3">
                                        {filePreview.type === "video" ? (
                                            <video
                                                src={filePreview.url}
                                                controls
                                                className="w-full max-h-64 rounded-md border border-gray-300"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-2 text-gray-700 border rounded-md p-2">
                                                <span>📄</span>
                                                <span>{filePreview.name}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div> : contentType === 'text' ? <div div className="mb-4">
                                <label className="block mb-2.5 text-sm font-medium text-[#111827]">Content</label>
                                <textarea
                                    {...register("context")}
                                    className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm"
                                    required
                                >
                                </textarea>
                            </div> : null
                        }


                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full mb-3 bg-[#309255] text-white hover:bg-[#267a43] focus:ring-4 cursor-pointer focus:ring-[#93c5fd] shadow-sm font-medium rounded-lg text-sm px-4 py-2.5"
                        >
                            {isPending || loading ? "Adding..." : "Add Lecture"}
                        </button>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default AddLesson;