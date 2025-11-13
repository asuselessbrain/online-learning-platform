import { Link } from "react-router";
import logo from "../../assets/images/logo.png"
import { MdOutlineEmail, MdOutlineFacebook, MdOutlinePhone } from "react-icons/md";
import { FiFacebook } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
    return (
        <section className="bg-[#e7f8ee] py-10">
            <div className="max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 xl:px-0 mb-6">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img
                            src={logo}
                            className="h-12 w-16"
                            alt="EduLe Logo"
                        />
                        <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white">
                            Edu<span className="text-[#2d8d54]">Le</span>
                        </span>
                    </Link>
                    <h2 className="text-2xl font-semibold">Category</h2>
                    <h2 className="text-2xl font-semibold">Quick Links</h2>
                    <h2 className="text-2xl font-semibold">Subscribe</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 xl:px-0">
                    <div>
                        <address>House 12, Road 4 <br />
                            Dhanmondi, Dhaka – 1209 <br />
                            Bangladesh</address>
                        <p className="flex items-center gap-2 mt-10 text-[#707a7c]"><MdOutlineEmail size={24} className="text-[#2d8d54]" />support@edule.com</p>
                        <p className="flex items-center gap-2 mt-3 text-[#707a7c]"><MdOutlinePhone size={24} className="text-[#2d8d54]" />+880 1700-000000</p>

                        <div className="flex items-center gap-4 mt-10">
                            <FiFacebook size={24} className="text-[#707a7c] hover:text-[#2d8d54] cursor-pointer" />
                            <FaXTwitter size={24} className="text-[#707a7c] hover:text-[#2d8d54] cursor-pointer" />
                            <CiLinkedin size={24} className="text-[#707a7c] hover:text-[#2d8d54] cursor-pointer" />
                            <FaInstagram size={24} className="text-[#707a7c] hover:text-[#2d8d54] cursor-pointer" />
                        </div>
                    </div>
                    <div>
                        <ul className="text-[#707a7c]">
                            <Link to="" className="hover:text-[#2d8d54]"><li className="mb-4">Creative Writing</li></Link>
                            <Link to="" className="hover:text-[#2d8d54]"><li className="mb-4">Film & Video</li></Link>
                            <Link to="" className="hover:text-[#2d8d54]"><li className="mb-4">Graphic Design</li></Link>
                            <Link to="" className="hover:text-[#2d8d54]"><li className="mb-4">UI/UX Design</li></Link>
                            <Link to="" className="hover:text-[#2d8d54]"><li className="mb-4">Business Analytics</li></Link>
                            <Link to="" className="hover:text-[#2d8d54]"><li className="mb-4">Marketing</li></Link>
                        </ul>
                    </div>
                    <div>
                        <ul className="text-[#707a7c]">
                            <Link to="" className="hover:text-[#2d8d54]"><li className="mb-4">Privacy Policy</li></Link>
                            <Link to="" className="hover:text-[#2d8d54]"><li className="mb-4">Discussion</li></Link>
                            <Link to="" className="hover:text-[#2d8d54]"><li className="mb-4">Terms & Conditions</li></Link>
                            <Link to="" className="hover:text-[#2d8d54]"><li className="mb-4">Customer Support</li></Link>
                            <Link to="" className="hover:text-[#2d8d54]"><li className="mb-4">Course FAQ’s</li></Link>
                        </ul>
                    </div>
                    <div>
                        <p className="text-[#707a7c]">
                            Empower your learning journey with updated course news, tips, and exclusive offers.
                            Stay connected with us.
                        </p>
                        <form>
                            <input type="email" placeholder="Email here" className="bg-white p-4 rounded-md block border border-[rgba(48,146,85,0.2)] focus:outline-none focus:ring-0 focus:border-[rgba(48,146,85,0.2)] w-full mt-10" />
                            <button className="mt-6 bg-[#309255] px-6 py-4 text-white rounded-md">Start A Course</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;