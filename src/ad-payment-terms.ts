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

export const registry = AdModules.PAYMENT_TERMS.registry;

export const registier: AdRegistier = { base, registry };

export const regBased: AdRegBased = { registier };

export class AdPaymentTerms extends AdRegister {
    public constructor(module: AdModule, expect: AdExpect) {
        super(module, expect, regBased);
        this.addField(AdTools.newAdFieldString("codigo", "Código", 4).putKey());
        this.addField(AdTools.newAdFieldAtivo());
        this.addField(AdTools.newAdFieldString("nome", "Nome", 45));
        this.prepare();
    }
}
