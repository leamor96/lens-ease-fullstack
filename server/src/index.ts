import express from "express";
import morgan from "morgan";
import { connect } from "./db/connect.js";
import { notFound } from "./middleware/not-found.js";
import { lensesRouter } from "./routes/lenses.js";
import { authRouter } from "./routes/users.js";
import cors from "cors";
import { submitFormRouter } from "./routes/submitForm.js";
import { proLensesRouter } from "./routes/proLenses.js";
import { submitProFormRouter } from "./routes/submitProForm.js";

//create an instance of the Express application:
const app = express();

//once app starts: connect to db: and fill the roles collection
connect().catch((e) => {
  console.log(e);
});

//apply middlewares:
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(morgan("dev"));

//define routes:
app.use("/api/lenses", lensesRouter);
app.use("/api/auth", authRouter);
app.use("/api/submit-form", submitFormRouter); 
app.use("/api/pro-lenses",proLensesRouter);
app.use("/api/submit-pro-form", submitProFormRouter); 
//define the logout route:





//404:
app.use(notFound);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

