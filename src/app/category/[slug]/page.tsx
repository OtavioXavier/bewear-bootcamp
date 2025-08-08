import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductItem from "@/components/common/product-item";
import { db } from "@/db";
import { categoryTable } from "@/db/schema";

interface CategoryPageProps {
    params: Promise<{
        slug: string
    }>
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
    const { slug } = await params;
    const category = await db.query.categoryTable.findFirst({
        where: eq(categoryTable.slug, slug),
        with: {
            products: {
                with: {
                    variants: true
                }
            }
        }
    });

    const products = category?.products;


    if (!category) return notFound();

    return (
        <>
            <Header />
            <h2 className="font-semibold p-5">{category.name}</h2>
            <div className="grid grid-cols-2 gap-3">

                {products?.map((product) => (
                    <ProductItem key={product.id} product={product} textContainerClassName="max-w-full" />
                ))}
            </div>
            <Footer />
        </>
    );
}

export default CategoryPage;