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

const base = QinTool.qinpel.chief.loadConfig(QinTool.qinpel.our.names.QinBaseSelected);

export const registry = AdModules.SALES.registry;

export const registier: AdRegistier = { base, registry };

export const regBased: AdRegBased = {
  registier,
  joins: [
    {
      module: AdModules.CLIENTS,
      alias: "clients",
      filters: [{ linked: { name: "cliente", with: "codigo" } }],
    },
    {
      module: AdModules.PAYMENT_TERMS,
      alias: "payment_terms",
      filters: [{ linked: { name: "cond_pagamento", with: "codigo" } }],
    },
  ],
};

export class AdSales extends AdRegister {
  public constructor(module: AdModule, expect: AdExpect) {
    super(module, expect, regBased);
    this.addField(AdTools.newAdFieldString("codigo", "Código", 10).putKey());
    this.addField(AdTools.newAdFieldString("cliente", "Cliente - Cod.", 8));
    this.addField(AdTools.newAdFieldString("clients.nome", "Cliente - Nome.", 60));
    this.addField(AdTools.newAdFieldString("cond_pagamento", "Cond. Pgto - Cod.", 8));
    this.addField(AdTools.newAdFieldString("payment_terms.nome", "Cond. Pgto - Nome.", 60));
    this.prepare();
  }
}
