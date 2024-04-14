import express, { Request, Response } from "express";
import { Sale, Item, TaxPayment, Amendment } from "./models";
import {
  calculateTotalSalesTax,
  calculateTotalTaxPayments,
} from "./utils/taxCalculations";
import { logState } from "./middleware/logger";

const app = express();
app.use(express.json());

app.post("/transactions", logState, async (req: Request, res: Response) => {
  const { eventType } = req.body;

  if (eventType === "SALES") {
    const { invoiceId, date, items } = req.body;
    try {
      // find all amendments exist before sale
      const amendments = await Amendment.findAll({ where: { invoiceId } });

      if (amendments.length > 0) {
        amendments.forEach((amendment, index) => {
          const itemIndex = (items as Item[]).findIndex((item) => {
            return item.itemId === amendment.itemId;
          });
          // if itemId found, update cost and taxRate
          if (itemIndex > -1) {
            items[itemIndex].cost = amendment.cost;
            items[itemIndex].taxRate = amendment.taxRate;
          } else {
            // if itemId not found, add the amendment item
            items.push({
              itemId: amendment.itemId,
              cost: amendment.cost,
              taxRate: amendment.taxRate,
            });
          }
        });
        // remove amendments
        await Amendment.destroy({ where: { invoiceId } });
      }

      const sale = await Sale.create({ invoiceId, date });
      const itemPromises = items.map((item: any) =>
        Item.create({
          ...item,
          invoiceId: sale.invoiceId, // Now a UUID string
        })
      );

      await Promise.all(itemPromises);

      return res.status(202).send();
    } catch (error) {
      console.error("Error creating sale:", error);
      return res.status(500).json({ error: "Failed to create sale" });
    }
  }

  if (eventType === "TAX_PAYMENT") {
    const { date, amount } = req.body;
    try {
      const newPayment = await TaxPayment.create({
        date,
        amount,
      });
      return res.status(202).json();
    } catch (error) {
      console.error("Error creating tax payment:", error);
      return res.status(500).json({ error: "Failed to create tax payment" });
    }
  }
});

app.get("/tax-position", logState, async (req: Request, res: Response) => {
  const { date } = req.query;

  if (
    !date ||
    typeof date !== "string" ||
    new Date(date).toString() === "Invalid Date"
  ) {
    return res
      .status(400)
      .json({ error: "Invalid or missing date query parameter" });
  }

  try {
    const totalTaxFromSales = await calculateTotalSalesTax(date);
    const totalTaxPayments = await calculateTotalTaxPayments(date);
    const taxPosition = totalTaxFromSales - totalTaxPayments;

    return res.status(200).json({
      date,
      taxPosition,
    });
  } catch (error) {
    console.error("Failed to calculate tax position:", error);
    return res.status(500).json({ error: "Failed to calculate tax position" });
  }
});

app.patch("/sale", logState, async (req: Request, res: Response) => {
  const { date, invoiceId, itemId, cost, taxRate } = req.body;
  try {
    let sale = await Sale.findOne({ where: { invoiceId } });
    if (sale) {
      let item = await Item.findOne({ where: { itemId, invoiceId } });
      if (item) {
        // If item exists, update it
        await item.update({ cost, taxRate });
      } else {
        // If item not exists, add it
        Item.create({ invoiceId: sale.invoiceId, itemId, cost, taxRate });
      }
      res.status(202).send(); // Send back HTTP 202 Accepted status
    } else {
      // If sale not exisit, save it for later
      await Amendment.create({ date, invoiceId, itemId, cost, taxRate });
      res.status(202).send(); // Send back HTTP 202 Accepted status
    }
  } catch (error) {
    console.error("Failed to amend sale:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
