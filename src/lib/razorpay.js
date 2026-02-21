export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const handlePayment = async ({ amount, description, onSuccess }) => {
    const res = await loadRazorpayScript();

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    try {
        const response = await fetch("/api/create-razorpay-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to create order");
        }

        const options = {
            key: data.keyId,
            amount: data.amount,
            currency: data.currency,
            name: "UrbanSlate",
            description: description || "Payment for UrbanSlate",
            order_id: data.orderId,
            handler: function (response) {
                if (onSuccess) {
                    onSuccess(response);
                } else {
                    alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                }
            },
            prefill: {
                name: "Customer Name",
                email: "customer@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#1a1a1a",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    } catch (error) {
        console.error("Payment Error:", error);
        alert("Something went wrong with the payment.");
    }
};
