import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/commom/category-selector";
import Footer from "@/components/commom/footer";
import Header from "@/components/commom/header";
import PartnerBrands from "@/components/commom/partner-brand-list";
import ProductsList from "@/components/commom/products-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true
    }
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true
    }
  })

  const categorys = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6">
        <Image
          src={"/banner-01.png"}
          alt="Leve uma vida com estilo"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full px-5"
        />
        <PartnerBrands />
        <ProductsList title="Mais vendidos" products={products} />
        <CategorySelector categorys={categorys} />

        <Image
          src={"/banner-02.png"}
          alt="Seja Auténtico"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full px-5"
        />

        <ProductsList title="Novos Produtos" products={newlyCreatedProducts} />
      </div>
      <Footer />
    </>
  );
}

export default Home;