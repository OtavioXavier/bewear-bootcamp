import Link from "next/link";

import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";


interface CategorySelectorProps {
    categoryList: (typeof categoryTable.$inferSelect)[]
}

const CategorySelector = ({ categoryList }: CategorySelectorProps) => {
    return (
        <div className="rounded-3xl bg-[#F4EFFF] p-6 mx-5" >
            <div className="grid grid-cols-2 gap-3">
                {
                    categoryList.map((category) => (
                        <Button variant={"ghost"} className="bg-white rounded-3xl font-semibold" key={category.id} asChild>
                            <Link href={`/category/${category.slug}`}>
                                {category.name}
                            </Link>
                        </Button>
                    ))
                }
            </div>
        </div>
    );
}

export default CategorySelector;