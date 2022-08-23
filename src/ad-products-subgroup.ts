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
import { registry as products_group_regy } from "./ad-products-group";

const base = QinTool.qinpel.chief.loadConfig(QinTool.qinpel.our.names.QinBaseSelected);

export const registry = AdModules.PRODUCTS_SUBGROUP.registry;

export const registier: AdRegistier = { base, registry };

export const regBased: AdRegBased = {
  registier,
  joins: [
    {
      module: AdModules.PRODUCTS_GROUP,
      registry: products_group_regy,
      alias: "products_group",
      filters: [{ linked: { name: "grupo", with: "codigo" } }],
    },
  ],
};

export class AdProductsSubGroup extends AdRegister {
  public constructor(module: AdModule, expect: AdExpect) {
    super(module, expect, regBased);
    this.addField(AdTools.newAdFieldString("grupo", "Grupo - Cód.", 4).putKey());
    this.addField(AdTools.newAdFieldString("products_group.nome", "Grupo - Nome", 60));
    this.addField(AdTools.newAdFieldString("codigo", "Código", 4).putKey());
    this.addField(AdTools.newAdFieldAtivo());
    this.addField(AdTools.newAdFieldString("nome", "Nome", 60));
    this.prepare();
  }
}
