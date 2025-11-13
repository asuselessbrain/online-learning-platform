import { FaRegClock } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { Link } from "react-router";

const CourseCard = ({course }) => {
    console.log(course.thumbnail)
    return (
        <div className="border border-[rgba(48,146,85,0.2)] hover:border-[#309255] rounded-xl p-6 transition-all duration-700 h-auto!">
            <Link to={`/courses/${course?._id}`}>
                <img src={course?.thumbnail} alt="" />
            </Link>
            <div className="flex items-center justify-between mt-6 mb-4">
                <div className="flex items-center gap-4">
                    <img src={course?.instructorPhoto} alt="Arfan Ahmed Name" className="rounded-full h-10 w-10" />
                    <h4 className="text-gray-500">{course?.instructorName}</h4>
                </div>
                <p className="py-2 px-4 rounded-md text-[#309255] hover:text-white bg-[#eefbf3] hover:bg-[#309255] transition-all duration-700">{course?.category}</p>
            </div>
            <Link to={`/courses/${course?._id}`} className="text-xl mt-4 hover:text-[#309255] transition-all duration-500">{course?.title}</Link>
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                    <FaRegClock className="text-[#309255]" size={24} />
                    <p>{course?.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                    <FaBookOpenReader className="text-[#309255]" size={24} />
                    <p>29 Lectures</p>
                </div>
            </div>
            <div className="bg-[#eefbf3] p-4 rounded-lg mt-6 flex items-center justify-between gap-10">
                <div className="flex items-center gap-2">
                    <h2 className="text-[#309255] font-semibold">{course?.price} Tk</h2>
                    <h2 className="line-through text-gray-500 text-sm">440.00 Tk</h2>
                </div>
                <Link to={`/courses/${course?._id}`} className="text-[#309255] font-semibold text-sm">View Details</Link>
            </div>
        </div>
    );
};

export default CourseCard;