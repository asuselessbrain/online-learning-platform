import { use } from "react";
import { AuthContext } from "../Providers/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useProfile = () => {
    const { user } = use(AuthContext)
    const axiosSecure = useAxios()

    const { data: profileData, isLoading } = useQuery({
        queryKey: ['myProfile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}/profile`);
            return res.data.data;
        },
        enabled: !!user?.email,
    })
    return { profileData, profileLoading: isLoading }
};

export default useProfile;