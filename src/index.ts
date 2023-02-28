import { AdMenuItem, adMenuStartUp, AdModules } from "admister";
import { AdClients } from "./ad-clients";
import { AdPaymentTerms } from "./ad-payment-terms";
import { AdPrices } from "./ad-prices";
import { AdProducts } from "./ad-products";
import { AdProductsGroup } from "./ad-products-group";
import { AdProductsSubGroup } from "./ad-products-subgroup";
import { AdSales } from "./ad-sales";
import { AdSalesItems } from "./ad-sales-items";

const items: AdMenuItem[] = [
  { module: AdModules.CLIENTS, register: AdClients },
  { module: AdModules.PRODUCTS, register: AdProducts },
  { module: AdModules.PRODUCTS_GROUP, register: AdProductsGroup },
  { module: AdModules.PRODUCTS_SUBGROUP, register: AdProductsSubGroup },
  { module: AdModules.PRICES, register: AdPrices },
  { module: AdModules.PAYMENT_TERMS, register: AdPaymentTerms },
  { module: AdModules.SALES, register: AdSales },
  { module: AdModules.SALES_ITEMS, register: AdSalesItems },
];

adMenuStartUp(items).putAsBody();
