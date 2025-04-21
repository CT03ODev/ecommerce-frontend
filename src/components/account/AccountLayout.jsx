import ProfileCard from "./ProfileCard";
import AccountMenu from "./AccountMenu";

const AccountLayout = ({ children, title }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4">
                    <ProfileCard />
                    <AccountMenu />
                </div>
                <div className="md:w-3/4">
                    <h2 className="text-2xl font-semibold mb-6">{title}</h2>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AccountLayout;