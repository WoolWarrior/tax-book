import express, { Request, Response } from "express";
import { Sale, Item, TaxPayment } from "./models";
import {
  calculateTotalSalesTax,
  calculateTotalTaxPayments,
} from "./utils/taxCalculations";

const app = express();
app.use(express.json());

app.post("/transactions", async (req: Request, res: Response) => {
  const { eventType } = req.body;

  if (eventType === "SALES") {
    const { invoiceId, date, items } = req.body;
    try {
      const sale = await Sale.create({ invoiceId, date });
      const itemPromises = items.map((item: any) =>
        Item.create({
          ...item,
          invoiceId: sale.invoiceId, // Now a UUID string
        })
      );

      await Promise.all(itemPromises);

      return res.status(202).send({
        invoiceId: sale.invoiceId,
        itemsRegistered: items.length,
      });
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
      return res.status(202).json(newPayment);
    } catch (error) {
      console.error("Error creating tax payment:", error);
      return res.status(500).json({ error: "Failed to create tax payment" });
    }
  }
});

app.get("/tax-position", async (req: Request, res: Response) => {
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

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
