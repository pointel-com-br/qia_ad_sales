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

export const registry = AdModules.SALES_ITEMS.registry;

export const registier: AdRegistier = { base, registry };

export const regBased: AdRegBased = {
  registier,
};

export class AdSalesItems extends AdRegister {
  public constructor(module: AdModule, expect: AdExpect) {
    super(module, expect, regBased);
    this.addField(AdTools.newAdFieldString("prepedido", "PréPedido", 10).putKey());
    this.addField(AdTools.newAdFieldString("codigo", "Código", 4).putKey());
    this.addField(AdTools.newAdFieldString("produto", "Produto - Cód.", 4));
    this.addField(AdTools.newAdFieldNumeric("quantidade", "Quantidade"));
    this.addField(AdTools.newAdFieldString("tabela", "Tabela", 6));
    this.addField(AdTools.newAdFieldNumeric("preco", "Preço"));
    this.addField(AdTools.newAdFieldNumeric("subtotal", "SubTotal"));
    this.addField(AdTools.newAdFieldNumeric("desconto_per", "% Desconto"));
    this.addField(AdTools.newAdFieldNumeric("desconto", "Desconto"));
    this.addField(AdTools.newAdFieldNumeric("acrescimo_per", "% Acréscimo"));
    this.addField(AdTools.newAdFieldNumeric("acrescimo", "Acréscimo"));
    this.addField(AdTools.newAdFieldNumeric("total", "Total"));
    this.addField(AdTools.newAdFieldString("obs", "Obs", 100));
    this.prepare();
  }
}
