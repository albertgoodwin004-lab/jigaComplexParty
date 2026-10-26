
transactionForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const amount = Number(amountInput.value);

    if (!fullName || !phone || !Number.isSafeInteger(amount) || amount <= 0) {
        formMessage.textContent = "Please enter valid details and an amount.";
        return;
    }

    if (transactionType === "member" && amount > 10000) {
        formMessage.textContent =
            "A member contribution cannot exceed MK10,000 per payment.";
        return;
    }

    try {
        const response = await fetch("/api/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName: fullName,
                phone: phone,
                amount: amount,
                type: transactionType
            })
        });

        const result = await response.json();

        if (!response.ok) {
            formMessage.textContent = result.message;
            return;
        }

        formMessage.textContent = result.message;
    } catch (error) {
        formMessage.textContent =
            "Unable to contact the server. Please try again.";
    }
});
