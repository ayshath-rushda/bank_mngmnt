import express from "express";
import { userRouter } from "./router/userRouter.js";
import { accountRouter } from "./router/accountRouter.js";
import { atmCardRouter } from "./router/atmCardRouter.js";
import { loanRouter } from "./router/loanRouter.js";
import { transactionRouter } from "./router/transactionRouter.js";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/accounts", accountRouter);
app.use("/atm-cards", atmCardRouter);
app.use("/loans", loanRouter);
app.use("/transactions", transactionRouter);

app.get("/health", (req, res) => {
    res.json({
        message: "server is running"
    })
})

export {
    app
}