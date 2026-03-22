import express from "express";
import { create } from "express-handlebars";
import { userRouter } from "./router/userRouter.js";
import { accountRouter } from "./router/accountRouter.js";
import { atmCardRouter } from "./router/atmCardRouter.js";
import { loanRouter } from "./router/loanRouter.js";
import { transactionRouter } from "./router/transactionRouter.js";
import { webRouter } from "./router/webRouter.js";

const app = express();
const hbs = create({
    defaultLayout: "main",
    extname: ".handlebars",
    helpers: {
        formatDate: (value) => {
            if (!value) {
                return "";
            }

            const date = new Date(value);
            if (Number.isNaN(date.getTime())) {
                return "";
            }

            return date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
        },
    },
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/web", webRouter);

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