
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "example.html"));
});

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

// Receive contribution and sponsorship form details
app.post("/api/transactions", (req, res) => {
    const { fullName, phone, amount, type } = req.body;

    if (
        typeof fullName !== "string" ||
        !fullName.trim() ||
        typeof phone !== "string" ||
        !phone.trim() ||
        !Number.isSafeInteger(amount) ||
        amount <= 0 ||
        !["member", "sponsor"].includes(type)
    ) {
        return res.status(400).json({
            message: "Please provide valid transaction details."
        });
    }

    if (type === "member" && amount > 10000) {
        return res.status(400).json({
            message: "A member payment cannot exceed MK10,000."
        });
    }

    // Demonstration only: nothing is stored and no payment is made.
    res.status(201).json({
        message: "Details received by the server. No payment has been made."
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
