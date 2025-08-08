import Image from "next/image";

import { Button } from "../ui/button";

const partnerList = [
    {
        icon: "/nike-icon.svg",
        name: "Nike"
    },
    {
        icon: "/adidas-icon.svg",
        name: "Adidas"
    },
    {
        icon: "/puma-icon.svg",
        name: "Puma"
    },
    {
        icon: "/newbalance-icon.svg",
        name: "New Balance"
    },
]

const PartnerBrandsList = () => {
    return (
        <>
            <h3 className="font-semibold px-5">Marcas parceiras</h3>
            <div className="flex justify-between px-5 overflow-auto">
                {partnerList.map((partner, i) => (
                    <div key={i} className="flex flex-col gap-4 items-center">
                        <Button variant={'outline'} className="w-20 h-20 rounded-3xl">
                            <Image src={partner.icon} alt={partner.name} width={0} height={0} className="w-8 h-auto" />
                        </Button>
                        <p className="font-semibold">{partner.name}</p>
                    </div>
                ))}

            </div>
        </>

    );
}

export default PartnerBrandsList;