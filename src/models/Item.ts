import {
  Model,
  DataTypes,
  Sequelize,
  BelongsToGetAssociationMixin,
} from "sequelize";
import { Sale } from "./Sale";

export class Item extends Model {
  public itemId!: string;
  public saleId!: string;
  public cost!: number;
  public taxRate!: number;

  // Method to establish association in Sequelize
  public getSale!: BelongsToGetAssociationMixin<Sale>; // to get the associated Sale

  public static initialize(sequelize: Sequelize): void {
    this.init(
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
            model: "sales", // This is a reference to the Sales table
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
        tableName: "items",
      }
    );
  }

  public static associate(models: any) {
    this.belongsTo(models.Sale, {
      as: "sale", // Alias for when accessing Sale through Item
      foreignKey: "saleId",
    });
  }
}
