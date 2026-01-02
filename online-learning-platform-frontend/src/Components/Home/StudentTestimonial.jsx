import HomePageHeadingSubHeading from "../Shared/HomePageHeadingSubHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const StudentTestimonial = () => {
    const testimonials = [
        {
            id: 1,
            name: "Tofaiel Hossain Tota",
            designation: "UI/UX Designer",
            image: "https://i.ibb.co.com/Kxg5dYBM/photo-2025-06-26-14-26-27.jpg",
            details:
                "The UI/UX courses were incredibly well structured. I learned modern design principles that improved my portfolio significantly.",
        },
        {
            id: 2,
            name: "Abhinash Kumar Shah",
            designation: "Full Stack Developer",
            image: "https://i.ibb.co.com/7PSKkXb/photo-2025-10-31-21-32-19.jpg",
            details:
                "This platform boosted my MERN stack skills. I built real-world projects and secured a remote internship soon after finishing the course.",
        },
        {
            id: 3,
            name: "Dabasis Das",
            designation: "Digital Marketing Specialist",
            image: "https://i.ibb.co.com/S7wSxqCg/photo-2025-10-17-17-29-01.jpg",
            details:
                "Very practical marketing lessons. The SEO and social media modules helped me grow my freelance client base quickly.",
        },
        {
            id: 4,
            name: "Hasan Mahmud",
            designation: "Graphics Designer",
            image: "https://i.pravatar.cc/150?img=15",
            details:
                "Amazing experience! The graphic design course improved my workflow and helped me deliver more high-quality designs.",
        },
        {
            id: 5,
            name: "Arfan Ahmed",
            designation: "Front-End Developer",
            image: "https://lh3.googleusercontent.com/a/ACg8ocLTMCJuBcTJWgjVDsNBl7Q2XqyGruF-s0aDCFrlfBzgIPrC_Jc=s96-c",
            details:
                "I learned React deeply through hands-on projects. The community support was great and helped me throughout the journey.",
        },
        {
            id: 6,
            name: "Rafiul Islam",
            designation: "Content Creator",
            image: "https://i.pravatar.cc/150?img=22",
            details:
                "The content creation and video editing modules were extremely helpful. My social media engagement improved a lot.",
        }
    ]
        ;

    return (
        <section className="max-w-[1440px] mx-auto my-20 px-4 2xl:px-0">
            <HomePageHeadingSubHeading
                subTitle="Student Testimonial"
                firstTitle="Feedback From"
                secondTitle="Student"
            />
            <div className="w-full py-10 relative">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{
                        clickable: true,
                        el: ".custom-swiper-pagination",
                    }}
                    spaceBetween={25}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="w-full"
                >
                    {testimonials.map((item) => (
                        <SwiperSlide key={item.id} className="h-auto!">
                            <div className="border border-[rgba(48,146,85,0.2)] rounded-xl p-5 bg-white h-full flex flex-col justify-between shadow-sm hover:shadow-md transition">
                                <p className="text-gray-600 text-base leading-relaxed mb-5">
                                    {item.details}
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-green-300"><img src={item.image} className="rounded-full" alt="" /></div>
                                    <div className="flex flex-col">
                                        <h5 className="text-lg font-semibold text-gray-800">
                                            {item.name}
                                        </h5>
                                        <span className="text-sm text-gray-500">
                                            {item.designation}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="custom-swiper-pagination absolute bottom-0 z-40 left-0 w-full flex justify-center" />

            </div>
        </section>
    );
};

export default StudentTestimonial;
