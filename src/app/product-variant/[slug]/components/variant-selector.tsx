import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/db/schema";

interface VariantSelectorProps {
    productVariant: (typeof productVariantTable.$inferSelect)[];
    selectedVariantSlug: string;
}

const VariantSelector = ({ productVariant, selectedVariantSlug }: VariantSelectorProps) => {

    return ( 
        <div className="flex items-center gap-1">
            {productVariant.map((variant) => (
                <Link 
                href={`/product-variant/${variant.slug}`} 
                key={variant.id} 
                className={clsx(selectedVariantSlug === variant.slug ?
                    'opacity-100'
                    :
                    'opacity-40',
                    'cursor-pointer transition-all ease-in-out duration-300 hover:opacity-100'
                )}>

                    <Image 
                        src={variant.imageUrl}
                        alt={variant.name}
                        width={68}
                        height={68}
                        className="rounded-xl"
                    />
                </Link>
            ))}
        </div>
     );
}
 
export default VariantSelector;