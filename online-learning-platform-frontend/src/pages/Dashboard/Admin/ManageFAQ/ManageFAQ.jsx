import PageHeading from "../../shared/PageHeading";
import { useState } from "react";
import AddFAQModal from "./AddFAQModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { useForm } from "react-hook-form";
import Pagination from "../../shared/Pagination";
import { Link } from "react-router";
import { FiEdit, FiExternalLink, FiTrash2 } from "react-icons/fi";
import ViewDetailsFAQModal from "./ViewDetailsFAQModal";
import EditFAQModal from "./EditFAQModal";
import { toast } from "react-toastify";

const ManageFAQ = () => {
    const [open, setOpen] = useState(false);
    const [showFAQDetailsModal, setShowFAQDetailsModal] = useState(false);
    const axiosSecure = useAxios()
    const [page, setPage] = useState(1);
    const limit = 10;
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const { register, handleSubmit } = useForm();
    const [id, setId] = useState(null);
    const [editOpen, setEditOpen] = useState(false);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['faqs-admin', searchTerm, category, status, sortBy, sortOrder, page, limit],
        queryFn: async () => {
            const res = await axiosSecure(`/faqs/admin?searchTerm=${searchTerm}&category=${category}&status=${status}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`);
            return res.data.data;
        }
    })

    const { mutate: deleteFAQ, isPending } = useMutation({
        mutationFn: async (id) => await axiosSecure.delete(`/faqs/${id}`),
        onSuccess: async () => {
            toast.success("FAQ deleted successfully");
            await refetch();
        },
        onError: () => {
            toast.error("Failed to delete FAQ");
        }
    })

    const deleteMutation = (id) => {
        deleteFAQ(id);
    }

    const viewDetailsFAQ = (id) => {
        setShowFAQDetailsModal(!showFAQDetailsModal);
        setId(id)
    }

    const updateFAQ = (id) => {
        setEditOpen(!editOpen);
        setId(id);
    }

    const handleSearch = data => {
        setSearchTerm(data.searchTerm);
        setCategory(data.category);
        setStatus(data.status);
        setSortBy("createdAt");
        setSortOrder(data.sortOrder);
        setPage(1);
    }
    return (
        <div className="p-6">
            <div className="flex items-center justify-between flex-col md:flex-row gap-4">
                <PageHeading title="Manage FAQ" subtitle="View and manage all FAQ" />
                <button onClick={() => setOpen(!open)} className="px-4 py-2 rounded-md bg-[#309255] text-white hover:bg-[#267a43] text-sm shadow-sm">Add FAQ</button>
            </div>
            <form onChange={handleSubmit(handleSearch)} className="bg-white p-4 rounded-xl my-6 flex items-center gap-4">
                {/* search term */}
                <input type="text" {...register("searchTerm")} id="searchTerm" className="p-3 border border-gray-300 rounded-md w-full" placeholder="Search categories, question or answer..." />
                {/* category  */}
                <select {...register("category")} className="p-3 border border-gray-300 rounded-md w-full md:w-1/5">
                    <option value="">All Categories</option>
                    {
                        ['enrollment', 'payments', 'technical', 'certificates', 'courses', 'others'].map(cat => (
                            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                        ))
                    }
                </select>
                {/* status */}
                <select {...register("status")} className="p-3 border border-gray-300 rounded-md w-full md:w-1/5">
                    <option value="">All Status</option>
                    {
                        ['unpublished', 'published'].map(status => (
                            <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                        ))
                    }
                </select>
                {/* sorting */}
                <select {...register("sortOrder")} id="sortBy" className="p-3 border border-gray-300 rounded-md">
                    <option value="">Sort By</option>
                    <option value="des">Newest First</option>
                    <option value="asc">Oldest First</option>
                </select>
            </form>

            <div className="bg-white rounded-xl p-4 my-6">
                <p className="mb-2 font-semibold">Courses({data?.meta?.total || 0})</p>
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#F3F4F6]">
                            <tr>
                                <th className="px-4 py-3">Question</th>
                                <th className="px-4 py-3">Answer</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">CreatedAt</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-6">Loading...</td>
                                </tr>
                            ) : data?.data?.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-6">No courses found.</td>
                                </tr>
                            ) : (
                                data.data.map((course) => (
                                    <tr key={course._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{course.question}</td>
                                        <td className="px-4 py-3">{course.answer}</td>
                                        <td className="px-4 py-3">{course.category?.name || (typeof course.category === 'string' ? course.category : "N/A")}</td>

                                        <td className="px-4 py-3">
                                            <span
                                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
                                                    ${course.status === "published"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                                                    }
    `}
                                            >
                                                {course.status}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3">{new Date(course.createdAt).toLocaleDateString()}</td>

                                        <td className="px-4 py-3 flex gap-2">
                                            <button onClick={() => viewDetailsFAQ(course._id)} disabled={isPending}  className="text-[#309255] p-2 disabled:cursor-no-drop rounded-md border border-[#E6F4EA] hover:bg-[#eefbf3] inline-flex items-center gap-2">
                                                <FiExternalLink /> View
                                            </button>
                                            <button onClick={() => updateFAQ(course._id)} disabled={isPending} className="p-2 rounded-md disabled:cursor-no-drop bg-white border border-[#309255] text-[#309255] hover:bg-[#e7f8ee] inline-flex items-center gap-2">
                                                <FiEdit /> Edit
                                            </button>
                                            <button
                                                onClick={() => deleteMutation(course._id)}
                                                disabled={isPending}
                                                className="p-2 rounded-md disabled:cursor-not-allowed disabled:bg-red-400 bg-red-500 text-white hover:bg-red-600 inline-flex items-center gap-2"
                                            >
                                                <FiTrash2 /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4">
                    <Pagination page={page} setPage={setPage} total={data?.meta?.total || 0} limit={limit} />
                </div>
            </div>

            {
                open && <AddFAQModal setOpen={setOpen} refetch={refetch} />
            }
            {
                showFAQDetailsModal && <ViewDetailsFAQModal setShowFAQDetailsModal={setShowFAQDetailsModal} id={id} />
            }
            {
                editOpen && <EditFAQModal setOpen={setEditOpen} refetch={refetch} id={id} />
            }
        </div>
    );
};

export default ManageFAQ;