'use client'

import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";

import { getCart } from "@/actions/get-cart";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import CartItem from "./cart-item";

const Cart = () => {
    const { data: cart, isPending: cartIsLoading } = useQuery({
        queryKey: ["cart"],
        queryFn: () => getCart()
    })
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"outline"}>
                    <ShoppingCart />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Meu carrinho</SheetTitle>
                </SheetHeader>
                <div>
                    {cartIsLoading && <p>Carregando carrinho...</p>}
                    {cart?.items.map((item) => (
                        <CartItem key={item.id} 
                        id={item.id} 
                        productName={item.productVariant.product.name} 
                        productVariantName={item.productVariant.name} 
                        productVariantImageUrl={item.productVariant.imageUrl} 
                        productVariantPriceInCents={item.productVariant.priceInCents} 
                        quantity={item.quantity} 
                        />

                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default Cart;