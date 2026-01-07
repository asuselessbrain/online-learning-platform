import { useParams } from "react-router";
import { useState } from "react";
import { FiStar, FiCheckCircle, FiExternalLink, FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import PageHeading from "../../shared/PageHeading";
import useAxios from "../../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const formatDate = (iso) => {
  if (!iso) return "N/A";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

const maskNid = (nid) => {
  if (!nid) return "N/A";
  if (nid.length <= 4) return nid;
  return `${nid.slice(0, 4)}••••••${nid.slice(-2)}`;
};

const LabelValue = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-sm font-medium text-gray-900">{value || "N/A"}</span>
  </div>
);

const Badge = ({ children, className = "" }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>{children}</span>
);

const Pill = ({ children }) => (
  <span className="bg-[#e7f8ee] text-[#309255] px-2 py-1 rounded-full text-xs">{children}</span>
);

const SocialLink = ({ href, label }) => {
  if (!href) return <span className="text-sm text-gray-600">N/A</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-[#309255] hover:underline"
    >
      <FiExternalLink />
      <span className="text-sm">{label}</span>
    </a>
  );
};


const InstructorDetailsPage = () => {
  const { id } = useParams()

  const [showNid, setShowNid] = useState(false)

  const axiosSecure = useAxios()

  const { data: instructor, isLoading } = useQuery({
    queryKey: ["instructor", id],
    queryFn: async () => {
      const res = await axiosSecure(`/instructors/${id}`)
      return res.data.data
    }
  })


  return (
    <div className="p-6">
      <div className="flex items-center justify-between flex-col md:flex-row gap-4">
        <PageHeading title="Instructor Details" subtitle="View full instructor profile and information" />
      </div>
      {
        isLoading ? <p>Loading...</p> : <div className="mt-6 bg-white rounded-xl p-6">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{instructor.user?.name}</h2>
                <p className="text-sm text-gray-600">{instructor.user?.email}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge className={
                    instructor.status === "active"
                      ? "bg-green-100 text-green-700"
                      : instructor.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }>
                    {instructor.status}
                  </Badge>
                  {instructor.verified ? (
                    <Badge className="bg-blue-100 text-blue-700 inline-flex items-center gap-1">
                      <FiCheckCircle /> Verified
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-700">Not Verified</Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <LabelValue label="Rating" value={
                <span className="inline-flex items-center gap-1">
                  {Array.from({ length: Math.round(instructor.rating || 0) }).map((_, i) => (
                    <FiStar key={i} className="text-yellow-400" />
                  ))}
                  <span>{Number(instructor.rating || 0).toFixed(1)}</span>
                </span>
              } />
              <LabelValue label="Total Reviews" value={instructor.totalReviews || 0} />
              <LabelValue label="Courses Added" value={instructor.courses?.length || 0} />
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-800">Expertise</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {instructor.expertise?.length ? (
                  instructor.expertise.map((exp, idx) => <Pill key={idx}>{exp}</Pill>)
                ) : (
                  <span className="text-sm text-gray-600">N/A</span>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-800">Profile</h3>
                <LabelValue label="Phone" value={instructor.phoneNumber} />
                <LabelValue label="Gender" value={instructor.gender} />
                <LabelValue label="Date of Birth" value={formatDate(instructor.dob)} />
                <LabelValue
                  label="NID"
                  value={
                    <span className="inline-flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {showNid ? (instructor.nidNumber || "N/A") : maskNid(instructor.nidNumber)}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowNid((s) => !s)}
                        aria-label={showNid ? "Hide NID" : "Show NID"}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        {showNid ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </span>
                  }
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-800">Address</h3>
                <LabelValue label="District" value={instructor.address?.district} />
                <LabelValue label="Upazila" value={instructor.address?.upazila} />
                <LabelValue label="Post Office" value={instructor.address?.postOffice} />
                <LabelValue label="Postal Code" value={instructor.address?.postalCode} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-800">Bio</h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md min-h-12">{instructor.bio || "No bio provided."}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-800">Education & Experience</h3>
                <LabelValue label="Education" value={instructor.education} />
                <LabelValue label="Experience" value={instructor.experience} />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-800">Social Links</h3>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3">
                <SocialLink href={instructor.socialLinks?.website} label="Website" />
                <SocialLink href={instructor.socialLinks?.linkedin} label="LinkedIn" />
                <SocialLink href={instructor.socialLinks?.twitter} label="Twitter" />
                <SocialLink href={instructor.socialLinks?.facebook} label="Facebook" />
                <SocialLink href={instructor.socialLinks?.youtube} label="YouTube" />
                <SocialLink href={instructor.socialLinks?.github} label="GitHub" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <LabelValue label="Created" value={formatDate(instructor.createdAt)} />
              <LabelValue label="Updated" value={formatDate(instructor.updatedAt)} />
            </div>
          </div>
        </div>
      }

    </div>
  );
};

export default InstructorDetailsPage;
