import { useForm } from "react-hook-form";
import useAxios from "../../../../hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";

const AddModuleModal = ({ setOpen, refetch, userId, courseId }) => {
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxios();

    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosSecure.post('/modules', data);
            return response.data;
        },
        onSuccess: () => {
            refetch();
            setOpen(false);
            toast.success("Category added successfully")
        },
        onError: (error) => toast.error(`Failed to add category: ${error.message}`),
    })

    const onSubmit = data => {
        mutate({
            ...data,
            courseId,
            userId
        });
        console.log({
            ...data,
            courseId,
            userId
        })
    }
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            role="dialog"
            aria-modal="true"
        >
            <div className="relative p-4 w-full max-w-xl max-h-full">
                <div className="relative bg-[#ffffff] border border-[#e5e7eb] rounded-lg shadow-sm p-4 md:p-6">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-4 md:pb-5">
                        <h3 className="text-lg font-medium text-[#111827]">
                            Create a Course Module
                        </h3>

                        <button
                            onClick={() => setOpen(false)}
                            className="text-[#6b7280] bg-transparent hover:bg-[#f3f4f6] hover:text-[#111827] rounded-lg text-sm w-9 h-9 inline-flex justify-center items-center"
                        >
                            <FiX size={20} />
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit(onSubmit)} className="pt-4 md:pt-6">
                        <div className="mb-4">
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Module Title
                            </label>
                            <input
                                type="text"
                                {...register("title")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                placeholder="Enter module title, e.g., Introduction to React"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Module No
                            </label>
                            <input
                                type="number"
                                {...register("moduleNo")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                placeholder="e.g. 1"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Status
                            </label>
                            <select
                                {...register("status")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm"
                                required
                            >
                                <option value="" disabled>
                                    Select status
                                </option>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                        {
                            isPending ? <button
                                type="submit"
                                className="w-full mb-3 bg-[#309255] text-white hover:bg-[#267a43] focus:ring-4 cursor-pointer focus:ring-[#93c5fd] shadow-sm font-medium rounded-lg text-sm px-4 py-2.5"
                            >
                                Adding...
                            </button> : <button
                                type="submit"
                                className="w-full mb-3 bg-[#309255] text-white hover:bg-[#267a43] focus:ring-4 cursor-pointer focus:ring-[#93c5fd] shadow-sm font-medium rounded-lg text-sm px-4 py-2.5"
                            >
                                Add Module
                            </button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddModuleModal;
