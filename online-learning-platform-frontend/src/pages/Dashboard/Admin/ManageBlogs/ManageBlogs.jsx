import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { Link, useNavigate } from "react-router";
import { FiEdit, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import PageHeading from "../../shared/PageHeading";
import Pagination from "../../shared/Pagination";

const ManageBlogs = () => {
    const axiosSecure = useAxios();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const limit = 10;
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['blogs-admin', searchTerm, category, status, sortOrder, page, limit],
        queryFn: async () => {
            const res = await axiosSecure(`/blogs/admin?searchTerm=${encodeURIComponent(searchTerm)}&category=${category}&status=${status}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`);
            return res.data.data;
        }
    })

    const { mutate: deleteBlog, isPending } = useMutation({
        mutationFn: async (id) => await axiosSecure.delete(`/blogs/${id}`),
        onSuccess: async () => {
            toast.success("Blog deleted successfully");
            await refetch();
        },
        onError: () => {
            toast.error("Failed to delete blog");
        }
    })

    const handleDelete = (id) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;
        deleteBlog(id);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        setSearchTerm(form.searchTerm?.value || '');
        setCategory(form.category?.value || '');
        setStatus(form.status?.value || '');
        setSortOrder(form.sortOrder?.value || '');
        setPage(1);
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between flex-col md:flex-row gap-4">
                <PageHeading title="Manage Blogs" subtitle="View and manage all blog posts" />
                <Link to="/admin/add-blog" className="px-4 py-2 rounded-md bg-[#309255] text-white hover:bg-[#267a43] text-sm shadow-sm">Add Blog</Link>
            </div>

            <form onSubmit={handleSearch} className="bg-white p-4 rounded-xl my-6 flex items-center gap-4">
                <input name="searchTerm" type="text" className="p-3 border border-gray-300 rounded-md w-full" placeholder="Search title, tags or content..." />
                <select name="category" className="p-3 border border-gray-300 rounded-md w-full md:w-1/5">
                    <option value="">All Categories</option>
                    <option value="news">News</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="announcement">Announcement</option>
                    <option value="other">Other</option>
                </select>
                <select name="status" className="p-3 border border-gray-300 rounded-md w-full md:w-1/5">
                    <option value="">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
                <select name="sortOrder" className="p-3 border border-gray-300 rounded-md">
                    <option value="">Sort By</option>
                    <option value="des">Newest First</option>
                    <option value="asc">Oldest First</option>
                </select>
                <button type="submit" className="px-3 py-2 bg-gray-100 rounded-md">Apply</button>
            </form>

            <div className="bg-white rounded-xl p-4 my-6">
                <p className="mb-2 font-semibold">Blogs ({data?.meta?.total || 0})</p>
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#F3F4F6]">
                            <tr>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Tags</th>
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
                                    <td colSpan={6} className="text-center py-6">No blogs found.</td>
                                </tr>
                            ) : (
                                data.data.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{blog.title}</td>
                                        <td className="px-4 py-3">{blog.category?.name || (typeof blog.category === 'string' ? blog.category : 'N/A')}</td>
                                        <td className="px-4 py-3">{(blog.tags || []).slice(0, 3).join(', ')}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700 border border-yellow-300'}`}>
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 flex gap-2">
                                            <Link to={`/admin/manage-blogs/${blog._id}`} className="text-[#309255] p-2 rounded-md border border-[#E6F4EA] hover:bg-[#eefbf3] inline-flex items-center gap-2"><FiExternalLink /> View</Link>
                                            <button onClick={() => navigate(`/admin/edit-blog/${blog._id}`)} className="p-2 rounded-md bg-white border border-[#309255] text-[#309255] hover:bg-[#e7f8ee] inline-flex items-center gap-2"><FiEdit /> Edit</button>
                                            <button onClick={() => handleDelete(blog._id)} disabled={isPending} className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 inline-flex items-center gap-2"><FiTrash2 /> Delete</button>
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
        </div>
    );
};

export default ManageBlogs;