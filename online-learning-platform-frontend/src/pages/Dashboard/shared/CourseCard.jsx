import { FiPlayCircle } from "react-icons/fi";
import ProgressBar from "./ProgressBar";

const CourseCard = ({ thumbnail, title, instructor, progress }) => {
    return (
        <div className="border border-[#E5E7EB] p-3 rounded-xl shadow-sm">
            <img src={thumbnail} alt="Course thumbnail" className="rounded-lg h-60 w-full object-cover" />
            <div className="my-3">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-[#4A5565] text-sm my-2">By {instructor}</p>
                <div>
                    <div className="flex items-center justify-between text-sm font-semibold mb-3">
                        <p>progress</p>
                        <p className="text-[#309255]">{progress}%</p>
                    </div>
                    <ProgressBar value={`${progress}%`} />
                </div>

                <button className="flex items-center justify-center font-semibold gap-1 bg-[#309255] text-white px-4 py-3 rounded-xl mt-3 w-full hover:bg-[#267a43] transition-transform duration-500 cursor-pointer"><FiPlayCircle size={24} /> Continue Course</button>
            </div>
        </div>
    );
};

export default CourseCard;