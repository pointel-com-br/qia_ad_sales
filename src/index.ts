import { QinButton, QinColumn, QinLabel } from "qin_case";

class AdSales extends QinColumn {
  private qinHello: QinLabel = new QinLabel("Hello, AdSales!");
  private qinPeople: QinButton = new QinButton({ label: new QinLabel("People") });

  public constructor() {
    super();
    this.qinHello.install(this);
    this.qinPeople.install(this);
    this.qinPeople.addAction((qinEvent) => {
      if (qinEvent.isMain) {
        const jobber = this.qinpel.chief.newJobber("Search People", "adpeople", {
          search: "people",
        });
        jobber.addWaiter((result) => {
          console.log("Res: " + result);
          jobber.close();
        });
      }
    });
  }
}

new AdSales().style.putAsBody();
