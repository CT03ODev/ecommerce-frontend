import { Link } from "react-router-dom";

function ProductCategoryCard({ category }) {
    return (
        <div className="relative rounded-sm overflow-hidden group">
            <img src={category.thumbnail_url} alt={category.slug} className="w-full" />
            <Link to={`/shop?category=${category.id}`}
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
                    {category.name}
                </Link>
        </div>
    );
}

export default ProductCategoryCard;