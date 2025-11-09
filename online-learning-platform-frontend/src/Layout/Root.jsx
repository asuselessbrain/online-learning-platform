import { Outlet } from "react-router";
import NavBar from "../Components/Shared/NavBar";

const Root = () => {
    return (
        <div>
            <div className="h-20">
                <NavBar />
            </div>
            <Outlet />
        </div>
    );
};

export default Root;