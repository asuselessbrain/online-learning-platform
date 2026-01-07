import { useForm } from "react-hook-form";
import PageHeading from "../../shared/PageHeading";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { useState } from "react";
import Pagination from "../../shared/Pagination";
import { FiEdit, FiTrash, FiTrash2 } from "react-icons/fi";
import AddCategoryModal from "./AddCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import { toast } from "react-toastify";

const ManageCategory = () => {
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxios()
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const limit = 10;
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [categoryId, setCategoryId] = useState(null);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['categories', searchTerm, sortBy, sortOrder, page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/categories?searchTerm=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
            return res.data.data;
        }
    })

    const { mutate } = useMutation({
        mutationFn: async (id) => {
            const response = await axiosSecure.delete(`/categories/${id}`);
            return response.data;
        },
        onSuccess: () => {
            refetch();
            toast.success("Category deleted successfully")
        },
        onError: (error) => toast.error(`Failed to delete category: ${error.message}`),
    })

    

    const onSubmit = data => {
        setSearchTerm(data.searchTerm);
        setSortOrder(data.sortOrder);
        setSortBy("createdAt");

    }

    const handleUpdate = (id) => {
        setCategoryId(id)
        setUpdateModal(!updateModal);
    }

    const handleDelete = (id) => {
        mutate(id)
    }
    return (
        <div className="p-6">
            <PageHeading title="Manage Category" subtitle="Add, edit, or delete course categories to organize your offerings" />

            <form onChange={handleSubmit(onSubmit)} className="bg-white p-4 rounded-xl my-6 flex items-center gap-4">
                <input type="text" {...register("searchTerm")} id="searchTerm" className="p-3 border border-gray-300 rounded-md w-full" placeholder="Search categories or slug..." />
                <input type="submit" value="Search" className="bg-[#309255] text-white px-4 py-3 rounded-md cursor-pointer hover:bg-[#267a43] transition-all duration-500" />
                <select {...register("sortOrder")} id="sortBy" className="p-3 border border-gray-300 rounded-md">
                    <option value="">Sort By</option>
                    <option value="des">Newest First</option>
                    <option value="asc">Oldest First</option>
                </select>
            </form>

            <div className="rounded-xl p-6 bg-white">
                <div className="flex items-center justify-between">
                    <p className="mb-2 font-semibold">Categories({data?.meta?.total || 0})</p>
                    <button onClick={() => setOpen(!open)} className="px-4 py-2 bg-[#309255] text-white rounded-md hover:bg-[#267a43] transition-all duration-500 cursor-pointer">Add Category</button>
                </div>
                <div className="border-t border-[#F3F4F6] my-6"></div>

                <div className="relative overflow-x-auto rounded-xl border border-[#F3F4F6]">
                    {
                        isLoading ? <p className="text-center p-6">Loading...</p> : <table className="w-full text-sm text-left rtl:text-right text-body">
                            <thead className="text-sm text-body bg-[#F3F4F6] border-b border-[#F3F4F6]">
                                <tr>
                                    <th scope="col" className="px-6 py-3 font-semibold">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-semibold">
                                        Slug
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-semibold">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-semibold">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-semibold">
                                        CreatedAt
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.data?.map((category, index) => (<tr key={index} className="bg-neutral-primary">
                                        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                            {category?.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {category?.slug}
                                        </td>
                                        <td className="px-6 py-4">
                                            {category?.description || "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium
                                                    ${category?.is_active
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"}
                                `}
                                            >
                                                {category?.is_active ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {category?.createdAt ? new Date(category.createdAt).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 gap-4 flex">
                                            <button onClick={() => handleUpdate(category._id)} className="border-none bg-[#309255] text-white hover:bg-[#267a43] transition-all duration-500 p-2 rounded-md"><FiEdit /> </button>
                                            <button onClick={()=>handleDelete(category._id)} className="border-none bg-red-500 hover:bg-red-700 text-white transition-all duration-500 p-2 rounded-md"><FiTrash2 /> </button>
                                        </td>
                                    </tr>))
                                }
                            </tbody>
                        </table>
                    }

                </div>
                {
                    open && <AddCategoryModal setOpen={setOpen} refetch={refetch} />
                }
                {
                    updateModal && <UpdateCategoryModal setOpen={setUpdateModal} refetch={refetch} categoryId={categoryId} />
                }
            </div>
            <Pagination page={page} setPage={setPage} total={data?.meta?.total} limit={limit} />
        </div>
    );
};

export default ManageCategory;