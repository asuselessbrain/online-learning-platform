import { useEffect } from "react";
import CourseCard from "../Shared/CourseCard";
import axios from "axios";
import { useState } from "react";


const PopularCourses = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);

                const res = await axios.get(`https://online-learning-platform-backend-two.vercel.app/api/v1/courses`);
                setCourse(res.data.data)
                setError(null);
            } catch {
                setError('Failed to load courses');
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);
    return (
        <section className="my-20 px-4 2xl:px-0">
            <div className="max-w-[1440px] mx-auto">
                <h2 className="text-[40px] mt-2 mb-10">
                    Popular{" "}
                    <span className="relative inline-block text-[#309255]">
                        Courses
                        <img
                            src="https://htmldemo.net/edule/eduLe/assets/images/shape/shape-11.png"
                            alt="icons"
                            className="absolute left-0 top-full mt-1"
                        />
                    </span>
                    {" "} of Edule
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6">
                    {
                        course && course.slice(0, 6).map((course) => (
                            <CourseCard key={course._id} course={course} />
                        ))
                    }
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-[#e7f8ee] text-[#309255] hover:text-white hover:bg-[#309255] p-4 rounded-lg mt-6 transition-all duration-700 cursor-pointer dark:hover:bg-gray-700">Other Courses</button>
                </div>
            </div>
        </section>
    );
};

export default PopularCourses;