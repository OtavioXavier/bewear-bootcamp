'use client'
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
    productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        setQuantity(prev => prev > 1 ? prev - 1 : 1);
    }

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    }
    return (
        <>
            <div className="px-5">
                <div className="space-y-4">
                    <h3 className="font-medium">Quantidade</h3>
                    <div className="flex items-center justify-center gap-2 border border-solid border-border w-26 rounded-lg px-4 py-1">
                        <Button size={"icon"} variant={"ghost"} onClick={handleDecrement}>
                            <Minus />
                        </Button>

                        <p className="text-sm font-medium">{quantity}</p>
                        <Button size={"icon"} variant={"ghost"} onClick={handleIncrement}>
                            <Plus />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="px-5 flex flex-col space-y-2">
                <Button className="rounded-full" size={"lg"}>Comprar agora</Button>
                <AddToCartButton productVariantId={productVariantId} quantity={quantity} />
            </div>
        </>

    );
}

export default ProductActions;