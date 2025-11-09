import { GiMagnifyingGlass } from "react-icons/gi";
import HomePageHeadingSubHeading from "../Shared/HomePageHeadingSubHeading";
import { GrDocumentText } from "react-icons/gr";
import { TbCertificate } from "react-icons/tb";

const HowItWork = () => {
    return (
        <section>
            <HomePageHeadingSubHeading subTitle="Over 1,235+ Course" firstTitle="How It" secondTitle="Work?" />

            <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-6">
                <div className="bg-[#e7f8ee] rounded-xl p-10 group">
                    <div className="p-4 text-[#3f9657] inline-block rounded-xl bg-white group-hover:text-white group-hover:bg-[#3f9657] transition-all duration-700">
                        <GiMagnifyingGlass size={30} />
                    </div>
                    <h2 className="text-2xl mt-6">Find Your Courses</h2>
                    <p className="text-gray-500 mt-3 text-justify">Explore thousands of skill-based courses designed for Bangladeshi learners. Learn at your own pace and build the future you want.</p>
                </div>

                <div>
                    <img src="https://htmldemo.net/edule/eduLe/assets/images/shape/shape-17.png" className="w-36" alt="" />
                </div>

                <div className="bg-[#e7f8ee] rounded-xl p-10 group">
                    <div className="p-4 text-[#3f9657] inline-block rounded-xl bg-white group-hover:text-white group-hover:bg-[#3f9657] transition-all duration-700">
                        <GrDocumentText size={30} />
                    </div>
                    <h2 className="text-2xl mt-6">Book A Seat</h2>
                    <p className="text-gray-500 mt-3 text-justify">Join live classes, workshops, and special training sessions. Reserve your seat easily and start learning without any hassle.</p>
                </div>
                <div>
                    <img src="https://htmldemo.net/edule/eduLe/assets/images/shape/shape-17.png" className="w-36" alt="" />
                </div>
                <div className="bg-[#e7f8ee] rounded-xl p-10 group">
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