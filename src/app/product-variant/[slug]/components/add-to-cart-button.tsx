'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
    productVariantId: string;
    quantity: number;
}

const AddToCartButton = ({ productVariantId, quantity }: AddToCartButtonProps) => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ['addProductToCart', productVariantId, quantity],
        mutationFn: () => addProductToCart({
            productVariantId,
            quantity
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cart']
            })
            toast.success('Produto adicionado ao carrinho');
        }

    })
    return (
        <>
            <Button variant="outline" className={clsx("rounded-full ", isPending ? "cursor-progress" : '')} size={"lg"} disabled={isPending} onClick={() => mutate()}>

                {isPending ?
                    <Loader2 className="animate-spin" />
                    :
                    <ShoppingCart />
                }
                Adicionar ao carrinho
            </Button>
        </>
    );
}

export default AddToCartButton;