import {
  AdExpect,
  AdModule,
  AdModules,
  AdRegBased,
  AdRegCalls,
  AdRegister,
  AdRegistier,
  AdSelect,
  AdTools,
} from "admister";
import { Qine } from "qin_case";
import { QinNature } from "qin_soul";
import { registier as regPrices } from "./ad-prices";
import { registier as regSales } from "./ad-sales";

const base = Qine.qinpel.chief.loadConfig(Qine.qinpel.our.names.QinBaseSelected);

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
    public constructor(module: AdModule, expect: AdExpect) {
        super(module, expect, regBased);
        this.addFields([
            AdTools.newAdFieldString("prepedido", "PréPedido", 10).putKey().putReadOnly(),
            AdTools.newAdFieldString("codigo", "Código", 4).putKey(),
            AdTools.newAdFieldString("produto", "Produto - Cód.", 6)
                .putOnEntered(this._productPriorValueSaver)
                .putOnChanged(this._updatePrice)
                .putOnExited(this._updatePrice),
            AdTools.newAdFieldString("products.nome", "Produto - Nome.", 60),
            AdTools.newAdFieldNumeric("quantidade", "Quantidade").putOnExited(this._updateValues),
            AdTools.newAdFieldString("tabela", "Tabela", 6)
                .putOnEntered(this._tablePriorValueSaver)
                .putOnChanged(this._updatePrice)
                .putOnExited(this._updatePrice),
            AdTools.newAdFieldNumeric("preco", "Preço").putOnExited(this._updateValues),
            AdTools.newAdFieldNumeric("subtotal", "SubTotal").putReadOnly(),
            AdTools.newAdFieldNumeric("desconto_per", "% Desconto").putOnExited(
                this._updateValues
            ),
            AdTools.newAdFieldNumeric("desconto", "Desconto").putReadOnly(),
            AdTools.newAdFieldNumeric("acrescimo_per", "% Acréscimo").putOnExited(
                this._updateValues
            ),
            AdTools.newAdFieldNumeric("acrescimo", "Acréscimo").putReadOnly(),
            AdTools.newAdFieldNumeric("total", "Total").putReadOnly(),
            AdTools.newAdFieldString("obs", "Obs", 100),
        ]);
        let fixedPrepedido = null;
        if (expect) {
            if (expect.fixed) {
                for (const fixed of expect.fixed) {
                    if (fixed.name === "prepedido") {
                        fixedPrepedido = fixed.data;
                    }
                }
            }
        }
        if (fixedPrepedido) {
            AdRegCalls.selectOne(this.makeSelectClientTableQuery(fixedPrepedido))
                .then((res) => {
                    this.model.getFieldByName("tabela").defaultValue = res;
                    this.prepare();
                })
                .catch((err) =>
                    this.qinpel.jobbed.showError(err, "{qia_ad_sales}(ErrCode-000007)")
                );
        } else {
            this.prepare();
        }
    }

    private _updateValues = (_: any) => {
        if (!this.isRegModeInsert() && !this.isRegModeMutate()) {
            return;
        }
        let quantidade = this.model.getFieldByName("quantidade").value;
        if (!quantidade) quantidade = 0.0;
        let preco = this.model.getFieldByName("preco").value;
        if (!preco) preco = 0.0;
        let subtotal = quantidade * preco;
        this.model.getFieldByName("subtotal").value = subtotal.toFixed(2);
        let desconto = 0.0;
        let desconto_per = this.model.getFieldByName("desconto_per").value;
        if (!desconto_per) desconto_per = 0.0;
        if (desconto_per > 0.0) {
            desconto = (subtotal * desconto_per) / 100.0;
        }
        this.model.getFieldByName("desconto").value = desconto.toFixed(2);
        let acrescimo = 0.0;
        let acrescimo_per = this.model.getFieldByName("acrescimo_per").value;
        if (!acrescimo_per) acrescimo_per = 0.0;
        if (acrescimo_per > 0.0) {
            acrescimo = (subtotal * acrescimo_per) / 100.0;
        }
        this.model.getFieldByName("acrescimo").value = acrescimo.toFixed(2);
        let total = subtotal + acrescimo - desconto;
        this.model.getFieldByName("total").value = total.toFixed(2);
    };

    private _tablePriorValue = null;
    private _productPriorValue = null;

    private _tablePriorValueSaver = (_: any) => {
        this._tablePriorValue = this.model.getFieldByName("tabela").value;
    };

    private _productPriorValueSaver = (_: any) => {
        this._productPriorValue = this.model.getFieldByName("produto").value;
    };

    private _updatePrice = (_: any) => {
        if (!this.isRegModeInsert() && !this.isRegModeMutate()) {
            return;
        }
        let produto = this.model.getFieldByName("produto").value;
        let tabela = this.model.getFieldByName("tabela").value;
        if (
            produto &&
            tabela &&
            (produto !== this._productPriorValue || tabela !== this._tablePriorValue)
        ) {
            AdRegCalls.selectOne(this.makeSelectPriceQuery(produto, tabela))
                .then((res) => {
                    this.model.getFieldByName("preco").value = res;
                    this._updateValues(null);
                })
                .catch((err) =>
                    this.qinpel.jobbed.showError(err, "{qia_ad_sales}(ErrCode-000006)")
                );
        }
        this._productPriorValue = produto;
        this._tablePriorValue = tabela;
    };

    private makeSelectClientTableQuery(prepedido: any): AdSelect {
        return {
            registier: regSales,
            fields: [{ name: "clients.tabela_preco", type: QinNature.CHARS }],
            joins: [
                {
                    module: AdModules.CLIENTS,
                    alias: "clients",
                    filters: [{ linked: { name: "cliente", with: "codigo" } }],
                },
            ],
            filters: [
                {
                    valued: {
                        name: "codigo",
                        type: QinNature.CHARS,
                        data: prepedido,
                    },
                },
            ],
        };
    }

    private makeSelectPriceQuery(produto: any, tabela: any): AdSelect {
        return {
            registier: regPrices,
            fields: [{ name: "valor", type: QinNature.NUMERIC }],
            filters: [
                {
                    valued: {
                        name: "produto",
                        type: QinNature.CHARS,
                        data: produto,
                    },
                },
                {
                    valued: {
                        name: "tabela",
                        type: QinNature.CHARS,
                        data: tabela,
                    },
                },
            ],
        };
    }
}
