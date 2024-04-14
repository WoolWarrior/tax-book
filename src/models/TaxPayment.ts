import { Model, DataTypes, Sequelize } from "sequelize";

export class TaxPayment extends Model {
  public paymentId!: string; // Use string type for UUID
  public date!: Date;
  public amount!: number;
}

export function initTaxPayment(sequelize: Sequelize): typeof TaxPayment {
  TaxPayment.init(
    {
      paymentId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER, // Assuming the amount is stored in pennies (as an integer)
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TaxPayment",
      tableName: "tax_payments", // Ensure the table name is correct and matches your DB schema
    }
  );

  return TaxPayment;
}
