import img from "../../assets/images/shape-26.webp"
import img2 from "../../assets/images/shape-4.webp"
import img3 from "../../assets/images/register-login.webp"
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <section className="flex items-center justify-center min-h-screen p-6 dark:bg-black dark:text-white transition-colors duration-300">
            <div className="max-w-5xl border border-[rgba(48,146,85,0.2)] mx-auto rounded-xl xl:p-16 w-full p-8 flex items-center justify-between gap-8 lg:gap-16 dark:border-gray-700 dark:bg-gray-900 transition-colors duration-300 z-10">
                <div className="bg-[#e7f8ee] dark:bg-gray-800 rounded-xl flex-1 relative -z-20 pt-32 lg:px-16 md:px-6 hidden md:block transition-colors duration-300">
                    <img src={img3} alt="women learning from this platform" />
                    <div className="w-[270px] h-[270px] bg-[#309255] dark:bg-green-700 rounded-full absolute md:left-[10%] lg:left-[15%] top-[25%] -z-10 transition-colors duration-300">
                        <img src={img} alt="arrow" className="absolute top-[45%] left-[20%] -translate-y-1/2" />
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="text-3xl relative w-fit">Login <span className="text-[#309255] dark:text-green-500">Now <img src={img2} className="w-24 right-0 absolute" alt="icon" /></span></h2>
                    <div className="mt-16">
                        <form>
                            <input type="email" placeholder="Usename or Email" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full mb-6 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-300" />
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-300" />
                                {
                                    showPassword ?
                                        <FaRegEyeSlash onClick={() => setShowPassword(false)} size={24} className="absolute top-[50%] right-4 -translate-y-[50%] text-gray-600/90 dark:text-gray-400 cursor-pointer" />
                                        : <FaRegEye onClick={() => setShowPassword(true)} size={24} className="absolute top-[50%] right-4 -translate-y-[50%] text-gray-600/90 dark:text-gray-400 cursor-pointer" />
                                }
                            </div>

                            <p className="text-[#309255] dark:text-green-500 text-sm my-2 flex items-center justify-end underline cursor-pointer">Forget Password</p>

                            <button className="bg-[#309255] w-full p-4 rounded-xl dark:bg-green-600 text-white hover:bg-black/80 transition-all duration-700 cursor-pointer mb-4 dark:hover:bg-gray-700">Login</button>
                            <button className="bg-[#e7f8ee] w-full p-4 rounded-xl text-[#309255] hover:bg-black/80 dark:hover:bg-gray-700 hover:text-white transition-all duration-700 cursor-pointer flex items-center gap-2 justify-center"><FcGoogle size={24} />Login With Google</button>
                            <p className="text-sm flex items-center justify-center mt-4 text-gray-600 dark:text-gray-300">Don't have an account? <Link to='/registration' className="ml-1 underline text-[#309255] dark:text-green-400">{" "}Create Account</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;