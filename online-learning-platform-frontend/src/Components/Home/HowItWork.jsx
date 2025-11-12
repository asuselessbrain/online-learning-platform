import { GiMagnifyingGlass } from "react-icons/gi";
import HomePageHeadingSubHeading from "../Shared/HomePageHeadingSubHeading";
import { GrDocumentText } from "react-icons/gr";
import { TbCertificate } from "react-icons/tb";

const HowItWork = () => {
    return (
        <section className="my-20">
            <HomePageHeadingSubHeading subTitle="Over 1,235+ Course" firstTitle="How It" secondTitle="Work?" />

            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 px-4 2xl:px-0">
                <div className="bg-[#e7f8ee] rounded-xl p-10 group relative -z-20 overflow-hidden">
                    <img src="https://htmldemo.net/edule/eduLe/assets/images/shape/shape-15.png" className="absolute -z-10 -left-[6%] top-0" alt="" />
                    <div className="p-4 text-[#3f9657] inline-block rounded-xl bg-white group-hover:text-white group-hover:bg-[#3f9657] transition-all duration-700">
                        <GiMagnifyingGlass size={30} />
                    </div>
                    <h2 className="text-2xl mt-6">Find Your Courses</h2>
                    <p className="text-gray-500 mt-3 text-justify">Explore thousands of skill-based courses designed for Bangladeshi learners. Learn at your own pace and build the future you want.</p>
                </div>

                <div className="my-10 lg:my-0">
                    <img src="https://htmldemo.net/edule/eduLe/assets/images/shape/shape-17.png" className="w-36 rotate-90 lg:rotate-0" alt="" />
                </div>

                <div className="bg-[#e7f8ee] rounded-xl p-10 group relative -z-20 overflow-hidden">
                    <img src="https://htmldemo.net/edule/eduLe/assets/images/shape/shape-15.png" className="absolute -z-10 -right-[6%] top-0" alt="" />
                    <div className="p-4 text-[#3f9657] inline-block rounded-xl bg-white group-hover:text-white group-hover:bg-[#3f9657] transition-all duration-700">
                        <GrDocumentText size={30} />
                    </div>
                    <h2 className="text-2xl mt-6">Book A Seat</h2>
                    <p className="text-gray-500 mt-3 text-justify">Join live classes, workshops, and special training sessions. Reserve your seat easily and start learning without any hassle.</p>
                </div>
                <div className="my-10 lg:my-0">
                    <img src="https://htmldemo.net/edule/eduLe/assets/images/shape/shape-17.png" className="w-36 rotate-90 lg:rotate-0" alt="" />
                </div>
                <div className="bg-[#e7f8ee] rounded-xl p-10 group relative -z-20 overflow-hidden">
                    <img src="https://htmldemo.net/edule/eduLe/assets/images/shape/shape-15.png" className="absolute -z-10 -right-[12%] -bottom-1 rotate-y-180" alt="" />
                    <div className="p-4 text-[#3f9657] inline-block rounded-xl bg-white group-hover:text-white group-hover:bg-[#3f9657] transition-all duration-700">
                        <TbCertificate size={30} />
                    </div>
                    <h2 className="text-2xl mt-6">Get Certificate</h2>
                    <p className="text-gray-500 mt-3 text-justify">Complete your course and earn a recognized certificate that boosts your skills, career, and professional credibility.</p>
                </div>
            </div>
        </section>
    );
};

export default HowItWork;