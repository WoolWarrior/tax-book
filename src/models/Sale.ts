// src/models/Sale.ts

import { Model, DataTypes, Sequelize } from 'sequelize';
import { Item } from './Item';

export class Sale extends Model {
  public saleId!: string;
  public invoiceId!: string;
  public date!: Date;
  public items!: Item[]
}

export function initSale(sequelize: Sequelize): typeof Sale {
  Sale.init({
    saleId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    invoiceId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Sale',
    tableName: 'sales'  // Specify table name here
  });

  return Sale;
}
