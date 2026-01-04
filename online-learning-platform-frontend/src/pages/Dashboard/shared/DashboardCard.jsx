
const DashboardCard = ({ title, count, icon: Icon, increase, iconColor, iconBg }) => {
    return (
        <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-semibold">{title}</h4>
                    <h2 className="text-3xl my-2">{count}</h2>
                </div>
                {Icon && (
                    <div className={`p-2 rounded-xl ${iconColor} ${iconBg}`}>
                        <Icon size={24} />
                    </div>
                )}
            </div>
            <p className="mt-3 text-[#00A63E]">{increase}</p>
        </div>
    );
};

export default DashboardCard;