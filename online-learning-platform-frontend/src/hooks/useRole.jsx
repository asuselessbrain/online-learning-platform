import { use } from "react";
import useAxios from "./useAxios";
import { AuthContext } from "../Providers/AuthContext";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
    const { user } = use(AuthContext)
    const axiosPublic = useAxios()

    const { data: role, isLoading } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}/role`)
            return res.data.data
        }
    })
    return { role, isLoading }
};

export default useRole;