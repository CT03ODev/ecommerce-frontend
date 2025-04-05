import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";
import NavLinks from "./NavLinks";
import AuthSection from "./AuthSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { request } from "../../../services/request";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function Header() {

    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: ['productCategories'],
        queryFn: async () => {
            const response = await request({
                url: '/product-categories',
                method: 'get',
            });
            return response;
        },
    });

    return (
        <div>
            <header className="py-4 shadow-sm bg-white">
                <div className="container flex items-center justify-between">
                    <Logo />
                    <SearchBar />
                    <UserActions />
                </div>
            </header>

            <nav className="bg-gray-800">
                <div className="container flex">
                    <div className="px-8 py-4 bg-primary flex items-center cursor-pointer relative group">
                        <FontAwesomeIcon icon={faBars} className="text-white" />
                        <span className="capitalize ml-2 text-white">All Categories</span>
                        <div
                            className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
                            {isLoading && (
                                <div className="px-6 py-3 text-gray-600">Loading...</div>
                            )}
                            {isError && (
                                <div className="px-6 py-3 text-red-600">Failed to load categories</div>
                            )}
                            {isSuccess &&
                                data.map((category) => (
                                    <Link
                                        key={category.id}
                                        to={`/category/${category.slug}`}
                                        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                                    >
                                        <span className="ml-6 text-gray-600 text-sm">{category.name}</span>
                                    </Link>
                                ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between flex-grow pl-12">
                        <NavLinks />
                        <AuthSection />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
