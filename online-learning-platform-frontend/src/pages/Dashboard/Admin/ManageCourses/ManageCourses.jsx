import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { FiEye, FiEyeOff, FiEdit, FiTrash2, FiExternalLink } from "react-icons/fi";
import PageHeading from "../../shared/PageHeading";
import Pagination from "../../shared/Pagination";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const ManageCourses = () => {
  const axiosSecure = useAxios();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { register, handleSubmit } = useForm();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["adminCourses", searchTerm, page, status, category, sortOrder, sortBy, limit],
    queryFn: async () => {
      const res = await axiosSecure(`/new-courses?searchTerm=${searchTerm}&page=${page}&limit=${limit}&status=${status}&category=${category}&sortOrder=${sortOrder}&sortBy=${sortBy}`);
      return res.data;
    },
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure('/categories/active/list')
      return res.data.data
    }
  })


  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/courses/${id}`),
    onSuccess: async () => {
      toast.success("Course deleted");
      await refetch();
    },
    onError: () => toast.error("Failed to delete course"),
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, publish }) => await axiosSecure.put(`/courses/${id}`, { status: publish ? "published" : "draft" }),
    onSuccess: async () => {
      toast.success("Course updated");
      await refetch();
    },
    onError: () => toast.error("Failed to update course"),
  });


  const onSubmit = data => {
    setSearchTerm(data.searchTerm || "");
    setStatus(data.status || "");
    setSortOrder(data.sortOrder || "");
    setCategory(data.category || "");
    setPage(1);
    setSortBy("createdAt");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between flex-col md:flex-row gap-4">
        <PageHeading title="Manage Courses" subtitle="View and manage all courses" />
        <Link to="/admin/add-course">
          <button className="px-4 py-2 rounded-md bg-[#309255] text-white hover:bg-[#267a43] text-sm shadow-sm">Add Course</button>
        </Link>
      </div>

      <form onChange={handleSubmit(onSubmit)} className="bg-white p-4 rounded-xl my-6 flex items-center gap-4">
        {/* search term */}
        <input type="text" {...register("searchTerm")} id="searchTerm" className="p-3 border border-gray-300 rounded-md w-full" placeholder="Search categories, instructor name, level or language..." />
        {/* category  */}
        <select {...register("category")} className="p-3 border border-gray-300 rounded-md w-full md:w-1/5">
          <option value="">All Status</option>
          {
            categoriesLoading ? <option>Loading...</option> : categories.map(cat => (
              <option key={cat._id} value={cat.slug}>{cat.name}</option>
            ))
          }
        </select>
        {/* status */}
        <select {...register("status")} className="p-3 border border-gray-300 rounded-md w-full md:w-1/5">
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
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
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Instructor</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3">Enrolled</th>
                <th className="px-4 py-3">Status</th>
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
                    <td className="px-4 py-3 font-medium">{course.title}</td>
                    <td className="px-4 py-3">{course.instructorName || course.instructor?.name || "N/A"}</td>
                    <td className="px-4 py-3">{course.category?.name || (typeof course.category === 'string' ? course.category : "N/A")}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
      ${course.level === "Beginner"
                            ? "bg-green-100 text-green-700"
                            : course.level === "Intermediate"
                              ? "bg-yellow-100 text-yellow-700"
                              : course.level === "Advanced"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-600"
                          }
    `}
                      >
                        {course.level || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3">{course.enrolledCount || course.enrollments?.length || 0}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
      ${course.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                          }
    `}
                      >
                        {course.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <Link to={`/courses/${course._id}`} className="text-[#309255] p-2 rounded-md border border-[#E6F4EA] hover:bg-[#eefbf3] inline-flex items-center gap-2">
                        <FiExternalLink /> View
                      </Link>
                      <Link to={`/admin/edit-course/${course._id}`} className="p-2 rounded-md bg-white border border-[#309255] text-[#309255] hover:bg-[#e7f8ee] inline-flex items-center gap-2">
                        <FiEdit /> Edit
                      </Link>
                      <button
                        onClick={() => deleteMutation.mutate(course._id)}
                        className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 inline-flex items-center gap-2"
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
    </div>
  );
};

export default ManageCourses;
