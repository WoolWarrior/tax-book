import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
