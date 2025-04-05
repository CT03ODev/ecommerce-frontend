import { useParams } from "react-router-dom";

function Category() {
    const { categorySlug } = useParams(); // Extract categorySlug from the route

    return (
        <div>
            <h1>Category Page</h1>
            <p>Category Slug: {categorySlug}</p>
        </div>
    );
}

export default Category;