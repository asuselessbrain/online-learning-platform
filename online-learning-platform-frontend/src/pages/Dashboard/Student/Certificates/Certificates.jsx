import { FiAward, FiBookOpen, FiCalendar, FiDownload, FiShare, FiShare2, FiTrendingUp } from "react-icons/fi";
import DashboardCard from "../../shared/DashboardCard";
import PageHeading from "../../shared/PageHeading";
import { useState } from "react";
import Pagination from "../../shared/Pagination";
import Certificate from "./Certificate";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import useProfile from "../../../../hooks/useProfile";

const Certificates = () => {
    const [page, setPage] = useState(1);
    const axiosSecure = useAxios()
    const { profileData, profileLoading } = useProfile()
    const summaryData = [
        {
            title: "Certificates Earned",
            count: "3",
            icon: FiAward,
            increase: "+1 this month",
            iconColor: "text-[#F59E0B]",
            iconBg: "bg-[#FFFBEB]",
        },
        {
            title: "In Progress",
            count: "3",
            icon: FiBookOpen,
            increase: "courses ongoing",
            iconColor: "text-[#3B82F6]",
            iconBg: "bg-[#EFF6FF]",
        },
        {
            title: "Average Score",
            count: "92%",
            icon: FiTrendingUp,
            increase: "across all courses",
            iconColor: "text-[#8B5CF6]",
            iconBg: "bg-[#F5F3FF]",
        },
    ];

    const skillsAcquired = ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"]


    const { data: certificateData, isLoading: certificateLoading } = useQuery({
        queryKey: ["userCertificates", profileData?._id],
        enabled: !!profileData?._id && !profileLoading,
        queryFn: async () => {
            const res = await axiosSecure(`/certificate/${profileData._id}`)
            return res.data.data
        }
    })

    const handleDownload = (url) => {
        const downloadUrl = url.replace("/upload/", "/upload/fl_attachment/");
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "certificate.png";
        link.click();
    };

    return (
        <div className="p-6">
            <PageHeading title="Certificates" subtitle="View and download your course completion certificates" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    summaryData.map((item, index) => (
                        <DashboardCard
                            key={index}
                            title={item.title}
                            count={item.count} icon={item.icon} increase={item.increase} iconColor={item.iconColor} iconBg={item.iconBg}
                        />
                    ))
                }
            </div>

            <div className="rounded-xl p-6 bg-white my-6">
                <p className="mb-2">Continue Learning</p>
                {
                    certificateLoading ? <p>Loading....</p> : <div>

                        {
                            certificateData?.data?.map((certificate, index) => (
                                <div key={index} className="border border-[#E5E7EB] p-4 rounded-xl shadow-sm hover:border-[#309255] transition-all duration-500 cursor-pointer flex items-start justify-between gap-6 w-full mb-6">
                                    <div className="p-6 rounded-xl bg-[#309255] text-white">
                                        <FiAward size={48} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{certificate.courseName}</h3>
                                        <p className="text-sm text-[#4A5565] mt-2">Instructor: {certificate.instructorName}</p>
                                        <div className="flex flex-col md:flex-row items-center justify-between my-3">
                                            <div className="text-[#6A7282] flex items-center gap-2">
                                                <FiCalendar />
                                                <div className="text-sm">
                                                    <p >Completed</p>
                                                    <p className="text-black">{new Date(certificate.issuedAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="text-[#6A7282] flex items-center gap-2">
                                                <FiAward className="text-[#F0B100]" />
                                                <div className="text-sm">
                                                    <p >Final Score</p>
                                                    <p className="text-[#309255]">95</p>
                                                </div>
                                            </div>
                                            <div className="text-[#6A7282] flex items-center gap-2">
                                                <div className="text-sm">
                                                    <p >Certificate ID</p>
                                                    <p className="text-black">{certificate.certificateId}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm mt-4">
                                            <p className="text-[#6A7282]">Skills Acquired</p>
                                            {
                                                skillsAcquired.map((skill, idx) => (
                                                    <p key={idx} className="inline-block mr-2 mt-2 rounded-full bg-[#E8F9EF] text-[#309255] px-4 py-2">{skill}</p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl border border-[#309255]">
                                            <FiShare2 size={26} />
                                        </div>
                                        <div onClick={() =>
                                            handleDownload(
                                                certificate.certificateUrl
                                            )
                                        } className="p-2 rounded-xl text-white bg-[#309255] border border-[#309255]">
                                            <FiDownload size={26} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }


            </div>
            <Certificate />
            {/* <Pagination page={page} setPage={setPage} pageNumbers={pageNumbers} totalPages={totalPages} /> */}
        </div>
    );
};

export default Certificates;