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
import { registry as products_subgroup_regy } from "./ad-products-subgroup";

const base = QinTool.qinpel.chief.loadConfig(QinTool.qinpel.our.names.QinBaseSelected);

export const registry: AdRegistry = { base, name: "produtos" };

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
    {
      module: AdModules.PRODUCTS_SUBGROUP,
      registry: products_subgroup_regy,
      alias: "products_subgroup",
      filters: [
        new AdFilter({
          linked: { name: "grupo", with: "grupo" },
        }),
        new AdFilter({
          linked: { name: "subgrupo", with: "codigo" },
        }),
      ],
    },
  ],
};

export class AdProducts extends AdRegister {
  public constructor(module: AdModule, expect: AdExpect) {
    super(module, expect, register);
    this.addField(AdTools.newAdFieldString("codigo", "Código", 6).putKey());
    this.addField(AdTools.newAdFieldAtivo());
    this.addField(AdTools.newAdFieldString("nome", "Nome", 60));
    this.addField(AdTools.newAdFieldString("grupo", "Grupo - Cód.", 4).putKey());
    this.addField(AdTools.newAdFieldString("products_group.nome", "Grupo - Nome", 60));
    this.addField(AdTools.newAdFieldString("subgrupo", "SubGrupo - Cód.", 4).putKey());
    this.addField(AdTools.newAdFieldString("products_subgroup.nome", "SubGrupo - Nome", 60));
    this.prepare();
  }
}
