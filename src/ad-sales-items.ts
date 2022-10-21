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
  joins: [
    {
      module: AdModules.PRODUCTS,
      alias: "products",
      filters: [{ linked: { name: "produto", with: "codigo" } }],
    },
  ],
};

export class AdSalesItems extends AdRegister {
  private _updateValues = (_: any) => {
    let quantidade = this.model.getFieldByName("quantidade").value;
    if (!quantidade) quantidade = 0.0;
    let preco = this.model.getFieldByName("preco").value;
    if (!preco) preco = 0.0;
    let subtotal = quantidade * preco;
    this.model.getFieldByName("subtotal").value = subtotal;
    let desconto = 0.0;
    let desconto_per = this.model.getFieldByName("desconto_per").value;
    if (!desconto_per) desconto_per = 0.0;
    if (desconto_per > 0.0) {
      desconto = (subtotal * desconto_per) / 100.0;
    }
    this.model.getFieldByName("desconto").value = desconto;
    let acrescimo = 0.0;
    let acrescimo_per = this.model.getFieldByName("acrescimo_per").value;
    if (!acrescimo_per) acrescimo_per = 0.0;
    if (acrescimo_per > 0.0) {
      acrescimo = (subtotal * acrescimo_per) / 100.0;
    }
    this.model.getFieldByName("acrescimo").value = acrescimo;
    let total = subtotal + acrescimo - desconto;
    this.model.getFieldByName("total").value = total;
  };

  public constructor(module: AdModule, expect: AdExpect) {
    super(module, expect, regBased);
    this.addField(
      AdTools.newAdFieldString("prepedido", "PréPedido", 10).putKey().putReadOnly()
    );
    this.addField(AdTools.newAdFieldString("codigo", "Código", 4).putKey());
    this.addField(AdTools.newAdFieldString("produto", "Produto - Cód.", 4));
    this.addField(AdTools.newAdFieldString("products.nome", "Produto - Nome.", 60));
    this.addField(
      AdTools.newAdFieldNumeric("quantidade", "Quantidade").putOnChanged(this._updateValues)
    );
    this.addField(AdTools.newAdFieldString("tabela", "Tabela", 6));
    this.addField(AdTools.newAdFieldNumeric("preco", "Preço").putOnChanged(this._updateValues));
    this.addField(AdTools.newAdFieldNumeric("subtotal", "SubTotal").putReadOnly());
    this.addField(
      AdTools.newAdFieldNumeric("desconto_per", "% Desconto").putOnChanged(this._updateValues)
    );
    this.addField(AdTools.newAdFieldNumeric("desconto", "Desconto").putReadOnly());
    this.addField(
      AdTools.newAdFieldNumeric("acrescimo_per", "% Acréscimo").putOnChanged(this._updateValues)
    );
    this.addField(AdTools.newAdFieldNumeric("acrescimo", "Acréscimo").putReadOnly());
    this.addField(AdTools.newAdFieldNumeric("total", "Total").putReadOnly());
    this.addField(AdTools.newAdFieldString("obs", "Obs", 100));
    this.prepare();
  }
}
