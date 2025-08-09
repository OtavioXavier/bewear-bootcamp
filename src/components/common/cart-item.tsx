import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { useDecreaseCartProductMutation } from "@/hooks/queries/mutations/use-decrease-cart-product";
import { useIncreaseCartProductMutation } from "@/hooks/queries/mutations/use-increase-cart-product";
import { useRemoveProductFromCart } from "@/hooks/queries/mutations/use-remove-product-from-cart";

import { Button } from "../ui/button";

interface CartItemProps {
    id: string;
    productName: string;
    productVariantId: string;

    productVariantName: string;
    productVariantImageUrl: string;
    productVariantPriceInCents: number;
    quantity: number;
}
const CartItem = ({ id, productName, productVariantId, productVariantName, productVariantImageUrl, productVariantPriceInCents, quantity }: CartItemProps) => {

    const handleDeleteMutation = useRemoveProductFromCart(id);

    const handleDecreaseMutation = useDecreaseCartProductMutation(id);

    const handleIncreaseMutation = useIncreaseCartProductMutation(productVariantId);

    const handleDelete = () => {
        handleDeleteMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success("Produto removido do carrinho");
            },
            onError: (error) => {
                toast.error(error.message);
            }

        });
    }

    const handleDecrement = () => {
        handleDecreaseMutation.mutate()
    }

    const handleIncrement = () => {
        handleIncreaseMutation.mutate()
    }
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Image
                    src={productVariantImageUrl}
                    alt={productVariantName}
                    width={78}
                    height={78}
                />
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold">{productName}</p>
                    <p className="text-muted-foreground text-xs font-medium">{productVariantName}</p>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border border-solid border-border w-24 rounded-lg p-1">
                            <Button size={"sm"} className="w-4 h-4" variant={"ghost"} onClick={handleDecrement}>
                                <Minus />
                            </Button>

                            <p className="text-xs font-medium">{quantity}</p>
                            <Button size={"sm"} className="w-4 h-4" variant={"ghost"} onClick={handleIncrement}>
                                <Plus />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-end gap-4">
                <Button variant={"outline"} size={"icon"} onClick={handleDelete}>

                    <Trash />
                </Button>
                <p className="text-sm font-bold">R$ {productVariantPriceInCents / 100}</p>
            </div>

        </div>
    );
}

export default CartItem;