import { useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import PageHeading from "../../shared/PageHeading";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CATEGORIES = [
    { value: '', label: 'Select category' },
    { value: 'news', label: 'News' },
    { value: 'tutorial', label: 'Tutorial' },
    { value: 'announcement', label: 'Announcement' },
    { value: 'other', label: 'Other' },
]

const AddBlogs = () => {
    const axiosSecure = useAxios();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
    });

    const {mutate, isPending} = useMutation({
        mutationFn: async (data) => await axiosSecure.post('/blogs', data),
        onSuccess: () => {
            toast.success("Blog added successfully");
            reset();
            setThumbnailPreview(null);
            editor.commands.setContent('');
        },
        onError: () => {
            toast.error("Failed to add blog");
        }
    })

    const onSubmit = async (data) => {
        const blogData = {
            ...data,
            thumbnail: "",
            content: editor.getJSON(),
        }

        mutate(blogData);
    }

    const handleThumbnail = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="p-6">
            <PageHeading title="Add New Blog" subtitle="Fill in the details to create a new blog post" />

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                {/* Basic Information */}
                <div className="bg-white p-6 rounded-xl border border-[#F3F4F6] my-6">
                    <h3 className="text-[#111827]">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">Title<span className="text-red-500">*</span></label>
                            <input {...register("title", { required: true })} className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg block w-full px-3 py-2.5 shadow-sm" placeholder="Enter title" />
                            {
                                errors.title && <p className="text-sm text-red-500 mt-1">Title is required</p>
                            }
                        </div>

                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">Category<span className="text-red-500">*</span></label>
                            <select {...register("category", { required: true })} className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg block w-full px-3 py-2.5 shadow-sm">
                                {CATEGORIES.map(c => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                ))}
                            </select>
                            {
                                errors.category && <p className="text-sm text-red-500 mt-1">Category is required</p>
                            }
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">Sub Title</label>
                            <input {...register("subTitle")} className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg block w-full px-3 py-2.5 shadow-sm" placeholder="Optional sub title" />
                        </div>

                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">Status</label>
                            <select {...register("status")} className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg block w-full px-3 py-2.5 shadow-sm">
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">Tags</label>
                            <input {...register("tags")} className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg block w-full px-3 py-2.5 shadow-sm" placeholder="tag1, tag2" />
                        </div>

                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">Thumbnail</label>
                            <input type="file" accept="image/*" {...register("thumbnail")} onChange={handleThumbnail} className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg block w-full p-2.5 shadow-sm" />
                        </div>

                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">Preview</label>
                            {thumbnailPreview ? <img src={thumbnailPreview} alt="preview" className="h-28 w-36 object-cover rounded-md shadow-sm" /> : <div className="text-sm text-gray-400">No thumbnail selected</div>}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-white p-6 rounded-xl border border-[#F3F4F6] my-6">
                    <h3 className="text-[#111827]">Content</h3>
                    <div className="mt-6">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <div className="bg-[#f9fafb] border border-[#d1d5db] rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1 rounded text-sm ${editor.isActive('bold') ? 'bg-[#309255] text-white' : 'hover:bg-gray-100'}`}>B</button>
                                        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 rounded text-sm ${editor.isActive('italic') ? 'bg-[#309255] text-white' : 'hover:bg-gray-100'}`}>I</button>
                                        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-[#309255] text-white' : 'hover:bg-gray-100'}`}>H2</button>
                                        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-2 py-1 rounded text-sm ${editor.isActive('bulletList') ? 'bg-[#309255] text-white' : 'hover:bg-gray-100'}`}>• List</button>
                                    </div>
                                    <div className="bg-white rounded p-4 min-h-[220px] border border-[#F3F4F6]">
                                        <EditorContent editor={editor} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Publish Actions */}
                <div className="flex justify-end">
                    <button type="submit" disabled={isPending} className="px-4 py-2.5 disabled:cursor-no-drop rounded-md bg-[#309255] hover:bg-[#267a43] text-white font-semibold">Save Blog</button>
                </div>
            </form>
        </div>
    )
}

export default AddBlogs;