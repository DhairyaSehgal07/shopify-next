import React from "react";
import getAllProducts from "@/framework/shopify/product/get-all-products";
import { getConfig } from "@/framework/shopify/api/config";
import ProductCard from "@/components/Product/ProductCard";
import Grid from "@/components/ui/Grid/Grid";
import Hero from "@/components/ui/Hero/Hero";
const HomeScreen = async () => {
  const config = getConfig();
  const products = await getAllProducts(config);

  return (
    <>
      <div>
        <Grid>
          {products.slice(0, 3).map((product) => (
            <div key={product.id}>
              <ProductCard variant="simple" product={product} />
            </div>
          ))}
        </Grid>
        <Hero
          headline="Hi there"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, autem dicta deserunt officiis nemo eum pariatur accusantium earum Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, quas ea accusantium iste praesentium optio, veniam fugiat autem consequuntur dolore provident, reiciendis ratione illo sint tempore quod minus quibusdam officiis molestiae minima unde non explicabo. Modi cum voluptatibus magni est voluptatem. Perspiciatis qui sequi cupiditate nemo eum laborum commodi quae."
        />
      </div>
    </>
  );
};

export default HomeScreen;
