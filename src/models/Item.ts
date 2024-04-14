// src/models/Item.ts

import { Model, DataTypes, Sequelize } from "sequelize";
import { Sale } from "./Sale";

export class Item extends Model {
  public itemId!: string;
  public saleId!: string;
  public cost!: number;
  public taxRate!: number;

  public readonly sale?: Sale;
}

export function initItem(sequelize: Sequelize): typeof Item {
  Item.init(
    {
      itemId: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.STRING,
        allowNull: false,
      },
      saleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "sales", // This should match the table name of 'Sale'
          key: "saleId",
        },
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      taxRate: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Item",
      tableName: "items", // Specify table name here
    }
  );

  Item.belongsTo(Sale, {
    foreignKey: "saleId",
    targetKey: "saleId",
    as: "sale",
  });

  return Item;
}
