import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductsList from "@/components/common/products-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
    params: Promise<{
        slug: string
    }>
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {

    const { slug } = await params;
    const productVariant = await db.query.productVariantTable.findFirst({
        where: eq(productVariantTable.slug, slug),
        with: {
            product: {
                with: {
                    variants: true
                }
            }
        }
    });

    if (!productVariant) {
        return notFound();
    }

    const likelyProductList = await db.query.productTable.findMany({
        where: eq(productTable.categoryId, productVariant.product.categoryId),
        with: {
            variants: true
        }
    })

    return (
        <>
            <Header />
            <div className="flex flex-col space-y-6">
                <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    src={productVariant.imageUrl}
                    alt={productVariant.name}
                    className="w-full h-auto object-cover"
                />
                <div className="px-5">
                    <VariantSelector productVariant={productVariant.product.variants} selectedVariantSlug={slug} />


                </div>
                <div className="px-5">
                    <h2 className="text-lg font-semibold">{productVariant.product.name}</h2>
                    <h3 className="text-sm text-muted-foreground">{productVariant.name}</h3>
                    <h4 className="text-lg font-semibold">
                        {formatCentsToBRL(productVariant.priceInCents)}
                    </h4>
                </div>

                <ProductActions productVariantId={productVariant.id} />
                <div className="px-5">
                    <p className="text-shadow-amber-600 text-sm">{productVariant.product.description}</p>
                </div>
                <ProductsList products={likelyProductList} title="Produtos relacionados" />
            </div>
            <Footer />
        </>
    )
}
export default ProductVariantPage;