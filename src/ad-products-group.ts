import {
  AdExpect,
  AdModule,
  AdRegBased,
  AdRegister,
  AdRegistier,
  AdRegistry,
  AdTools,
} from "admister";
import { QinTool } from "qin_case";

const base = QinTool.qinpel.chief.loadConfig(QinTool.qinpel.our.names.QinBaseSelected);

export const registry: AdRegistry = { name: "grupos_produtos" };

export const registier: AdRegistier = { base, registry };

export const regBased: AdRegBased = { registier };

export class AdProductsGroup extends AdRegister {
  public constructor(module: AdModule, expect: AdExpect) {
    super(module, expect, regBased);
    this.addField(AdTools.newAdFieldString("codigo", "Código", 4).putKey());
    this.addField(AdTools.newAdFieldAtivo());
    this.addField(AdTools.newAdFieldString("nome", "Nome", 60));
    this.prepare();
  }
}
