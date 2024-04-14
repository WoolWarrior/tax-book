import {
  Model,
  DataTypes,
  Sequelize,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
} from "sequelize";
import { Item } from "./Item";

export class Sale extends Model {
  // public saleId!: string;
  public invoiceId!: string;
  public date!: Date;
  public items!: Item[];

  // Association method to be used later in association initialization
  public getItems!: HasManyGetAssociationsMixin<Item>; // for getting associated items
  public addItem!: HasManyAddAssociationMixin<Item, number>; // for adding an item
  public hasItem!: HasManyHasAssociationMixin<Item, number>; // to check if an item is associated
  public countItems!: HasManyCountAssociationsMixin; // to count associated items
  public createItem!: HasManyCreateAssociationMixin<Item>; // to create an item and associate it

  public static initialize(sequelize: Sequelize): void {
    this.init(
      {
        invoiceId: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "sales",
      }
    );
  }

  public static associate(models: any) {
    this.hasMany(models.Item, {
      as: "items",
      foreignKey: "invoiceId",
    });
  }
}
