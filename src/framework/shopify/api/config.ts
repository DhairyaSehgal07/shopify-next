
import { ApiConfig } from "@/framework/common/types/api"
import { SHOPIFY_CHECKOUT_ID_COOKIE } from "@/framework/shopify/const"
import { fetchApi } from "../utils"
import { HookFetcherContext, MutationHookContext, SWRHookResponse, UseData } from "@/framework/common/types/hooks"
import useAddItem from "../cart/use-add-item"
class Config {
  private config: ApiConfig

  constructor(config: ApiConfig) {
    this.config = config
  }

  getConfig(): ApiConfig {
    return this.config
  }
}


const configWrapper = new Config({
  fetch: fetchApi,
  checkoutCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
  
})

export function getConfig() {
  return configWrapper.getConfig()
}





