import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import useAxios from '../../../../hooks/useAxios';
import { toast } from 'react-toastify';

const AddFAQModal = ({ setOpen, refetch }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxios();

    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => axiosSecure.post('/faqs', data),
        onSuccess: async () => {
            toast.success("FAQ added successfully");
            setOpen(false);
            // await refetch();
        },
        onError: () => {
            toast.error("Failed to add FAQ");
        }
    })

    const onSubmit = (data) => {
        mutate(data);
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
                                Question
                            </label>
                            <input
                                type="text"
                                {...register("question", { required: true })}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                placeholder="E.g. How to enroll in a course?"
                                required
                            />
                            {
                                errors.question && <p className="text-sm text-red-500 mt-1">Question is required</p>
                            }
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Answer
                            </label>
                            <input
                                type="text"
                                {...register("answer", { required: true })}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                placeholder="e.g. To enroll in a course, follow these steps..."
                                required
                            />
                            {
                                errors.answer && <p className="text-sm text-red-500 mt-1">Answer is required</p>
                            }
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Category
                            </label>
                            <select {...register("category", { required: true })} className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                required>
                                <option value="">Select a category</option>
                                {
                                    ['enrollment', 'payments', 'technical', 'certificates', 'courses', 'others'].map(cat => (
                                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                    ))
                                }
                            </select>
                            {
                                errors.category && <p className="text-sm text-red-500 mt-1">Category is required</p>
                            }
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Status
                            </label>
                            <select {...register("status")} className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                required>
                                <option value="">Select a status</option>
                                {
                                    ['unpublished', 'published'].map(status => (
                                        <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                                    ))
                                }
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
                                Add FAQ
                            </button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFAQModal;