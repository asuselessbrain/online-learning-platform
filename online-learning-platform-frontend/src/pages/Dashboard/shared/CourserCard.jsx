import { FiBookOpen, FiClock, FiPlayCircle, FiStar } from "react-icons/fi";
import ProgressBar from "./ProgressBar";

const CourseCard = ({ thumbnail, title, instructor, progress, lesson, time, rating }) => {
    return (
        <div className="border border-[#E5E7EB] p-3 rounded-xl shadow-sm h-full flex flex-col">
            <img src={thumbnail} alt="Course thumbnail" className="rounded-lg h-60 w-full object-cover" />
            <div className="my-3 h-full flex flex-col flex-1">
                <h3 className="text-xl font-semibold">{title}</h3>
                <div className="mt-auto">
                    <p className="text-[#4A5565] text-sm my-2">By {instructor}</p>

                    {
                        lesson && time && rating && (
                            <div className="text-[#4A5565] flex items-center gap-4 text-sm my-4">
                                <p className="flex items-center gap-1"><FiBookOpen className="text-sm" /> {lesson} lessons</p>
                                <p className="flex items-center gap-1"><FiClock className="text-sm" /> {time} hours</p>
                                <p className="flex items-center gap-1"><FiStar className="text-sm" /> {rating}</p>
                            </div>
                        )
                    }
                    <div className="mb-3">
                        <div className="flex items-center justify-between text-sm font-semibold mb-3">
                            <p>progress</p>
                            <p className="text-[#309255]">{progress}%</p>
                        </div>
                        <ProgressBar value={`${progress}%`} />
                    </div>

                    <button className="flex items-center justify-center font-semibold gap-1 bg-[#309255] text-white px-4 py-3 rounded-xl w-full hover:bg-[#267a43] transition-transform duration-500 cursor-pointer"><FiPlayCircle size={24} /> Continue Course</button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;