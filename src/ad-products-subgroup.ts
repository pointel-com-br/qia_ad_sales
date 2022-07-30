import {
  AdExpect,
  AdFilter,
  AdModule,
  AdModules,
  AdRegBase,
  AdRegister,
  AdRegistry,
  AdTools,
} from "admister";
import { QinTool } from "qin_case";
import { registry as products_group_regy } from "./ad-products-group";

const base = QinTool.qinpel.chief.loadConfig(QinTool.qinpel.our.names.QinBaseSelected);

export const registry: AdRegistry = {
  base,
  name: "subgrupos_produtos",
};

export const register: AdRegBase = {
  registry,
  joins: [
    {
      module: AdModules.PRODUCTS_GROUP,
      registry: products_group_regy,
      alias: "products_group",
      filters: [
        new AdFilter({
          linked: { name: "grupo", with: "codigo" },
        }),
      ],
    },
  ],
};

export class AdProductsSubGroup extends AdRegister {
  public constructor(module: AdModule, expect: AdExpect) {
    super(module, expect, register);
    this.addField(AdTools.newAdFieldString("grupo", "Grupo - Cód.", 4).putKey());
    this.addField(AdTools.newAdFieldString("products_group.nome", "Grupo - Nome", 60));
    this.addField(AdTools.newAdFieldString("codigo", "Código", 4).putKey());
    this.addField(AdTools.newAdFieldAtivo());
    this.addField(AdTools.newAdFieldString("nome", "Nome", 60));
    this.prepare();
  }
}
