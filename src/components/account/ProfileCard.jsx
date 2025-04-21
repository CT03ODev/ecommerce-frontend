import useAuthStore from "../../stores/authStore";

const ProfileCard = () => {
    const { user } = useAuthStore();

    return (
        <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <img src={user.avatar || '/default-avatar.png'} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div>
                <h2 className="text-lg font-semibold">Hello,</h2>
                <p>{user.name}</p>
            </div>
        </div>
    );
};

export default ProfileCard;