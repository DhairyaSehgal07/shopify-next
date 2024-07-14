import { Checkout, Maybe } from "@/framework/shopify/schema";
import { normalizeCart } from "./normalize";



const checkoutToCart = (checkout?: Maybe<Checkout>) => {
  if (!checkout) {
    throw new Error("Missing checkout object!")
  }

  return normalizeCart(checkout)
}


export default checkoutToCart
