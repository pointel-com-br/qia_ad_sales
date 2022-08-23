import {
  AdExpect,
  AdModule,
  AdModules,
  AdRegBased,
  AdRegister,
  AdRegistier,
  AdTools,
} from "admister";
import { QinTool } from "qin_case";
import { registry as products_regy } from "./ad-products";

const base = QinTool.qinpel.chief.loadConfig(QinTool.qinpel.our.names.QinBaseSelected);

export const registry = AdModules.PRICES.registry;

export const registier: AdRegistier = { base, registry };

export const regBased: AdRegBased = {
  registier,
  joins: [
    {
      module: AdModules.PRODUCTS,
      registry: products_regy,
      alias: "products",
      filters: [{ linked: { name: "produto", with: "codigo" } }],
    },
  ],
};

export class AdPrices extends AdRegister {
  public constructor(module: AdModule, expect: AdExpect) {
    super(module, expect, regBased);
    this.addField(AdTools.newAdFieldString("produto", "Produto - Cód.", 6).putKey());
    this.addField(AdTools.newAdFieldString("products.nome", "Produto - Nome.", 60));
    this.addField(AdTools.newAdFieldString("tabela", "Tabela", 6).putKey());
    this.addField(AdTools.newAdFieldNumeric("valor", "Valor"));
    this.prepare();
  }
}
