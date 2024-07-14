import useAddItem from "@/framework/common/cart/use-add-item";
import { MutationHook } from "@/framework/common/types/hooks";
import { UseAddItem } from "@/framework/common/cart/use-add-item";
import { CheckoutLineItemsAddPayload } from "../schema";
import { checkoutLineItemsAddMutation } from "../utils/mutations";
import { getCheckoutId } from "../utils";
import { Cart } from "@/framework/common/types/cart";
import {checkoutToCart} from "../utils";
import useCart from "@/framework/common/cart/use-cart";

export default useAddItem as UseAddItem<typeof handler>

export type AddItemHookDescriptor = {
  fetcherInput: {
    variantId: string
    quantity: number
  }
  fetcherOutput: {
    checkoutLineItemsAdd: CheckoutLineItemsAddPayload
  }
  data: Cart
}


export const handler: MutationHook<AddItemHookDescriptor> = {
  fetcherOptions: {
    query: checkoutLineItemsAddMutation
  },
  fetcher: async ({fetch, options, input}) => {

    const variables = {
      checkoutId: getCheckoutId(),
      lineItems: [
        {
         variantId: input.variantId,
         quantity: 1
        }
      ]
    }

    const { data } = await fetch({
       ...options,
       variables
    })

    const cart = checkoutToCart(data.checkoutLineItemsAdd.checkout)
    return cart
  },
  useHook: ({fetch}) => () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { mutate: updateCart } = useCart()

    return async (input) => {
      const response = await fetch(input)
      await updateCart(response, false)
      return response
    }
  }
}