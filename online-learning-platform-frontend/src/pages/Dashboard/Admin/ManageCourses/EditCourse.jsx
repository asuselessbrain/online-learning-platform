import { useEffect, useState } from 'react';
import PageHeading from '../../shared/PageHeading';
import { useForm } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxios from '../../../../hooks/useAxios';
import { useNavigate, useParams } from 'react-router';

const levels = ['Beginner', 'Intermediate', 'Advanced'];

const EditCourse = () => {
    const { id } = useParams();
    const axiosSecure = useAxios();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState('');
    const [preview, setPreview] = useState(null);

    const { register, handleSubmit, reset } = useForm();

    // Fetch course
    const { data: course, isLoading } = useQuery({
        queryKey: ['course', id],
        queryFn: async () => {
            const res = await axiosSecure(`/new-courses/${id}`);
            return res.data.data;
        },
        enabled: !!id,
    });

    // Fetch Categories
    const { data: categoryData, isLoading: categoryLoading } = useQuery({
        queryKey: ['courseCategories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/categories/active/list');
            return res.data.data;
        }
    });

    // Fetch Instructors
    const { data: instructorData, isLoading: instructorLoading } = useQuery({
        queryKey: ['activeInstructors'],
        queryFn: async () => {
            const res = await axiosSecure.get('/instructors/admin/active');
            return res.data.data;
        }
    });

    useEffect(() => {
        if (course) {
            reset({
                title: course.title || '',
                subtitle: course.subtitle || '',
                categoryId: course?.category?._id || (course?.categoryId && (course.categoryId._id || course.categoryId)) || '',
                instructorId: course?.instructor?._id || course.instructorId?._id || course.instructorId || '',
                level: course.level || '',
                language: course.language || '',
                description: course.description || '',
                learningOutcomes: (course.learningOutcomes || []).join(', '),
                prerequisites: (course.prerequisites || []).join(', '),
                targetAudience: (course.targetAudience || []).join(', '),
                price: course.price || 0,
                discount: course.discount || 0,
                status: course.status || 'draft',
                isFree: !!course.isFree,
                previewVideo: course.previewVideo || '',
            });
            setPreview(course.thumbnail || null);
        }
    }, [course, reset]);

    const { mutate, isPending: loading } = useMutation({
        mutationFn: async (updatedCourse) => await axiosSecure.put(`/new-courses/${id}`, updatedCourse),
        onSuccess: () => {
            setSuccessMsg('Course updated successfully');
            navigate('/admin/manage-courses');
        },
        onError: (error) => {
            console.log(error)
            setErrors({ api: error?.response?.data?.message || error.message || 'Failed to update course' });
        }
    });

    const onSubmit = async (formData) => {
        setErrors({});
        setSuccessMsg('');

        try {
            let thumbnailUrl = course?.thumbnail || '';
            if (formData.thumbnail?.[0]) {
                const imgData = new FormData();
                imgData.append('file', formData.thumbnail[0]);
                imgData.append('upload_preset', 'my_preset');

                const imgRes = await fetch(
                    'https://api.cloudinary.com/v1_1/dwduymu1l/image/upload',
                    { method: 'POST', body: imgData }
                );
                const resData = await imgRes.json();
                thumbnailUrl = resData.secure_url;
            }

            const payload = {
                title: formData.title,
                subtitle: formData.subtitle || '',
                categoryId: formData.categoryId,
                instructorId: formData.instructorId,
                level: formData.level,
                language: formData.language,
                description: formData.description,
                learningOutcomes: formData.learningOutcomes
                    ? formData.learningOutcomes.split(',').map((o) => o.trim())
                    : [],
                prerequisites: formData.prerequisites
                    ? formData.prerequisites.split(',').map((p) => p.trim())
                    : [],
                targetAudience: formData.targetAudience
                    ? formData.targetAudience.split(',').map((t) => t.trim())
                    : [],
                price: Number(formData.price),
                discount: formData.discount ? Number(formData.discount) : 0,
                status: formData.status,
                isFree: formData.isFree || false,
                previewVideo: formData.previewVideo || '',
                thumbnail: thumbnailUrl,
            };

            mutate(payload);
        } catch (error) {
            setErrors({ api: error?.response?.data?.message || error.message || 'Failed to update course' });
        }
    };

    if (isLoading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <PageHeading title="Edit Course" subtitle="Modify course information" />

            <form
                className="bg-white p-6 rounded-xl border border-[#E5E7EB] my-6 space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                {successMsg && (
                    <div className="p-3 bg-green-50 border border-green-100 text-green-700 rounded">
                        {successMsg}
                    </div>
                )}
                {errors.api && (
                    <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded">{errors.api}</div>
                )}

                <div>
                    <label className="text-sm text-[#4A5565]">
                        Course Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        {...register('title', { required: 'Course title is required' })}
                        className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2"
                        placeholder="Course Title"
                    />
                </div>

                <div>
                    <label className="text-sm text-[#4A5565]">Subtitle</label>
                    <input
                        type="text"
                        {...register('subtitle')}
                        className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2"
                        placeholder="Short tagline for the course"
                    />
                </div>

                <div>
                    <label className="block text-sm text-[#4A5565] mb-2">Course Image</label>

                    <div
                        className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#309255] transition overflow-hidden"
                        onClick={() => document.querySelector('input[type="file"]').click()}
                    >
                        {!preview && (
                            <>
                                <FiUpload size={30} className="mb-4" />
                                <p className="text-sm text-gray-600 font-medium">Click to upload course image</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                            </>
                        )}

                        {preview && (
                            <img
                                src={preview}
                                alt="Course Preview"
                                className="object-cover w-full h-full"
                            />
                        )}

                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            {...register('thumbnail', {
                                onChange: (e) => {
                                    const file = e.target.files[0];
                                    if (file) setPreview(URL.createObjectURL(file));
                                },
                            })}
                            className="hidden"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm text-[#4A5565]">Preview Video URL</label>
                    <input
                        type="text"
                        {...register('previewVideo')}
                        className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2"
                        placeholder="YouTube / Vimeo / MP4 URL"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-[#4A5565]">Category <span className="text-red-500">*</span></label>
                        <select
                            {...register('categoryId', { required: 'Category is required' })}
                            className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2"
                            disabled={categoryLoading}
                            // defaultValue={}
                        >
                            <option value="">{categoryLoading ? 'Loading categories...' : 'Select Category'}</option>
                            {categoryData?.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm text-[#4A5565]">Instructor <span className="text-red-500">*</span></label>
                        <select
                            {...register('instructorId', { required: 'Instructor is required' })}
                            className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2"
                            disabled={instructorLoading}
                        >
                            <option value="">{instructorLoading ? 'Loading instructors...' : 'Select Instructor'}</option>
                            {instructorData?.data?.map((instructor) => (
                                <option key={instructor._id} value={instructor._id}>{instructor?.user?.name || instructor?.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-[#4A5565]">Level <span className="text-red-500">*</span></label>
                        <select
                            {...register('level', { required: 'Please select course level' })}
                            className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2"
                        >
                            <option value="">Select Level</option>
                            {levels.map((l) => (
                                <option key={l} value={l}>{l}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm text-[#4A5565]">Language <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            {...register('language', { required: 'Language is required' })}
                            className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2"
                            placeholder="Bangla / English"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm text-[#4A5565]">Course Description <span className="text-red-500">*</span></label>
                    <textarea
                        {...register('description', { required: 'Course description is required' })}
                        rows="5"
                        className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2"
                        placeholder="What students will learn in this course..."
                    />
                </div>

                <div>
                    <label className="text-sm text-[#4A5565]">Learning Outcomes (separate with comma) <span className="text-red-500">*</span></label>
                    <textarea
                        {...register('learningOutcomes', { required: 'Learning outcomes are required' })}
                        rows="3"
                        className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2"
                        placeholder="Separate each outcome with a comma"
                    />
                </div>

                <div>
                    <label className="text-sm text-[#4A5565]">Prerequisites (separate with comma)</label>
                    <textarea
                        {...register('prerequisites')}
                        rows="2"
                        className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2"
                        placeholder="Separate each prerequisite with a comma"
                    />
                </div>

                <div>
                    <label className="text-sm text-[#4A5565]">Target Audience (separate with comma)</label>
                    <textarea
                        {...register('targetAudience')}
                        rows="2"
                        className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2"
                        placeholder="Who is this course for? Separate each with a comma"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-[#4A5565]">Price (Tk) <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            {...register('price', { required: 'Price is required' })}
                            className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2"
                            placeholder="Course Price"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-[#4A5565]">Discount(%)</label>
                        <input
                            type="number"
                            {...register('discount')}
                            className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2"
                            placeholder="Optional"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm text-[#4A5565]">Status <span className="text-red-500">*</span></label>
                    <select
                        {...register('status', { required: 'Status is required' })}
                        className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" {...register('isFree')} />
                    <span className="text-sm text-[#4A5565]">This is a free course</span>
                </div>

                <div className="pt-4">
                    <input
                        type="submit"
                        value={loading ? 'Updating...' : 'Update Course'}
                        disabled={loading}
                        className="w-full md:w-auto px-6 py-2 bg-[#309255] text-white rounded-md font-medium hover:bg-[#26734d] cursor-pointer transition-all duration-500 disabled:opacity-60"
                    />
                </div>
            </form>
        </div>
    );
};

export default EditCourse;
