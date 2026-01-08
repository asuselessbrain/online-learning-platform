import PageHeading from "../../shared/PageHeading";
import { useState } from "react";
import AddFAQModal from "./AddFAQModal";

const ManageFAQ = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="p-6">
            <div className="flex items-center justify-between flex-col md:flex-row gap-4">
                <PageHeading title="Manage FAQ" subtitle="View and manage all FAQ" />
                <button onClick={() => setOpen(!open)} className="px-4 py-2 rounded-md bg-[#309255] text-white hover:bg-[#267a43] text-sm shadow-sm">Add FAQ</button>
            </div>
            {
                open && <AddFAQModal setOpen={setOpen} />
            }
        </div>
    );
};

export default ManageFAQ;