import img from "../../assets/images/shape-26.webp"
import img2 from "../../assets/images/shape-4.webp"
import img3 from "../../assets/images/register-login.webp"
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
const Login = () => {
    return (
        <section className="flex items-center justify-center min-h-screen p-6">
            <div className="max-w-5xl border border-[rgba(48,146,85,0.2)] mx-auto rounded-xl xl:p-16 w-full p-8 flex items-center justify-between gap-8 lg:gap-16">
                <div className="bg-[#e7f8ee] rounded-xl flex-1 relative -z-20 pt-32 lg:px-16 md:px-6 hidden md:block">
                    <img src={img3} alt="women learning from this platform" />
                    <div className="w-[270px] h-[270px] bg-[#309255] rounded-full absolute md:left-[10%] lg:left-[15%] top-[25%] -z-10">
                        <img src={img} alt="arrow" className="absolute top-[45%] left-[20%] -translate-y-1/2" />
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="text-3xl relative w-fit">Login <span className="text-[#309255]">Now <img src={img2} className="w-24 right-0 absolute" alt="icon" /></span></h2>
                    <div className="mt-16">
                        <form>
                            <input type="email" placeholder="Usename or Email" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full mb-6" />

                            <input type="password" placeholder="Password" className="block p-4 rounded-xl border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full" />

                            <p className="text-[#309255] text-sm my-2 flex items-center justify-end underline cursor-pointer">Forget Password</p>

                            <button className="bg-[#309255] w-full p-4 rounded-xl text-white hover:bg-black/80 transition-all duration-700 cursor-pointer mb-4">Login</button>
                            <button className="bg-[#e7f8ee] w-full p-4 rounded-xl text-[#309255] hover:bg-black/80 hover:text-white transition-all duration-700 cursor-pointer flex items-center gap-2 justify-center"><FcGoogle size={24} />Login With Google</button>
                            <p className="text-sm flex items-center justify-center mt-4 text-gray-600">Don't have an account? <Link to='/registration' className="ml-1 underline text-[#309255]">{" "}Create Account</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;