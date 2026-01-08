import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { FiX } from "react-icons/fi";

const ViewDetailsFAQModal = ({ setShowFAQDetailsModal, id }) => {
    const axiosSecure = useAxios();
    const { data, isLoading } = useQuery({
        queryKey: ['faq-details', id],
        queryFn: async () => {
            const res = await axiosSecure(`/faqs/${id}`);
            return res.data.data;
        }
    })

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm">
            <div className="relative p-4 w-full max-w-2xl max-h-full">

                {
                    isLoading ? (
                        <div className="flex items-center justify-center h-48">
                            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
                        </div>
                    ) : <div className="relative bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl shadow-2xl p-4 md:p-6">

                        {/* Modal header */}
                        <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-4 md:pb-5">
                            <h3 className="text-xl font-semibold text-[#111827]">
                                FAQ Details
                            </h3>
                            <button
                                onClick={() => setShowFAQDetailsModal(false)}
                                className="text-[#6B7280] bg-transparent hover:bg-[#F3F4F6] hover:text-[#111827] rounded-lg text-sm w-9 h-9 ms-auto inline-flex justify-center items-center transition-colors"
                            >
                                <FiX size={20} />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="space-y-4 md:space-y-6 py-4 md:py-6 overflow-y-auto max-h-[60vh]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-[#6B7280]">Category</h4>
                                    <p className="leading-relaxed text-[#4B5563]">{data?.category?.charAt(0).toUpperCase() + data?.category?.slice(1) || '—'}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-[#6B7280]">Status</h4>
                                    <p className={`inline-flex items-center px-2 py-1 rounded text-sm ${data?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {data?.status?.charAt(0).toUpperCase() + data?.status?.slice(1) || '—'}
                                    </p>
                                </div>
                            </div>

                            <p className="leading-relaxed text-[#4B5563]">
                                {data?.question}
                            </p>
                            <p className="leading-relaxed text-[#4B5563]">
                                {data?.answer}
                            </p>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default ViewDetailsFAQModal;