import { use, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Providers/AuthContext';

const levels = ['Beginner', 'Intermediate', 'Advanced'];

const AddCourse = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const {user} = use(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const target = e.target;
    const title = target.title.value.trim();
    const category = target.category.value.trim();
    const shortDescription = target.shortDescription.value.trim();
    const description = target.description.value.trim();
    const price = target.price.value.trim();
    const duration = target.duration.value.trim();
    const level = target.level.value.trim();
    const tags = target.tags.value.trim();
    const thumbnailFile = target.thumbnail?.files?.[0];

    const newErrors = {};

    if (!title) newErrors.title = "Title is required.";
    if (!category) newErrors.category = "Category is required.";
    if (!shortDescription) newErrors.shortDescription = "Short description is required.";
    if (!description) newErrors.description = "Full description is required.";
    if (!price) newErrors.price = "Price is required.";
    else if (isNaN(price) || Number(price) < 0) newErrors.price = "Price must be a non-negative number.";
    if (!duration) newErrors.duration = "Duration is required.";
    if (!level) newErrors.level = "Please select a course level.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      setLoading(true);
      setSuccessMsg('');

      const formData = new FormData();

      if (thumbnailFile) formData.append('file', thumbnailFile);
      formData.append('upload_preset', "my_preset")

      const imgRes = await fetch('https://api.cloudinary.com/v1_1/dwduymu1l/image/upload', {
        method: "POST",
        body: formData
      })
      const resData = await imgRes.json()
      const thumbnailUrl = resData.secure_url
      console.log(thumbnailUrl)

      const data = {
        title,
        category,
        shortDescription,
        description,
        price: Number(price),
        duration,
        level,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        thumbnail: thumbnailUrl,
        instructorName: user?.displayName,
        instructorEmail: user?.email,
        instructorPhoto: user?.photoURL,
      };


      const response = await axios.post('http://localhost:3000/api/v1/courses', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        setSuccessMsg('Course saved successfully.');
      }
      target.reset();
    } catch (error) {
      setErrors({ api: (error?.response?.data?.message) || error.message || 'Failed to save course' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto bg-[#e7f8ee] rounded-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#309255]">Add Course</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {successMsg && <div className="p-3 bg-green-50 border border-green-100 text-green-700 rounded">{successMsg}</div>}
          {errors.api && <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded">{errors.api}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input name="title" className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]" />
              {errors.title && <div className="text-xs text-red-600 mt-1">{errors.title}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input name="category" className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]" />
              {errors.category && <div className="text-xs text-red-600 mt-1">{errors.category}</div>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Short description</label>
            <input name="shortDescription" className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]" />
            {errors.shortDescription && <div className="text-xs text-red-600 mt-1">{errors.shortDescription}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full description</label>
            <textarea name="description" rows={6} className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (BDT)</label>
              <input name="price" className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]" />
              {errors.price && <div className="text-xs text-red-600 mt-1">{errors.price}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input name="duration" placeholder="e.g. 4h 30m" className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Level</label>
              <select name="level" className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]">
                {levels.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div>
              <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
              <input name="thumbnail" type="file" accept="image/*" className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
              <input name="tags" className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255]" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-[#309255] hover:bg-[#267a46] text-white font-semibold disabled:opacity-60">{loading ? 'Saving...' : 'Save course'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
