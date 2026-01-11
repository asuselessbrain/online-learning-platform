import CourseCard from "../Shared/CourseCard";
import Loading from "../Shared/Loading";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";


const PopularCourses = () => {
    const axiosPublic = useAxios()
    const { data, isLoading } = useQuery({
        queryKey: ['popular-courses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/new-courses/user/courses')
            return res.data.data
        }
    })

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
                    {isLoading ? (
                        <div className="col-span-full">
                            <Loading message="Loading popular courses..." size="md" />
                        </div>
                    ) : (
                        data && data?.data.slice(0, 6).map((course) => (
                            <CourseCard key={course._id} course={course} />
                        ))
                    )}
                </div>
                <Link to="/courses" className="flex items-center justify-center">
                    <button className="bg-[#e7f8ee] text-[#309255] hover:text-white hover:bg-[#309255] p-4 rounded-lg mt-6 transition-all duration-700 cursor-pointer dark:hover:bg-gray-700">Other Courses</button>
                </Link>
            </div>
        </section>
    );
};

export default PopularCourses;