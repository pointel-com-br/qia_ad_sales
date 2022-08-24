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

export const registry = AdModules.CLIENTS.registry;

export const registier: AdRegistier = { base, registry };

export const regBased: AdRegBased = {
  registier,
  joins: [
    {
      module: AdModules.CITY,
      alias: "city",
      filters: [{ linked: { name: "cidade", with: "codigo" } }],
    },
    {
      module: AdModules.DISTRICT,
      alias: "district",
      filters: [
        { linked: { name: "cidade", with: "cidade" } },
        { linked: { name: "bairro", with: "codigo" } },
      ],
    },
    {
      module: AdModules.REGION,
      alias: "region",
      filters: [{ linked: { name: "regiao", with: "codigo" } }],
    },
  ],
};

export class AdClients extends AdRegister {
  public constructor(module: AdModule, expect: AdExpect) {
    super(module, expect, regBased);
    this.addTab("Principal");
    this.addField(AdTools.newAdFieldString("codigo", "Código", 8).putKey());
    this.addField(AdTools.newAdFieldAtivo());
    this.addField(AdTools.newAdFieldBoolean("potencial", "Potencial"));
    this.addField(AdTools.newAdFieldBoolean("cliente", "Cliente"));
    this.addField(AdTools.newAdFieldString("nome", "Nome", 80));
    this.addField(AdTools.newAdFieldString("fantasia", "Fantasia", 60));
    this.addField(AdTools.newAdFieldCombo("natureza", "Natureza", naturezaFieldItems));
    this.addField(AdTools.newAdFieldString("cnpjcpf", "CNPJ/CPF", 20));
    this.addField(AdTools.newAdFieldString("insestadual", "Ins. Estadual", 20));
    this.addField(AdTools.newAdFieldDate("aniversario", "Aniversário"));
    this.addTab("Contato");
    this.addField(
      AdTools.newAdFieldSuggestion("tratamento", "Tratamento", 18, tratamentoSuggestions)
    );
    this.addField(AdTools.newAdFieldString("contato", "Contato", 45));
    this.addField(AdTools.newAdFieldString("cargo", "Cargo", 40));
    this.addField(AdTools.newAdFieldDate("contato_aniversario", "Cont. Aniversário"));
    this.addField(
      AdTools.newAdFieldSuggestion("tipo_fone1", "Tipo Tel 1", 18, typeContactSuggestions)
    );
    this.addField(AdTools.newAdFieldString("fone1", "Telefone 1", 25));
    this.addField(
      AdTools.newAdFieldSuggestion("tipo_fone2", "Tipo Tel 2", 18, typeContactSuggestions)
    );
    this.addField(AdTools.newAdFieldString("fone2", "Telefone 2", 25));
    this.addField(
      AdTools.newAdFieldSuggestion("tipo_fone3", "Tipo Tel 3", 18, typeContactSuggestions)
    );
    this.addField(AdTools.newAdFieldString("fone3", "Telefone 3", 25));
    this.addField(
      AdTools.newAdFieldSuggestion("tipo_email1", "Tipo EMail 1", 18, typeContactSuggestions)
    );
    this.addField(AdTools.newAdFieldString("email1", "EMail 1", 25));
    this.addField(
      AdTools.newAdFieldSuggestion("tipo_email2", "Tipo EMail 2", 18, typeContactSuggestions)
    );
    this.addField(AdTools.newAdFieldString("email2", "EMail 2", 25));
    this.addField(
      AdTools.newAdFieldSuggestion("tipo_email3", "Tipo EMail 3", 18, typeContactSuggestions)
    );
    this.addField(AdTools.newAdFieldString("email3", "EMail 3", 25));
    this.addField(
      AdTools.newAdFieldSuggestion(
        "tipo_website1",
        "Tipo WebSite 1",
        18,
        typeContactSuggestions
      )
    );
    this.addField(AdTools.newAdFieldString("website1", "WebSite 1", 25));
    this.addField(
      AdTools.newAdFieldSuggestion(
        "tipo_website2",
        "Tipo WebSite 2",
        18,
        typeContactSuggestions
      )
    );
    this.addField(AdTools.newAdFieldString("website2", "WebSite 2", 25));
    this.addField(
      AdTools.newAdFieldSuggestion(
        "tipo_website3",
        "Tipo WebSite 3",
        18,
        typeContactSuggestions
      )
    );
    this.addField(AdTools.newAdFieldString("website3", "WebSite 3", 25));
    this.addTab("Endereço");
    this.addField(
      AdTools.newAdFieldSuggestion("tipo_endereco", "Tipo Endereço", 18, typeContactSuggestions)
    );
    this.addField(AdTools.newAdFieldString("cep", "CEP", 10));
    this.addField(AdTools.newAdFieldString("cidade", "Cidade - Cód.", 6));
    this.addField(AdTools.newAdFieldString("city.nome", "Cidade - Nome", 60));
    this.addField(AdTools.newAdFieldString("city.pais", "Cidade - Pais", 4));
    this.addField(AdTools.newAdFieldString("city.estado", "Cidade - Estado", 4));
    this.addField(AdTools.newAdFieldString("bairro", "Bairro - Cód.", 4));
    this.addField(AdTools.newAdFieldString("district.nome", "Bairro - Nome", 60));
    this.addField(AdTools.newAdFieldString("regiao", "Região - Cód.", 4));
    this.addField(AdTools.newAdFieldString("region.nome", "Região - Nome", 60));
    this.addField(
      AdTools.newAdFieldSuggestion("logradouro", "Logradouro", 10, typeStreetSuggestions)
    );
    this.addField(AdTools.newAdFieldString("endereco", "Endereço", 80));
    this.addField(AdTools.newAdFieldString("numero", "Número", 10));
    this.addField(AdTools.newAdFieldString("complemento", "Complemento", 50));
    this.prepare();
  }
}

const naturezaFieldItems = [
  {
    title: "",
    value: "",
  },
  {
    title: "Física",
    value: "F",
  },
  {
    title: "Jurídica",
    value: "J",
  },
];

const tratamentoSuggestions = ["Você", "Senhor", "Senhora"];
const typeContactSuggestions = ["Pessoal", "Profissional"];
const typeStreetSuggestions = ["R.", "AV.", "AL.", "LOT.", "TV.", "SER.", "ROD.", "PCA."];
