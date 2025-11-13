import img from "../../assets/images/shape-26.webp"
import img2 from "../../assets/images/shape-4.webp"
import img3 from "../../assets/images/register-login.webp"
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import React, { useState, useContext } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../Providers/AuthContext";
const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    const { loginWithGoogle, loginWithEmail, loading, user } = useContext(AuthContext)
    const navigate = useNavigate()


    const handLogin = async (e) => {
        e.preventDefault()

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const res = await loginWithEmail(email, password)
            if (res.user) {
                toast.success("Login successful!")
            }
        } catch (error) {
            toast.error(error.message.split("/")[1].split(")")[0])
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const res = await loginWithGoogle()
            if (res.user) {
                toast.success("Login successful!")
                navigate("/")
            }
        } catch (error) {
            toast.error(error.message.split("/")[1].split(")")[0])
        }
    }

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
                    <div className="mt-12">
                        <form onSubmit={handLogin} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="sr-only">Email or username</label>
                                <input id="email" name="email" type="email" placeholder="Email or username" aria-label="Email or username" required className="block p-3 rounded-xl border border-[#309255]/20 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255] w-full mb-3 bg-white transition-colors duration-150" />
                            </div>

                            <div className="relative">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" aria-label="Password" required className="block p-3 rounded-xl border border-[#309255]/20 focus:outline-none focus:ring-2 focus:ring-[#309255]/30 focus:border-[#309255] w-full bg-white transition-colors duration-150" />
                                <button type="button" aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-gray-800" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                                    {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                                </button>
                            </div>

                            <div className="flex justify-end">
                                <Link to="/forgot" className="text-sm text-[#309255] underline">Forgot password?</Link>
                            </div>

                            <div>
                                <button type="submit" disabled={loading || user} className="w-full p-3 rounded-xl bg-[#309255] disabled:opacity-60 text-white font-medium hover:bg-[#267a46] transition-colors">{loading ? 'Loading...' : 'Login'}</button>
                            </div>

                            <div>
                                <button type="button" onClick={handleGoogleLogin} disabled={loading || user} className="w-full p-3 rounded-xl bg-[#e7f8ee] disabled:opacity-60 text-[#309255] flex items-center justify-center gap-2 hover:bg-[#d9f2df] transition-colors"><FcGoogle size={20} />Login with Google</button>
                            </div>

                            <p className="text-sm text-center text-gray-600">Don't have an account? <Link to='/registration' className="ml-1 underline text-[#309255]">Create Account</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;