import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { FiStar, FiUserCheck, FiUsers, FiUserX, FiClock } from "react-icons/fi";
import PageHeading from "../../shared/PageHeading";
import DashboardCard from "../../shared/DashboardCard";
import Pagination from "../../shared/Pagination";
import { Link } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { toast } from "react-toastify";

const expertiseOptions = ["JavaScript", "React", "Node.js", "Python", "CSS", "HTML"];

const ManageInstructor = () => {
    const { register, handleSubmit, setValue, watch } = useForm();
    const axiosSecure = useAxios()
    const [page, setPage] = useState(1);
    const limit = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState("");
    const [minRating, setMinRating] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [expertise, setExpertise] = useState("");

    const selectedExpertise = watch("expertise") || [];

    const { data: instructorCounts, isLoading: isCountsLoading } = useQuery({
        queryKey: ['instructorCounts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/instructors/admin/counts');
            return res.data.data;
        }
    })

    console.log(instructorCounts)

    // Dashboard cards data
    const dashboardCards = [
        {
            title: "Total Instructors",
            count: instructorCounts?.totalInstructors ?? 0,
            icon: FiUsers,
            iconColor: "text-[#309255]",
            iconBg: "bg-[#e7f8ee]",
        },
        {
            title: "Active Instructors",
            count: instructorCounts?.activeInstructors ?? 0,
            icon: FiUserCheck,
            iconColor: "text-[#16a34a]", // green
            iconBg: "bg-[#dcfce7]",
        },
        {
            title: "Pending Instructors",
            count: instructorCounts?.pendingInstructors ?? 0,
            icon: FiClock,
            iconColor: "text-[#f59e0b]", // amber
            iconBg: "bg-[#fff7ed]",
        },
        {
            title: "Suspended Instructors",
            count: instructorCounts?.suspendedInstructors ?? 0,
            icon: FiUserX,
            iconColor: "text-[#dc2626]", // red
            iconBg: "bg-[#fee2e2]",
        },
        {
            title: "Average Rating",
            count: instructorCounts?.averageRating
                ? instructorCounts.averageRating.toFixed(1)
                : "0.0",
            icon: FiStar,
            iconColor: "text-[#facc15]", // gold
            iconBg: "bg-[#fffbe6]",
        },
    ];

    // Expertise modal toggle
    const toggleExpertise = (option) => {
        const current = selectedExpertise || [];
        if (current.includes(option)) {
            setValue("expertise", current.filter((item) => item !== option));
        } else {
            setValue("expertise", [...current, option]);
        }
    };

    // Handle form submission
    const onSubmit = (data) => {
        setSearchTerm(data.searchTerm || "");
        setStatus(data.status || "");
        setMinRating(data.minRating || "");
        if (data.sortOrder) {
            const [sortByField, sortDirection] = data.sortOrder.split("-");
            setSortBy(sortByField);
            setSortOrder(sortDirection);
        }

        const expertiseString = selectedExpertise.join(",");
        setExpertise(expertiseString);

        setPage(1);

    };

    const handleSaveExpertise = () => {
        setIsModalOpen(false);
        handleSubmit(onSubmit)();
    };


    // Fetch instructors with useQuery
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["instructors", searchTerm, status, minRating, sortBy, sortOrder, page, expertise],
        queryFn: async () => {
            const params = new URLSearchParams({ searchTerm, status, minRating, sortBy, sortOrder, page, limit, expertise }).toString();
            const res = await axiosSecure(`/instructors?${params}`);
            return res.data.data;
        }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (id) => await axiosSecure.patch(`/instructors/${id}/suspend`),
        onSuccess: () => {
            refetch()
            toast.success("Instructor suspended successfully");
        },
        onError: () => {
            toast.error("Failed to suspend instructor");
        }
    })

    const handleSuspendInstructor = (id) => {
        mutate(id);
    }
    return (
        <div className="p-6">
            {/* Heading + Add button */}
            <div className="flex items-center justify-between flex-col md:flex-row gap-6 md:gap-0">
                <PageHeading title="Manage Instructors" subtitle="View and manage all instructors on the platform" />
                <Link to="/admin/add-instructor">
                    <button className="px-4 py-2 rounded-md bg-[#309255] text-white hover:bg-[#267a43] text-sm shadow-sm">
                        Add Instructor
                    </button>
                </Link>
            </div>

            {/* Dashboard cards */}

            {
                isCountsLoading ? <p>Loading...</p> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6 my-6">
                    {dashboardCards.map((card, index) => (
                        <DashboardCard key={index} {...card} />
                    ))}
                </div>
            }


            {/* Filter Form */}
            <form onChange={handleSubmit(onSubmit)} className="bg-white p-4 rounded-xl my-6 flex flex-col md:flex-row items-center gap-4">
                <input
                    type="text"
                    {...register("searchTerm")}
                    placeholder="Search instructors or courses..."
                    className="p-3 border border-gray-300 rounded-md w-full md:w-1/3"
                />

                <select {...register("status")} className="p-3 border border-gray-300 rounded-md w-full md:w-1/5">
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                </select>

                {/* Expertise Modal Trigger */}
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="p-3 border border-gray-300 rounded-md w-full md:w-1/5 text-left"
                >
                    {selectedExpertise.length > 0 ? selectedExpertise.join(", ") : "Select Expertise"}
                </button>

                {/* Rating selector */}
                <select {...register("minRating")} className="p-3 border border-gray-300 rounded-md w-full md:w-1/5">
                    <option value="">Min Rating</option>
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <option key={rating} value={rating}>
                            {rating}+
                        </option>
                    ))}
                </select>

                <select {...register("sortOrder")} className="p-3 border border-gray-300 rounded-md w-full md:w-1/5">
                    <option value="">Sort By</option>
                    <option value="createdAt-dsc">Newest First</option>
                    <option value="createdAt-asc">Oldest First</option>
                    <option value="rating-asc">Ratting Low to High</option>
                    <option value="rating-dsc">Ratting High to Low</option>
                </select>
            </form>

            {/* Expertise Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="bg-white p-6 rounded-xl max-w-md mx-auto mt-20 shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <h3 className="text-lg font-semibold mb-4">Select Expertise</h3>
                <div className="flex flex-col gap-2">
                    {expertiseOptions.map((option) => (
                        <label key={option} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedExpertise.includes(option)}
                                onChange={() => toggleExpertise(option)}
                                className="accent-[#309255]"
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <button className="px-4 py-2 rounded-md border border-gray-300" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </button>
                    <button onClick={handleSaveExpertise} className="px-4 py-2 rounded-md bg-[#309255] text-white">
                        Save
                    </button>
                </div>
            </Modal>

            {/* Instructors Table */}
            <div className="rounded-xl p-6 bg-white">
                <div className="flex items-center justify-between">
                    <p className="mb-2 font-semibold">Instructors ({data?.meta?.total || 0})</p>
                </div>
                <div className="border-t border-[#F3F4F6] my-6"></div>
                <div className="relative overflow-x-auto rounded-xl border border-[#F3F4F6]">
                    <table className="w-full text-sm text-left rtl:text-right text-body">
                        <thead className="text-sm text-body bg-[#F3F4F6] border-b border-[#F3F4F6]">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Instructor</th>
                                <th className="px-6 py-3 font-semibold">Contact</th>
                                <th className="px-6 py-3 font-semibold">Location</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                                <th className="px-6 py-3 font-semibold">Rating</th>
                                <th className="px-6 py-3 font-semibold">Expertise</th>
                                <th className="px-6 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">Loading...</td>
                                </tr>
                            ) : data?.data?.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">No instructors found.</td>
                                </tr>
                            ) : (
                                data.data.map((inst) => (
                                    <tr key={inst._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{inst.user.name}</td>
                                        <td className="px-6 py-4"><p>{inst.user.email || "N/A"}</p><p>{inst.phoneNumber || "N/A"}</p></td>
                                        <td className="px-6 py-4">{inst.address?.district || "N/A"}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${inst.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : inst.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {inst.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="flex items-center gap-1">
                                                {Array.from({ length: Math.round(inst.rating) }).map((_, i) => (
                                                    <FiStar key={i} className="text-yellow-400" />
                                                ))}
                                                <span>{inst.rating.toFixed(1)}</span>
                                            </p>

                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="flex flex-wrap gap-1">
                                                {
                                                    inst.expertise.length > 0 ? inst.expertise?.map((exp, idx) => (
                                                        <span key={idx} className="bg-[#e7f8ee] text-[#309255] px-2 py-1 rounded-full text-xs">{exp}</span>
                                                    )) : "N/A"
                                                }
                                            </p>

                                        </td>
                                        <td className="px-6 py-4 gap-2 flex">
                                            <Link to={`/admin/manage-instructors/${inst._id}`} >
                                                <button className="bg-white text-black border border-[#309255] hover:bg-[#e7f8ee] transition-all duration-500 p-2 rounded-md cursor-pointer">
                                                    View Details
                                                </button>
                                            </Link>
                                            <button disabled={isPending || inst.status === "suspended"} onClick={() => handleSuspendInstructor(inst._id)} className="bg-red-500 hover:bg-red-700 text-white transition-all duration-500 p-2 rounded-md cursor-pointer disabled:cursor-no-drop disabled:bg-red-300">
                                                Suspend
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <Pagination page={page} setPage={setPage} total={data?.meta?.total || 0} limit={limit} />
        </div>
    );
};

export default ManageInstructor;
