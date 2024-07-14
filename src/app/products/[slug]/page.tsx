import { getConfig } from "@/framework/shopify/api/config";
import { getProduct } from "@/framework/shopify/product";
import ProductView from "@/components/Product/ProductView/ProductView";

const page = async ({ params }: { params: { slug: string } }) => {
  const config = getConfig();
  const { slug } = params;
  const { product } = await getProduct({ config, variables: { slug } });

  return (
    <>
     {product && <ProductView product={product} />}
    </>
  );
};

export default page;
