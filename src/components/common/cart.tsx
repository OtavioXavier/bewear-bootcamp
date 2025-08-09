'use client'

import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";

import { getCart } from "@/actions/get-cart";
import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

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
                        <div key={item.id}>
                            <p>{item.productVariant.product.name}</p>
                            <p>{formatCentsToBRL(item.productVariant.priceInCents)}</p>
                            <p>{item.quantity}</p>
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default Cart;