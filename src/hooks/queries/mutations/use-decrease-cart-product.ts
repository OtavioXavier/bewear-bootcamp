import { useMutation, useQueryClient } from "@tanstack/react-query";

import { decreaseProductToCart } from "@/actions/decrease-cart-product";

import { getUseCartQueryKey } from "../use-cart";

export const getDecreaseCartProductMutationKey = (cartItemId: string) => ["decrease-cart-product", cartItemId] as const;

export const useDecreaseCartProductMutation = (cartItemId: string) => {
    const queryClient = useQueryClient();
    return useMutation({

        mutationKey: getDecreaseCartProductMutationKey(cartItemId),
        mutationFn: () => decreaseProductToCart({cartItemId}),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getUseCartQueryKey(),

            });
        }
    });
}
