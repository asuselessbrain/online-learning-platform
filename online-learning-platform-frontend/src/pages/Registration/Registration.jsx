import img2 from "../../assets/images/shape-4.webp"
import img4 from "../../assets/images/login.png"
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { use, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthContext";
import { toast } from "react-toastify";

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        image: "",
        password: "",
        confirmPassword: ""
    });

    const { createUser, updateUser, user } = use(AuthContext)
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault();

        const name = e.target.name.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const image = e.target.profileImg.files[0];

        const newErrors = {};

        if (!name) newErrors.name = "Name is required";

        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email))
            newErrors.email = "Invalid email address";

        if (!image) newErrors.image = "Profile picture is required";

        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters";
        else if (!/[A-Z]/.test(password)) {
            newErrors.password = "Password must contain at least one uppercase letter";
        }
        else if (!/[a-z]/.test(password)) {
            newErrors.password = "Password must contain at least one lowercase letter";
        }

        if (!confirmPassword)
            newErrors.confirmPassword = "Confirm Password is required";
        else if (password !== confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const formData = new FormData();

        formData.append('file', image)
        formData.append('upload_preset', "my_preset")

        console.log("VALID ✔", { name, email, password, confirmPassword, image });



        try {
            const res = await createUser(email, password)
            if (res.user) {
                const imgRes = await fetch('https://api.cloudinary.com/v1_1/dwduymu1l/image/upload', {
                    method: "POST",
                    body: formData
                })
                const data = await imgRes.json()
                const photoURL = data.secure_url

                const payload = {
                    displayName: name,
                    photoURL
                }

                await updateUser(payload)

                toast.success("Registration successful!")
                navigate("/")
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message.split("/")[1].split(")")[0])
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen p-6 dark:bg-black dark:text-white transition-colors duration-300">
            <div className="max-w-7xl border border-[rgba(48,146,85,0.2)] mx-auto rounded-xl xl:p-16 w-full p-8 flex items-stretch justify-between gap-8 lg:gap-16 dark:border-gray-700 dark:bg-gray-900 transition-colors duration-300 z-10">
                <div className="bg-[#e7f8ee] rounded-xl flex-1 relative -z-20 hidden md:block dark:bg-gray-800 transition-colors duration-300">
                    <img src={img4} alt="women learning from this platform" className="h-full" />
                </div>
                <div className="flex-1">
                    <h2 className="text-3xl relative w-fit">Registration <span className="text-[#309255] dark:text-green-500">Now <img src={img2} className="w-24 right-0 absolute" alt="icon" /></span></h2>
                    <div className="mt-16">
                        <form onSubmit={handleSignUp}>
                            <div className="mb-6">
                                <label htmlFor="name" className="mb-2 block">Name</label>
                                <input type="text" name="name" placeholder="Name" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full mb-6 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-300" />
                                {
                                    errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                }
                            </div>

                            <div className="mb-6">
                                <label htmlFor="email" className="mb-2 block">Email</label>
                                <input type="email" name="email" placeholder="Email" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full mb-6 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-300" />
                                {
                                    errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                }
                            </div>

                            <div className="mb-6">
                                <label htmlFor="profileImg" className="mb-2 block">Profile Picture</label>
                                <input type="file" name="profileImg" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full mb-6 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-300" />
                                {
                                    errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                                }
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="mb-2 block">Password</label>
                                <div className="relative">
                                    <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full mb-6 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-300" />
                                    {
                                        showPassword ?
                                            <FaRegEyeSlash onClick={() => setShowPassword(false)} size={24} className="absolute top-[50%] right-4 -translate-y-[50%] text-gray-600/90 cursor-pointer" />
                                            : <FaRegEye onClick={() => setShowPassword(true)} size={24} className="absolute top-[50%] right-4 -translate-y-[50%] text-gray-600/90 cursor-pointer" />
                                    }
                                </div>
                                {
                                    errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                }
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="mb-2 block">Confirm Password</label>
                                <div className="relative">
                                    <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full mb-6 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-300" />
                                    {
                                        showConfirmPassword ?
                                            <FaRegEyeSlash onClick={() => setShowConfirmPassword(false)} size={24} className="absolute top-[50%] right-4 -translate-y-[50%] text-gray-600/90 cursor-pointer" />
                                            : <FaRegEye onClick={() => setShowConfirmPassword(true)} size={24} className="absolute top-[50%] right-4 -translate-y-[50%] text-gray-600/90 cursor-pointer" />
                                    }
                                </div>
                                {
                                    errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                                }
                            </div>

                            <div className="mt-4 mb-10 flex items-center gap-2">
                                <input type="checkbox" className="accent-[#309255] dark:accent-green-400" required />
                                <p className="text-[#309255] dark:text-green-400 text-sm">Accept Term and Condition</p>
                            </div>



                            <button disabled={user} className="bg-[#309255] w-full p-4 rounded-xl dark:bg-green-600 text-white hover:bg-black/80 transition-all duration-700 cursor-pointer mb-4 dark:hover:bg-gray-700 disabled:cursor-not-allowed">Create an account</button>
                            <button disabled={user} className="bg-[#e7f8ee] w-full p-4 rounded-xl text-[#309255] hover:bg-black/80 dark:hover:bg-gray-700 hover:text-white transition-all duration-700 cursor-pointer flex items-center gap-2 justify-center disabled:cursor-not-allowed"><FcGoogle size={24} />Login With Google</button>
                            <p className="text-sm flex items-center justify-center mt-4 text-gray-600 dark:text-gray-300">Already have an account? <Link to='/login' className="ml-1 underline text-[#309255] dark:text-green-400">{" "}Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registration;