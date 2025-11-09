import { HiOutlineBookOpen } from "react-icons/hi";
import img from "../../assets/images/shape-4.webp"
const Hero = () => {
    return (
        <section className="bg-[#eefbf3]">
            <div className="max-w-[1440px] flex items-center justify-between mx-auto pt-20 relative">
                <div>
                    <p className="text-xl text-[#309255]">Start your favourite course</p>
                    <div className="relative max-w-[410px]">
                        <h2 className="text-[40px] mt-6 font-semibold">Now learning from anywhere, and build your <span className="text-[#329357]">bright career.</span></h2>
                        <div className="flex items-center justify-end">
                            <img src={img} alt="icons" className="my-2 w-2/3" />
                        </div>
                    </div>
                    <p className="max-w-[430px] text-xl text-gray-500 mt-14">It has survived not only five centuries but also the leap into electronic typesetting.</p>
                    <button className="mt-7 bg-[#329357] px-6 py-4 text-white rounded-md">Start A Course</button>
                </div>
                <div>
                    <img src="https://htmldemo.net/edule/eduLe/assets/images/slider/slider-1.png" alt="" />
                </div>
                <div className="absolute h-[150px] w-[150px] rounded-full left-[50%] top-[25%] transition-colors duration-300">
                    <div className="text-white flex flex-col items-center justify-center gap-2 h-full rounded-full bg-[#309255] dark:bg-green-700 ">
                        <HiOutlineBookOpen size={24} />
                        <h2 className="text-3xl font-bold">1,235</h2>
                        <p>COURSES</p>
                    </div>
                    <div>
                        <img src="https://htmldemo.net/edule/eduLe/assets/images/shape/shape-6.png" alt="" />
                    </div>
                    <div className="absolute animation-arrow top-0">
                        <img src="https://htmldemo.net/edule/eduLe/assets/images/shape/shape-5.png" alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;