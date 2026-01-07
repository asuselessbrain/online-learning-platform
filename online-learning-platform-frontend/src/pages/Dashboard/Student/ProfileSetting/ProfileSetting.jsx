import { FiLock, FiUser } from "react-icons/fi";
import PageHeading from "../../shared/PageHeading";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";

const ProfileSetting = () => {
    const { register, handleSubmit, control } = useForm();
    const districts = useLoaderData();

    const district = useWatch({ name: "district", control, defaultValue: "" });
    
    const upazilas = districts.find(d => d.name.toLowerCase() === district)?.upazilas || [];

    const upazila = useWatch({name: "upazila", control, defaultValue: ""});

    const postOffices = upazilas.find(u => u.name.toLowerCase() === upazila)?.postOffices || [];

    console.log(postOffices)


    
    const handleProfileSubmit = data => {
        console.log(data)
    }

    const handleChangePasswordChange = data => {
        console.log(data)
    }
    return (
        <div className="p-6">
            <PageHeading title="Setting" subtitle="Manage your account preferences and settings" />


            <div className="bg-white rounded-xl p-6 mt-6">
                <div className="flex items-center gap-4">
                    <div className="bg-[#E8F9EF] p-2 rounded-md">
                        <FiUser size={30} className="text-[#309255]" />
                    </div>
                    <h2>Profile Settings</h2>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2  gap-4 mt-4" onSubmit={handleSubmit(handleProfileSubmit)}>
                    <div>
                        <label htmlFor="displayName">Name</label>
                        <input type="text" {...register("displayName")} defaultValue="" className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2" id="displayName" placeholder="Your Name" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" {...register("email")} readOnly defaultValue="" className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2" id="email" placeholder="Your Email" />
                    </div>
                    <div>
                        <label htmlFor="mobileNumber">Mobile Number</label>
                        <input type="text" {...register("mobileNumber")} defaultValue="" className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2" id="mobileNumber" placeholder="Your Mobile Number" />
                    </div>
                    <div>
                        <label htmlFor="gender">Gender</label>
                        <select {...register("gender")} id="gender" className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2">
                            <option value="">Select your Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="district">Districts</label>
                        <select {...register("district")} id="district" className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2">
                            <option value="">Select your Districts</option>
                            {
                                districts.map((district, index) => (
                                    <option key={index} value={district.name.toLowerCase()}>{district.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div>
                        <label htmlFor="upazilas">Upazilas</label>
                        <select {...register("upazilas")} id="upazilas" className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2">
                            <option value="">Select your Upazilas</option>
                            {
                                upazilas.map((upazila, index) => (
                                    <option key={index} value={upazila.name.toLowerCase()}>{upazila.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div>
                        <label htmlFor="postOffice">Post Office</label>
                        <select {...register("postOffice")} id="postOffice" className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2">
                            <option value="">Select your Post Office</option>
                            {
                                postOffices.map((postOffice, index) => (
                                    <option key={index} value={postOffice.name.toLowerCase()}>{postOffice.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div>
                        <label htmlFor="streetAddress">Street Address</label>
                        <input type="text" {...register("streetAddress")} defaultValue="" className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2" id="streetAddress" placeholder="Your Details Address" />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="bio">Bio</label>
                        <textarea {...register("bio")} defaultValue="" className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2" rows={4} id="bio" placeholder="Your Details Address"></textarea>
                        {/* <input type="" {...register("streetAddress")} defaultValue="" className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2" id="streetAddress" placeholder="Your Details Address" /> */}
                    </div>
                    <div>
                        <input type="submit" value="Save Changes" className="bg-[#309255] text-white py-3 px-4 rounded-md mt-4 cursor-pointer hover:bg-[#267644] transition-all duration-500" />
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-xl p-6 my-6">
                <div className="flex items-center gap-4">
                    <div className="bg-[#FAF5FF] p-2 rounded-md">
                        <FiLock size={30} className="text-[#AD46FF]" />
                    </div>
                    <h2>Security</h2>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2  gap-4 mt-4" onSubmit={handleSubmit(handleChangePasswordChange)}>
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="currentPassword">Current Password</label>
                        <input type="password" {...register("currentPassword")} defaultValue="" className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2" id="currentPassword" placeholder="Enter Current Password" />
                    </div>
                    <div>
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" {...register("newPassword")} defaultValue="" className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2" id="newPassword" placeholder="Enter New Password" />
                    </div>
                    <div>
                        <label htmlFor="confirmNewPassword">Confirm New Password</label>
                        <input type="password" {...register("confirmNewPassword")} defaultValue="" className="border border-[#E5E7EB] p-2 rounded-md block w-full mt-2" id="confirmNewPassword" placeholder="Confirm New Password" />
                    </div>
                    <div>
                        <input type="submit" value="Update Password" className="bg-[#309255] text-white py-3 px-4 rounded-md mt-4 cursor-pointer hover:bg-[#267644] transition-all duration-500" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileSetting;