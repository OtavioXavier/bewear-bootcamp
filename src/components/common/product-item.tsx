import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

interface ProductItemProps {
    product: typeof productTable.$inferSelect & {
            variants: (typeof productVariantTable.$inferSelect)[];
        };
    textContainerClassName?: string
}

const ProductItem = ({product, textContainerClassName}: ProductItemProps) => {
    const firstVariant = product.variants[0];
    const firstVariantPriceInCents = formatCentsToBRL(firstVariant.priceInCents);   

    return (
        <Link href={"/"} className="flex flex-col gap-4">
            <Image 
            src={firstVariant.imageUrl} 
            alt={firstVariant.name} 
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-3xl h-auto w-full"
            />
            <div className={clsx("flex flex-col gap-1 max-w-[150px]", textContainerClassName)}>
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="truncate text-sm text-muted-foreground">{product.description}</p>
                <p className="truncate text-sm font-semibold">{firstVariantPriceInCents}</p>
            </div>
        </Link>
    );
}

export default ProductItem;