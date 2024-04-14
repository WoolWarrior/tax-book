import { Sequelize } from "sequelize";
import { development } from "../config/database";
import { initSale, Sale } from "./Sale";
import { initItem, Item } from "./Item";
import { initTaxPayment, TaxPayment } from "./TaxPayment"; // Import the TaxPayment model

export const sequelize = new Sequelize(development);

export const SaleModel = initSale(sequelize);
export const ItemModel = initItem(sequelize);
export const TaxPaymentModel = initTaxPayment(sequelize); // Initialize the TaxPayment model

sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created!");
});
