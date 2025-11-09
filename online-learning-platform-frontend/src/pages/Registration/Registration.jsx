import img2 from "../../assets/images/shape-4.webp"
import img4 from "../../assets/images/login.png"
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    return (
        <section className="flex items-center justify-center min-h-screen p-6">
            <div className="max-w-7xl border border-[rgba(48,146,85,0.2)] mx-auto rounded-xl xl:p-16 w-full p-8 flex items-stretch justify-between gap-8 lg:gap-16">
                <div className="bg-[#e7f8ee] rounded-xl flex-1 relative -z-20 hidden md:block">
                    <img src={img4} alt="women learning from this platform" className="h-full" />
                </div>
                <div className="flex-1">
                    <h2 className="text-3xl relative w-fit">Registration <span className="text-[#309255]">Now <img src={img2} className="w-24 right-0 absolute" alt="icon" /></span></h2>
                    <div className="mt-16">
                        <form>
                            <div className="mb-6">
                                <label htmlFor="name" className="mb-2 block">Name</label>
                                <input type="text" name="name" placeholder="Name" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="email" className="mb-2 block">Email</label>
                                <input type="email" name="email" placeholder="Email" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="profileImg" className="mb-2 block">Profile Picture</label>
                                <input type="file" name="profileImg" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="mb-2 block">Password</label>
                                <div className="relative">
                                    <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full" />
                                    {
                                        showPassword ?
                                            <FaRegEyeSlash onClick={() => setShowPassword(false)} size={24} className="absolute top-[50%] right-4 -translate-y-[50%] text-gray-600/90 cursor-pointer" />
                                            : <FaRegEye onClick={() => setShowPassword(true)} size={24} className="absolute top-[50%] right-4 -translate-y-[50%] text-gray-600/90 cursor-pointer" />
                                    }
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="mb-2 block">Confirm Password</label>
                                <div className="relative">
                                    <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full" />
                                    {
                                        showConfirmPassword ?
                                            <FaRegEyeSlash onClick={() => setShowConfirmPassword(false)} size={24} className="absolute top-[50%] right-4 -translate-y-[50%] text-gray-600/90 cursor-pointer" />
                                            : <FaRegEye onClick={() => setShowConfirmPassword(true)} size={24} className="absolute top-[50%] right-4 -translate-y-[50%] text-gray-600/90 cursor-pointer" />
                                    }
                                </div>
                            </div>

                            <div className="mt-4 mb-10 flex items-center gap-2">
                                <input type="checkbox" className="accent-[#309255]" />
                                <p className="text-[#309255] text-sm">Accept Term and Condition</p>

                            </div>



                            <button className="bg-[#309255] w-full p-4 rounded-xl text-white hover:bg-black/80 transition-all duration-700 cursor-pointer mb-4">Create an account</button>
                            <button className="bg-[#e7f8ee] w-full p-4 rounded-xl text-[#309255] hover:bg-black/80 hover:text-white transition-all duration-700 cursor-pointer flex items-center gap-2 justify-center"><FcGoogle size={24} />Login With Google</button>
                            <p className="text-sm flex items-center justify-center mt-4 text-gray-600">Already have an account? <Link to='/login' className="ml-1 underline text-[#309255]">{" "}Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registration;