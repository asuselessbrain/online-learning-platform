import { use, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/images/logo.png"
import { AuthContext } from "../../Providers/AuthContext";
import { toast } from "react-toastify";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const { user, logout } = use(AuthContext)

    const menuItems = [
        { path: "/", name: "Home" },
        { path: "/courses", name: "Courses" },
        { path: "/about", name: "About" },
        { path: "/contact-us", name: "Contact Us" },
    ]

    const handelLogout = async () => {
        try {
            await logout();
            toast.success("Logout successful!")
        } catch (error) {
            toast.error(error.message.split("/")[1].split(")")[0])
        }
    }

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-[1440px] flex flex-wrap items-center justify-between mx-auto p-4">
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

                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {
                        user ? <button
                            type="button"
                            onClick={handelLogout}
                            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-500/50 font-medium rounded text-sm cursor-pointer px-4 py-2 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-500/50"
                        >
                            Logout
                        </button> : <Link to="/login">
                            <button
                                type="button"
                                className="text-white bg-[#2d8d54] hover:bg-[#267348] focus:ring-4 focus:outline-none focus:ring-[#2d8d54]/50 font-medium rounded text-sm cursor-pointer px-4 py-2 text-center dark:bg-[#2d8d54] dark:hover:bg-[#267348] dark:focus:ring-[#2d8d54]/50"
                            >
                                Login
                            </button></Link>
                    }
                    <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? "flex" : "hidden"
                        }`}
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                        {
                            menuItems.map(item => (<li key={item.name}>
                                <NavLink to={item.path}
                                    className={({ isActive }) =>
                                        isActive ? "block py-2 px-3 text-white bg-[#2d8d54] rounded-sm md:bg-transparent md:text-[#2d8d54] md:p-0 md:dark:text-green-500" : "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#2d8d54] md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>))
                        }

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
