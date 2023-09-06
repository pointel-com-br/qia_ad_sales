import {
  AdExpect,
  AdModule,
  AdModules,
  AdRegBased,
  AdRegister,
  AdRegistier,
  AdTools,
} from "admister";
import { Qine } from "qin_case";

const base = Qine.qinpel.chief.loadConfig(Qine.qinpel.our.names.QinBaseSelected);

export const registry = AdModules.PRICES.registry;

export const registier: AdRegistier = { base, registry };

export const regBased: AdRegBased = {
    registier,
    joins: [
        {
            module: AdModules.PRODUCTS,
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
