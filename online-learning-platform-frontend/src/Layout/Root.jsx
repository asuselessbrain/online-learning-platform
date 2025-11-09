import { Outlet } from "react-router";
import NavBar from "../Components/Shared/NavBar";
import Footer from "../Components/Shared/Footer";

const Root = () => {
    return (
        <div>
            <div className="h-20">
                <NavBar />
            </div>
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;