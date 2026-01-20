import { Outlet } from "react-router";
import NavBar from "../Components/Shared/NavBar";
import Footer from "../Components/Shared/Footer";
import useRole from "../hooks/useRole";
import Loading from "../Components/Shared/Loading";
import { use } from "react";
import { AuthContext } from "../Providers/AuthContext";

const Root = () => {
    const { loading } = use(AuthContext)
    const { isLoading } = useRole()
    return (
        <>
            {
                isLoading || loading ? <div className="bg-linear-to-b from-[#e7f8ee] to-white p-4 sm:p-6 font-sans text-gray-900 min-h-[calc(100vh-48px)] m-6 rounded-xl flex items-center justify-center">
                    <Loading message="Loading dashboard data..." fullScreen={false} />
                </div> : <div>
                    <div className="h-20">
                        <NavBar />
                    </div>
                    <Outlet />
                    <Footer />
                </div>
            }
        </>

    );
};

export default Root;