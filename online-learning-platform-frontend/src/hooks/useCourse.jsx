import { useQuery } from "@tanstack/react-query";
import useProfile from "./useProfile";
import useAxios from "./useAxios";

const useCourse = ({ searchTerm, page, status, category, sortOrder, sortBy, limit, isFree }) => {

    const { profileData } = useProfile()
    const axiosSecure = useAxios()

    const { data: courses, isLoading: courseLoading } = useQuery({
        queryKey: ["my-courses", searchTerm, page, status, category, sortOrder, sortBy, limit, isFree, profileData?._id],
        enabled: !!profileData?._id,
        queryFn: async () => {
            const res = await axiosSecure(`/enrolment/${profileData?._id}?searchTerm=${searchTerm}&page=${page}&limit=${limit}&status=${status}&category=${category}&sortOrder=${sortOrder}&sortBy=${sortBy}&isFree=${isFree}`);
            return res.data.data;
        },
    });
    return { courses, courseLoading }
};

export default useCourse;