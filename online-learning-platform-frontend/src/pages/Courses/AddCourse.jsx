import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const levels = ['Beginner', 'Intermediate', 'Advanced'];

const AddCourse = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    category: '',
    shortDescription: '',
    description: '',
    price: '',
    duration: '',
    level: levels[0],
    tags: '',
    published: false,
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
  setPreview(file ? URL.createObjectURL(file) : null);
    
  };

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = 'Title is required';
    if (!form.category.trim()) err.category = 'Category is required';
    if (!form.shortDescription.trim()) err.shortDescription = 'Short description required';
    if (!form.price.trim()) err.price = 'Price required (use 0 for free)';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;

    // simulate save
    setSuccess('Course saved successfully (demo). Redirecting...');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#309255] mb-2">Add Course</h2>
        <p className="text-sm text-gray-500 mb-6">Create a new course. Fill the fields and submit to save (demo).</p>

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-100 text-green-700 rounded">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input name="title" value={form.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
              {errors.title && <div className="text-xs text-red-600 mt-1">{errors.title}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input name="category" value={form.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
              {errors.category && <div className="text-xs text-red-600 mt-1">{errors.category}</div>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Short description</label>
            <input name="shortDescription" value={form.shortDescription} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
            {errors.shortDescription && <div className="text-xs text-red-600 mt-1">{errors.shortDescription}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={6} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (USD)</label>
              <input name="price" value={form.price} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
              {errors.price && <div className="text-xs text-red-600 mt-1">{errors.price}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 4h 30m" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Level</label>
              <select name="level" value={form.level} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm">
                {levels.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <div>
              <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
              <input type="file" accept="image/*" onChange={handleFile} className="mt-1 block w-full" />
              {preview && <img src={preview} alt="thumb" className="mt-2 w-40 h-24 object-cover rounded" />}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
              <input name="tags" value={form.tags} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" />
              <label className="inline-flex items-center mt-3">
                <input type="checkbox" name="published" checked={form.published} onChange={handleChange} className="form-checkbox h-4 w-4 text-[#309255]" />
                <span className="ml-2 text-sm text-gray-700">Published</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded bg-gray-100">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-[#309255] text-white font-semibold">Save course</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
