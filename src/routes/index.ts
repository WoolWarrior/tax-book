import { Router } from "express";
import { handleTransaction } from "../controllers/transactionsController";
import { queryTaxPosition } from "../controllers/taxPositionController";
import { handleAmendSale, querySales } from "../controllers/salesController";
// import { handleTransaction, queryTaxPosition, amendSale } from "../controllers";

const router = Router();

router.post("/transactions", handleTransaction);
router.get("/tax-position", queryTaxPosition);
router.patch("/sale", handleAmendSale);
router.get("/sale", querySales);

export default router;
