import img2 from "../../assets/images/shape-4.webp"
import img4 from "../../assets/images/login.png"
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { useState, useContext, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthContext";
import { toast } from "react-toastify";
import Loading from "../../Components/Shared/Loading";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { getFirebaseErrorMessage, getBackendErrorMessage } from "../../utils/errorMessages";

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const axiosPublic = useAxios()

    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const { createUser, updateUser, user: authUser, loading: authLoading, loginWithGoogle, deleteUserFromAuth } = useContext(AuthContext)
    const navigate = useNavigate()

    // Redirect authenticated users away from registration page
    useEffect(() => {
        if (!authLoading && authUser) {
            navigate("/", { replace: true });
        }
    }, [authUser, authLoading, navigate]);

    // Show loading while checking authentication
    if (authLoading) {
        return <Loading message="Checking authentication..." fullScreen={true} />;
    }

    // Don't render registration form if user is already authenticated
    if (authUser) {
        return null;
    }

    const handleSignUp = async (data) => {

        if (data.password !== data.confirmPassword) {
            toast.error("Password and confirm password must be match");
            return;
        }
        const image = data.profileImg[0];
        const formData = new FormData();

        formData.append('file', image)
        formData.append('upload_preset', "my_preset")


        try {
            setLoading(true);

            const res = await createUser(data.email, data.password)
            if (res.user) {

                const imgRes = await fetch('https://api.cloudinary.com/v1_1/dwduymu1l/image/upload', {
                    method: "POST",
                    body: formData
                })
                const imageData = await imgRes.json()
                const photoURL = imageData.secure_url
                if (!photoURL) {
                    throw new Error(imageData?.error?.message || "Image upload failed")
                }
                const payload = {
                    displayName: data.name,
                    photoURL
                }

                await updateUser(payload)
                const userData = {
                    name: data.name,
                    email: data.email,
                    photoUrl: photoURL,
                    password: data.password
                }

                const userRes = await axiosPublic.post('/users', userData)

                if (userRes.data.success) {
                    toast.success("Registration successful!")
                    navigate("/")
                }
                else {
                    // Backend responded but not successful
                    const msg = userRes?.data?.message || "Failed to register user in backend.";
                    toast.error(msg)
                    // Clean up auth user if backend failed to persist
                    await deleteUserFromAuth()
                }

            }
        } catch (error) {
            // Distinguish Firebase vs Backend/Axios errors
            const isFirebaseError = error?.code && String(error.code).startsWith("auth/")
            if (isFirebaseError) {
                toast.error(getFirebaseErrorMessage(error))
            } else {
                toast.error(getBackendErrorMessage(error))
            }
            await deleteUserFromAuth()
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setGoogleLoading(true);
            const res = await loginWithGoogle()
            if (res.user) {
                toast.success("Registration successful!")
                navigate("/")
            }
        } catch (error) {
            toast.error(getFirebaseErrorMessage(error))
        } finally {
            setGoogleLoading(false);
        }
    }

    return (
        <section className="flex items-center justify-center min-h-screen p-6 dark:bg-black dark:text-white transition-colors duration-300">
            <div className="max-w-7xl border border-[rgba(48,146,85,0.2)] mx-auto rounded-xl xl:p-16 w-full p-8 flex items-stretch justify-between gap-8 lg:gap-16 dark:border-gray-700 dark:bg-gray-900 transition-colors duration-300 z-10">
                <div className="bg-[#e7f8ee] rounded-xl flex-1 relative -z-20 hidden md:block dark:bg-gray-800 transition-colors duration-300">
                    <img src={img4} alt="women learning from this platform" className="h-full" />
                </div>
                <div className="flex-1">
                    <h2 className="text-3xl relative w-fit">Registration <span className="text-[#309255] dark:text-green-500">Now <img src={img2} className="w-24 right-0 absolute" alt="icon" /></span></h2>
                    <div className="mt-16">
                        <form onSubmit={handleSubmit(handleSignUp)}>
                            <div className="mb-6">
                                <label htmlFor="name" className="mb-2 block">Name</label>
                                <input type="text" {...register("name", { required: true })} placeholder="Name" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full mb-6 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-300" />
                                {
                                    errors.name && <p className="text-red-500 text-sm mt-1">This field is required</p>
                                }
                            </div>

                            <div className="mb-6">
                                <label htmlFor="email" className="mb-2 block">Email</label>
                                <input type="email" {...register("email", { required: true })} placeholder="Email" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full mb-6 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-300" />
                                {
                                    errors.email && <p className="text-red-500 text-sm mt-1">This field is required</p>
                                }
                            </div>

                            <div className="mb-6">
                                <label htmlFor="profileImg" className="mb-2 block">Profile Picture</label>
                                <input type="file" {...register("profileImg", { required: true })} className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full mb-6 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-300" />
                                {
                                    errors.profileImg && <p className="text-red-500 text-sm mt-1">This field is required</p>
                                }
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="mb-2 block">Password</label>
                                <div className="relative">
                                    <input type={showPassword ? 'text' : 'password'} {...register("password", {
                                        required: "Password is required", minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                                            message: "Password must include uppercase, number, and special character"
                                        }
                                    })} placeholder="Password" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full mb-6 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-300" />
                                    {
                                        showPassword ?
                                            <FaRegEyeSlash onClick={() => setShowPassword(false)} size={24} className="absolute top-[50%] right-4 -translate-y-[50%] text-gray-600/90 cursor-pointer" />
                                            : <FaRegEye onClick={() => setShowPassword(true)} size={24} className="absolute top-[50%] right-4 -translate-y-[50%] text-gray-600/90 cursor-pointer" />
                                    }
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="mb-2 block">Confirm Password</label>
                                <div className="relative">
                                    <input type={showConfirmPassword ? 'text' : 'password'} {...register("confirmPassword", { required: true })} placeholder="Confirm Password" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full mb-6 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-300" />
                                    {
                                        showConfirmPassword ?
                                            <FaRegEyeSlash onClick={() => setShowConfirmPassword(false)} size={24} className="absolute top-[50%] right-4 -translate-y-[50%] text-gray-600/90 cursor-pointer" />
                                            : <FaRegEye onClick={() => setShowConfirmPassword(true)} size={24} className="absolute top-[50%] right-4 -translate-y-[50%] text-gray-600/90 cursor-pointer" />
                                    }
                                </div>
                                {
                                    errors.confirmPassword && <p className="text-red-500 text-sm mt-1">This field is required</p>
                                }
                            </div>

                            <div className="mt-4 mb-10 flex items-center gap-2">
                                <input type="checkbox" className="accent-[#309255] dark:accent-green-400" {...register("terms", { required: true })} />
                                <p className="text-[#309255] dark:text-green-400 text-sm">Accept Term and Condition</p>
                            </div>



                            <input type="submit" value={loading ? "Creating account..." : 'Create an account'} disabled={authUser || loading} className="bg-[#309255] w-full p-4 rounded-xl dark:bg-green-600 text-white hover:bg-black/80 transition-all duration-700 cursor-pointer mb-4 dark:hover:bg-gray-700 disabled:opacity-60 flex items-center justify-center gap-2" />
                            <button onClick={handleGoogleLogin} disabled={authUser || googleLoading} className="bg-[#e7f8ee] w-full p-4 rounded-xl text-[#309255] hover:bg-black/80 dark:hover:bg-gray-700 hover:text-white transition-all duration-700 cursor-pointer flex items-center gap-2 justify-center disabled:opacity-60">
                                {googleLoading ? (
                                    <>
                                        <Loading size="sm" message="" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <FcGoogle size={24} />
                                        Login With Google
                                    </>
                                )}
                            </button>
                            <p className="text-sm flex items-center justify-center mt-4 text-gray-600 dark:text-gray-300">Already have an account? <Link to='/login' className="ml-1 underline text-[#309255] dark:text-green-400">{" "}Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registration;