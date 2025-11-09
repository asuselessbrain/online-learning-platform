import { HiOutlineBookOpen } from "react-icons/hi";
import img from "../../assets/images/shape-4.webp"
const Hero = () => {
    return (
        <section className="bg-[#eefbf3] px-4 2xl:px-0">
            <div className="max-w-[1440px] flex flex-col lg:flex-row items-center justify-between mx-auto pt-20 relative">
                <div className="z-20">
                    <p className="text-xl text-[#309255]">Start your favourite course</p>
                    <div className="relative lg:max-w-[410px]">
                        <h2 className="text-[40px] mt-6 font-semibold">Now learning from anywhere, and build your <span className="text-[#329357]">bright career.</span></h2>
                        <div className="flex items-center justify-end">
                            <img src={img} alt="icons" className="my-2 w-2/3" />
                        </div>
                    </div>
                    <p className="lg:max-w-[430px] text-xl text-gray-500 mt-14">It has survived not only five centuries but also the leap into electronic typesetting.</p>
                    <button className="mt-7 bg-[#329357] px-6 py-4 text-white rounded-md">Start A Course</button>
                </div>
                <div className="z-20">
                    <img src="https://htmldemo.net/edule/eduLe/assets/images/slider/slider-1.png" alt="" />
                </div>
                <div className="absolute h-[100px] md:h-[150px] w-[100px] md:w-[150px] rounded-full left-[5%] md:left-[15%] lg:left-[40%] xl:left-[50%] top-[70%] md:top-[50%] lg:top-[25%] transition-colors duration-300 z-10">
                    <div className="text-white flex flex-col items-center justify-center gap-1 md:gap-2 h-full rounded-full bg-[#309255] dark:bg-green-700 ">
                        <HiOutlineBookOpen size={24} />
                        <h2 className="text-xl md:text-3xl font-semibold md:font-bold">1,235</h2>
                        <p className="text-[10px] md:text-base">COURSES</p>
                    </div>
                    <div>
                        <img src="https://htmldemo.net/edule/eduLe/assets/images/shape/shape-6.png" alt="" />
                    </div>
                    <div className="hidden md:block absolute animation-arrow top-0">
                        <img src="https://htmldemo.net/edule/eduLe/assets/images/shape/shape-5.png" alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;