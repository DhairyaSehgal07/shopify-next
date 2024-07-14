import { ApiFetcher } from "@/framework/common/types/api"
import { SHOPIFY_CHECKOUT_ID_COOKIE, SHOPIFY_CHECKOUT_URL_COOKIE, SHOPIFY_COOKIE_EXPIRE } from "@/framework/shopify/const"
import { Checkout, CheckoutCreatePayload, Maybe } from "@/framework/shopify/schema"
import Cookies from "js-cookie"
import { checkoutCreateMutation } from "./mutations"



const createCheckout = async (
  fetch: ApiFetcher<{checkoutCreate: CheckoutCreatePayload}>
): Promise<Checkout> => {
  const { data } = await fetch({
    query: checkoutCreateMutation
  })

  const { checkout } = data.checkoutCreate

  if (!checkout) {
    throw new Error("Checkout cannot be created!")
  }

  const checkoutId = checkout?.id

  if (checkoutId) {
    const options = {
      expires: SHOPIFY_COOKIE_EXPIRE
    }
    debugger

    Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkoutId, options)
    Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkout?.webUrl, options)
  }

  return checkout
}


export default createCheckout
