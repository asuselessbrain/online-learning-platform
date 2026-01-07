import { useForm, useWatch } from "react-hook-form";
import PageHeading from "../../shared/PageHeading";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { useLoaderData, useNavigate } from "react-router";
import { FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react"; // Added useEffect
import { toast } from "react-toastify";

const AddInstructor = () => {
    const { register, handleSubmit, control, resetField, setValue } = useForm();
    const axiosSecure = useAxios();
    const districts = useLoaderData();
    const navigate = useNavigate();
    const [expertiseList, setExpertiseList] = useState([]);

    const district = useWatch({ name: "address.district", control, defaultValue: "" });
    const upazilas = districts.find(d => d.name.toLowerCase() === district.toLowerCase())?.upazilas || [];

    const upazila = useWatch({ name: "address.upazila", control, defaultValue: "" });
    const postOffices = upazilas.find(u => u.name.toLowerCase() === upazila.toLowerCase())?.postOffices || [];

    const postOffice = useWatch({ name: "address.postOffice", control, defaultValue: "" });
    const selectedPostOffice = postOffices.find(po =>
        po.name.toLowerCase() === postOffice.toLowerCase()
    );

    const postalCode = selectedPostOffice?.postalCode || "";

    const expertiseInput = useWatch({ name: "expertise", control, defaultValue: "" });

    // Auto-set postal code when post office is selected
    useEffect(() => {
        if (postOffice) {
            setValue("address.postalCode", postalCode);
        }
    }, [postOffice, postalCode, setValue]);

    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data.data;
        },
    })

    const { mutate, isPending } = useMutation({
        mutationFn: async (instructorData) => {
            console.log("Sending data to server:", instructorData);
            const res = await axiosSecure.post('/instructors', instructorData);
            return res.data;
        },
        onSuccess: () => {
            navigate("/admin/manage-instructors");
            toast.success("Instructor created successfully");
        },
        onError: (error) => {
            console.error("Mutation error:", error);
            // Show more specific error message
            if (error.response) {
                toast.error(`Server error: ${error.response.data?.message || error.response.status}`);
            } else if (error.request) {
                toast.error("No response from server. Check your connection.");
            } else {
                toast.error("Failed to create instructor");
            }
        }
    })

    const handleExpertiseAdd = () => {
        if (expertiseInput.trim() === "") {
            alert("Please enter an expertise");
            return;
        }
        setExpertiseList(prev => [...prev, expertiseInput.trim()]);
        resetField("expertise");
    }

    const handleExpertiseRemove = (indexToRemove) => {
        const updatedList = expertiseList.filter((_, index) => index !== indexToRemove);
        setExpertiseList(updatedList);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleExpertiseAdd();
        }
    };

    const handleCrateInstructor = (formData) => {
        // Clean social links - create object with empty strings as defaults
        const socialLinks = {
            linkedin: formData.socialLinks?.linkedin || "",
            twitter: formData.socialLinks?.twitter || "",
            facebook: formData.socialLinks?.facebook || "",
            website: formData.socialLinks?.website || "",
            youtube: formData.socialLinks?.youtube || "",
            github: formData.socialLinks?.github || ""
        };

        // Prepare data for backend - match the schema exactly
        const instructorData = {
            userId: formData.userId,
            phoneNumber: formData.phoneNumber,
            nidNumber: formData.nidNumber,
            gender: formData.gender,
            dob: formData.dob ? new Date(formData.dob).toISOString() : undefined, // Convert to ISO string
            address: {
                district: formData.address?.district || "",
                upazila: formData.address?.upazila || "",
                postOffice: formData.address?.postOffice || "",
                postalCode: formData.address?.postalCode || postalCode || "",
            },
            bio: formData.bio || "",
            experience: formData.experience || "",
            education: formData.education || "",
            expertise: expertiseList,
            socialLinks: socialLinks, // Always send object with empty strings
            verified: formData.terms || false, // Map terms to verified
            status: formData.status || "active",
        };

        console.log("Final instructor data for submission:", instructorData);
        mutate(instructorData);
    }

    return (
        <div className="p-6">
            <PageHeading title="Add New Instructor" subtitle="Fill in the details to add a new instructor to the platform" />

            <form onSubmit={handleSubmit(handleCrateInstructor)}>
                {/* Basic Information */}
                <div className="bg-white p-6 rounded-xl border border-[#F3F4F6] my-6">
                    <h3 className="text-[#111827]">
                        Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Full Name */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Full Name<span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register("userId", { required: true })}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg block w-full px-3 py-2.5 shadow-sm"
                            >
                                <option value="">Select a User</option>
                                {
                                    data?.data?.map(user => <option key={user._id} value={user._id}>{user.name}</option>)
                                }
                            </select>
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Phone Number<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("phoneNumber", { required: true })}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                placeholder="01XXXXXXXXX"
                            />
                        </div>

                        {/* NID Number */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                NID Number<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("nidNumber", { required: true })}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                placeholder="Your NID number"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Gender
                            </label>
                            <select
                                {...register("gender")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg block w-full px-3 py-2.5 shadow-sm"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                {...register("dob")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg block w-full px-3 py-2.5 shadow-sm"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Status
                            </label>
                            <select
                                {...register("status")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg block w-full px-3 py-2.5 shadow-sm"
                            >
                                <option value="pending">Pending</option>
                                <option value="active">Active</option>
                                <option value="suspended">Suspended</option>
                            </select>
                        </div>

                        {/* Verified */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="accent-[#309255] dark:accent-green-400"
                                {...register("terms")}
                            />
                            <p className="text-[#111827] text-sm">Mark as Verified Instructor</p>
                        </div>
                    </div>
                </div>

                {/* Address Information */}
                <div className="bg-white p-6 rounded-xl border border-[#F3F4F6] my-6">
                    <h3 className="text-[#111827]">
                        Address Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* District */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                District<span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register("address.district", { required: true })}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg block w-full px-3 py-2.5 shadow-sm"
                            >
                                <option value="">Select a district</option>
                                {
                                    districts?.map(district => <option key={district.id} value={district.name}>{district.name}</option>)
                                }
                            </select>
                        </div>

                        {/* Upazila */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Upazila<span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register("address.upazila", { required: true })}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg block w-full px-3 py-2.5 shadow-sm"
                                disabled={!district}
                            >
                                <option value="">Select an upazila</option>
                                {
                                    upazilas?.map((upazila, index) => <option key={index} value={upazila.name}>{upazila.name}</option>)
                                }
                            </select>
                        </div>

                        {/* Post Office */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Post Office<span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register("address.postOffice", { required: true })}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg block w-full px-3 py-2.5 shadow-sm"
                                disabled={!upazila}
                            >
                                <option value="">Select a post office</option>
                                {
                                    postOffices?.map((postOffice, index) => <option key={index} value={postOffice.name}>{postOffice.name}</option>)
                                }
                            </select>
                        </div>

                        {/* Postal Code */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Postal Code<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("address.postalCode", { required: true })}
                                placeholder="Auto-filled from post office"
                                value={postalCode}
                                readOnly
                                className="bg-gray-100 border border-[#d1d5db] text-[#111827] text-sm rounded-lg block w-full px-3 py-2.5 shadow-sm cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                {/* Professional Information */}
                <div className="bg-white p-6 rounded-xl border border-[#F3F4F6] my-6">
                    <h3 className="text-[#111827]">
                        Professional Information (Optional)
                    </h3>
                    <div className="grid grid-cols-12 gap-6 mt-6">
                        {/* Bio */}
                        <div className="col-span-12">
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Bio
                            </label>
                            <textarea
                                {...register("bio")}
                                placeholder="Brief about instructor"
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg block w-full px-3 py-2.5 shadow-sm"
                                rows={3}
                            />
                        </div>

                        {/* Experience */}
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Experience
                            </label>
                            <input
                                type="text"
                                {...register("experience")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                placeholder="e.g. 5 years of experience"
                            />
                        </div>

                        {/* Last Education */}
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Last Education
                            </label>
                            <input
                                type="text"
                                {...register("education")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                placeholder="e.g. Master's in Computer Science"
                            />
                        </div>

                        {/* Expertise */}
                        <div className="col-span-12">
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Expertise
                            </label>
                            <div className="grid grid-cols-12 gap-6">
                                <input
                                    type="text"
                                    {...register("expertise")}
                                    onKeyPress={handleKeyPress}
                                    className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af] col-span-8 md:col-span-11"
                                    placeholder="e.g. Web Development, Data Science"
                                />
                                <button
                                    type="button"
                                    onClick={handleExpertiseAdd}
                                    className="px-3 py-2.5 col-span-4 md:col-span-1 rounded-md bg-[#309255] cursor-pointer text-white hover:bg-[#267a43] text-sm shadow-sm flex items-center gap-2"
                                >
                                    <FiPlus className="text-white" size={20} /> <span>Add</span>
                                </button>
                            </div>

                            {expertiseList.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {expertiseList.map((expertise, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center bg-[#e0f2e9] text-[#256d45] px-3 py-1.5 rounded-full text-sm"
                                        >
                                            <span>{expertise}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleExpertiseRemove(index)}
                                                className="ml-2 text-[#256d45] hover:text-red-500 font-bold"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Social Links Section - ADDED */}
                <div className="bg-white p-6 rounded-xl border border-[#F3F4F6] my-6">
                    <h3 className="text-[#111827] mb-6">
                        Social Links (Optional)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* LinkedIn */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                LinkedIn
                            </label>
                            <input
                                type="url"
                                {...register("socialLinks.linkedin")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                placeholder="https://linkedin.com/in/username"
                            />
                        </div>

                        {/* Twitter */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Twitter
                            </label>
                            <input
                                type="url"
                                {...register("socialLinks.twitter")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                placeholder="https://twitter.com/username"
                            />
                        </div>

                        {/* Facebook */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Facebook
                            </label>
                            <input
                                type="url"
                                {...register("socialLinks.facebook")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                placeholder="https://facebook.com/username"
                            />
                        </div>

                        {/* Website */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                Website
                            </label>
                            <input
                                type="url"
                                {...register("socialLinks.website")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                placeholder="https://yourwebsite.com"
                            />
                        </div>

                        {/* YouTube */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                YouTube
                            </label>
                            <input
                                type="url"
                                {...register("socialLinks.youtube")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                placeholder="https://youtube.com/@channel"
                            />
                        </div>

                        {/* GitHub */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-[#111827]">
                                GitHub
                            </label>
                            <input
                                type="url"
                                {...register("socialLinks.github")}
                                className="bg-[#f9fafb] border border-[#d1d5db] text-[#111827] text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full px-3 py-2.5 shadow-sm placeholder:text-[#9ca3af]"
                                placeholder="https://github.com/username"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isPending}
                    className={`w-full ${isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#309255] hover:bg-[#278046]'} text-white font-medium py-2.5 rounded-lg transition`}
                >
                    {isPending ? 'Saving...' : 'Save Instructor'}
                </button>
            </form>
        </div>
    );
};

export default AddInstructor;