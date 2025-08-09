'use client'

import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";

import { getCart } from "@/actions/get-cart";
import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
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
                {cart?.items.length === 0 ? (
                    <div className="w-full h-full flex justify-center items-center flex-col gap-2">
                        <div className="bg-purple-200 w-36 h-36 rounded-full flex items-center justify-center text-purple-400">
                            <ShoppingCart className="w-12 h-12" />
                        </div>
                            <p className=" font-bold">Seu carrinho está vazio</p>
                    </div>
                )
                    :
                    <div className="flex h-full flex-col px-5 pb-5">
                        <div className="flex h-full max-h-full flex-col overflow-hidden">
                            <ScrollArea className="h-full">
                                <div className="flex h-full flex-col gap-8">
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
                            </ScrollArea>
                        </div>
                        {cart?.items && cart?.items.length > 0 && (
                            <div className="flex flex-col gap-4">
                                <Separator />
                                <div className="flex items-center justify-between text-xs font-medium">
                                    <p className="text-xs font-bold">Subtotal</p>
                                    <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between text-xs font-medium">
                                    <p className="text-xs font-bold">Entrega</p>
                                    <p>GRÁTIS</p>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between text-xs font-medium">
                                    <p className="text-xs font-bold">Total</p>
                                    <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                                </div>

                                <Button>Finalizar compra</Button>
                            </div>

                        )}
                    </div>
                }

            </SheetContent>
        </Sheet>
    );
}

export default Cart;