import { ApiConfig } from "@/framework/common/types/api"
import { Product } from "@/framework/common/types/product"
import { ProductConnection } from "@/framework/shopify/schema"
import getAllProductsPathsQuery from "@/framework/shopify/utils/queries/get-all-products-paths"


type ReturnType = {
  products: Pick<Product, "slug">[]
}

const getAllProductsPaths = async (config: ApiConfig): Promise<ReturnType> => {

  const { data } = await config.fetch<{products: ProductConnection}>({
    query: getAllProductsPathsQuery})

  const products = data.products.edges.map(({node: {handle}}) => {
    return {
      slug: handle
    }
  })

  return { products }
}

export default getAllProductsPaths
