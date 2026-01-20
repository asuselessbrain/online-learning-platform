import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useProfile from "./useProfile";

const useStudentDashboardData = () => {
    const { profileData } = useProfile()
    const axiosSecure = useAxios()

    const { data: studentStats, isLoading } = useQuery({
        queryKey: ['studentDashboardData', profileData?._id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/dashboard-data/student/${profileData?._id}`);
            return res.data.data;
        },
        enabled: !!profileData?._id,
    })
    return { studentStats, studentStatsLoading: isLoading }
};

export default useStudentDashboardData;