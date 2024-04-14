import { Model, DataTypes, Sequelize } from "sequelize";

export class Amendment extends Model {
  public amendmentId!: string;
  public date!: Date;
  public invoiceId!: string;
  public itemId!: string;
  public cost!: number;
  public taxRate!: number;

  public static initialize(sequelize: Sequelize): void {
    this.init(
      {
        amendmentId: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        invoiceId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        itemId: {
          type: DataTypes.STRING,
          allowNull: false,
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
        modelName: "Amendment",
        tableName: "amendments", 
      }
    );
  }
}
