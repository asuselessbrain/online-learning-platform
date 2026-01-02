import { FiBookOpen, FiUsers, FiAward, FiTarget, FiHeart, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import ReadyToStart from '../../Components/Home/ReadyToStart';

const About = () => {
    const features = [
        {
            icon: <FiBookOpen className="text-3xl text-[#309255]" />,
            title: "Quality Content",
            description: "Access high-quality courses created by industry experts and experienced instructors."
        },
        {
            icon: <FiUsers className="text-3xl text-[#309255]" />,
            title: "Community Learning",
            description: "Join a vibrant community of learners from around the world and collaborate on projects."
        },
        {
            icon: <FiAward className="text-3xl text-[#309255]" />,
            title: "Certified Learning",
            description: "Earn certificates upon course completion and showcase your skills to employers."
        },
        {
            icon: <FiTarget className="text-3xl text-[#309255]" />,
            title: "Personalized Learning",
            description: "Get personalized learning recommendations based on your interests and goals."
        }
    ];

    const stats = [
        { number: "10,000+", label: "Students Enrolled" },
        { number: "500+", label: "Expert Instructors" },
        { number: "1,200+", label: "Courses Available" },
        { number: "95%", label: "Student Satisfaction" }
    ];

    const team = [
        {
            name: "Arfan Ahmed",
            role: "CEO & Founder",
            image: "https://lh3.googleusercontent.com/a/ACg8ocLTMCJuBcTJWgjVDsNBl7Q2XqyGruF-s0aDCFrlfBzgIPrC_Jc=s96-c",
            bio: "Former tech executive with 15+ years in education technology."
        },
        {
            name: "Abhinash Kumar Shah",
            role: "Head of Content",
            image: "https://i.ibb.co.com/7PSKkXb/photo-2025-10-31-21-32-19.jpg",
            bio: "PhD in Education Technology, passionate about innovative learning methods."
        },
        {
            name: "Tofaiel Hossain Tota",
            role: "Lead Instructor",
            image: "https://i.ibb.co.com/Kxg5dYBM/photo-2025-06-26-14-26-27.jpg",
            bio: "Award-winning instructor with expertise in multiple programming languages."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-linear-to-br from-[#309255] to-[#256f42] text-white py-20">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        About OnlineLearn
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                        Empowering learners worldwide with quality education, innovative technology, and a passion for knowledge sharing.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-[#309255] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Explore Courses
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#309255] transition-colors">
                            Become an Instructor
                        </button>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16 bg-white">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            To democratize education by providing accessible, high-quality learning experiences that empower individuals to achieve their personal and professional goals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose OnlineLearn?</h3>
                            <p className="text-gray-600 mb-6">
                                Founded in 2020, OnlineLearn has been at the forefront of online education innovation. We believe that quality education should be accessible to everyone, regardless of their location, background, or schedule.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-gray-700">
                                    <FiHeart className="text-[#309255] mr-3 shrink-0" />
                                    Passionate about education excellence
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <FiHeart className="text-[#309255] mr-3 shrink-0" />
                                    Cutting-edge learning technology
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <FiHeart className="text-[#309255] mr-3 shrink-0" />
                                    Global community of learners
                                </li>
                            </ul>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-8">
                            <div className="grid grid-cols-2 gap-6">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-3xl font-bold text-[#309255] mb-2">{stat.number}</div>
                                        <div className="text-sm text-gray-600">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">What Sets Us Apart</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover the features that make OnlineLearn the preferred choice for online learning.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-16 bg-white">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our diverse team of educators, technologists, and innovators is dedicated to revolutionizing online learning.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="mb-4">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-32 h-32 rounded-full mx-auto object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                                <p className="text-[#309255] font-medium mb-3">{member.role}</p>
                                <p className="text-gray-600 text-sm">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Get In Touch</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Have questions? We'd love to hear from you. Reach out to our team for support or partnership opportunities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="bg-[#309255] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiMail className="text-2xl" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Us</h3>
                            <p className="text-gray-600">support@onlinelearn.com</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-[#309255] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiPhone className="text-2xl" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Call Us</h3>
                            <p className="text-gray-600">+1 (555) 123-4567</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-[#309255] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiMapPin className="text-2xl" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Visit Us</h3>
                            <p className="text-gray-600">123 Learning St<br />Education City, EC 12345</p>
                        </div>
                    </div>
                </div>
            </div>

            <ReadyToStart />
        </div>
    );
};

export default About;