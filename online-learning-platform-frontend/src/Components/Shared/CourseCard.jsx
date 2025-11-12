import { FaRegClock } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";

const CourseCard = () => {
    return (
        <div className="border border-[rgba(48,146,85,0.2)] hover:border-[#309255] rounded-xl p-6 transition-all duration-700 h-auto!">
            <img src="https://htmldemo.net/edule/eduLe/assets/images/blog/blog-01.jpg" className="h-60 w-full object-fill rounded-xl" alt="" />
            <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-4">
                    <img src="https://lh3.googleusercontent.com/a/ACg8ocLTMCJuBcTJWgjVDsNBl7Q2XqyGruF-s0aDCFrlfBzgIPrC_Jc=s96-c" alt="Arfan Ahmed Name" className="rounded-full h-10 w-10" />
                    <h4 className="text-gray-500">Arfan Ahmed</h4>
                </div>
                <p className="py-2 px-4 rounded-md text-[#309255] hover:text-white bg-[#eefbf3] hover:bg-[#309255] transition-all duration-700">Science</p>
            </div>
            <h2 className="text-xl mt-4 hover:text-[#309255] transition-all duration-500">Data Science and Machine Learning with Python - Hands On!</h2>
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                    <FaRegClock className="text-[#309255]" size={24} />
                    <p>08 hr 15 mins</p>
                </div>
                <div className="flex items-center gap-2">
                    <FaBookOpenReader className="text-[#309255]" size={24} />
                    <p>29 Lectures</p>
                </div>
            </div>
            <div className="bg-[#eefbf3] p-4 rounded-lg mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-[#309255] font-semibold">$ 385.00</h2>
                    <h2 className="line-through text-gray-500">$ 440.00</h2>
                </div>
                <h2 className="text-[#309255] font-semibold">View Details</h2>
            </div>
        </div>
    );
};

export default CourseCard;