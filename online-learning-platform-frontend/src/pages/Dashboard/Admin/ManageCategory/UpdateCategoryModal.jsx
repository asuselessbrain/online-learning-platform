import { useForm } from "react-hook-form";
import useAxios from "../../../../hooks/useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";

const UpdateCategoryModal = ({ setOpen, refetch, categoryId }) => {
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxios();

    const { data, isLoading } = useQuery({
        queryKey: ['category', categoryId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/categories/${categoryId}`);
            return res.data.data
        }
    })


    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosSecure.put(`/categories/${categoryId}`, data);
            return response.data;
        },
        onSuccess: () => {
            refetch();
            setOpen(false);
            toast.success("Category updated successfully")
        },
        onError: (error) => toast.error(`Failed to update category: ${error.message}`),
    })

    const onSubmit = data => {
        const is_active = data.is_active === "Active" ? true : false;
        mutate({ ...data, is_active });
    }
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            role="dialog"
            aria-modal="true"
        >
            {
                isLoading ? <div>Loading...</div> : <div className="relative p-4 w-full max-w-xl max-h-full">
                    <div className="relative bg-[#ffffff] border border-[#e5e7eb] rounded-lg shadow-sm p-4 md:p-6">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-4 md:pb-5">
                            <h3 className="text-lg font-medium text-[#111827]">
                                Create a Course Category
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
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    {...register("name")}
                                    defaultValue={data?.name}
                                    className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                    placeholder="e.g. Web Development"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                    Slug
                                </label>
                                <input
                                    type="text"
                                    {...register("slug")}
                                    defaultValue={data?.slug}
                                    className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                    placeholder="e.g. web-development"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                    Description
                                </label>
                                <textarea defaultValue={data?.description} {...register("description")} className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                    placeholder="e.g. web-development"
                                    required></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                    Status
                                </label>
                                <select defaultValue={data?.is_active === true ? "Active" : "Inactive"} {...register("is_active")} className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]" required>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            {
                                isPending ? <button
                                    type="submit"
                                    className="w-full mb-3 bg-[#309255] text-white hover:bg-[#267a43] focus:ring-4 cursor-pointer focus:ring-[#93c5fd] shadow-sm font-medium rounded-lg text-sm px-4 py-2.5"
                                >
                                    Updating...
                                </button> : <button
                                    type="submit"
                                    className="w-full mb-3 bg-[#309255] text-white hover:bg-[#267a43] focus:ring-4 cursor-pointer focus:ring-[#93c5fd] shadow-sm font-medium rounded-lg text-sm px-4 py-2.5"
                                >
                                    Update Category
                                </button>
                            }
                        </form>
                    </div>
                </div>
            }
        </div>
    );
};

export default UpdateCategoryModal;