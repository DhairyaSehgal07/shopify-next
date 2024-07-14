import { ApiConfig, Variables } from "@/framework/common/types/api";
import { getProductQuery, normalizeProduct } from "@/framework/shopify/utils";

import { Product as ShopifyProduct } from "@/framework/shopify/schema";
import { Product } from "@/framework/common/types/product";

type FetchType = {
  productByHandle: ShopifyProduct;
};

type ReturnType = {
  product: Product | null;
};

const getProduct = async (options: {
  config: ApiConfig;
  variables: Variables;
}): Promise<ReturnType> => {
  const { config, variables } = options;

  const { data } = await config.fetch<FetchType>({
    query: getProductQuery,
    variables,
  });

  const { productByHandle } = data;

  return {
    product: productByHandle ? normalizeProduct(productByHandle) : null,
  };
};

export default getProduct;
