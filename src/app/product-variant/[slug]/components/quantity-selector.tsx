'use client'

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const QuantitySelector = () => {
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        setQuantity(prev => prev > 1 ? prev - 1 : 1);
    }

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    }

    return (
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

    );
}

export default QuantitySelector;