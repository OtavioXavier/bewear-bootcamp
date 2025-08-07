"use client"

import { productTable, productVariantTable } from "@/db/schema";

import ProductItem from "./product-item";

interface ProductsListProps {
    title: string;
    products: (typeof productTable.$inferSelect & {
        variants: (typeof productVariantTable.$inferSelect)[];
    })[];
}

const ProductsList = ({products, title}: ProductsListProps) => {
    return (
        <div className="space-y-6">
            <h3 className="font-bold">{title}</h3>
            {products.map((product) => (
                <ProductItem product={product} key={product.id}/>
            ))}
        </div>
    );
}

export default ProductsList;