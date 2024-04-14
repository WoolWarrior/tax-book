import { Sequelize } from "sequelize";
import { development } from "../config/database"; // Ensure this contains the correct config settings
import { Sale } from "./Sale";
import { Item } from "./Item";
import { TaxPayment } from "./TaxPayment";

const sequelize = new Sequelize(development);

// Initialize models
Sale.initialize(sequelize);
Item.initialize(sequelize);
TaxPayment.initialize(sequelize); // Initialize the TaxPayment model

// Associate models
Sale.associate({ Item }); // Passing a reference to Item model
Item.associate({ Sale }); // Passing a reference to Sale model

sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created!");
});

export { sequelize, Sale, Item, TaxPayment };
