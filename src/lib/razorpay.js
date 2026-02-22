export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const handlePayment = async ({ amount, description, onSuccess, onDismiss, onError }) => {
    const res = await loadRazorpayScript();

    if (!res) {
        if (onError) onError("Razorpay SDK failed to load. Are you online?");
        else alert("Razorpay SDK failed to load. Are you online?");
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
            name: "UrbanSlay",
            description: description || "Payment for UrbanSlay",
            order_id: data.orderId,
            handler: function (response) {
                if (onSuccess) {
                    onSuccess(response);
                }
            },
            prefill: {
                name: "",
                email: "",
                contact: "",
            },
            theme: {
                color: "#1a1a1a",
            },
            config: {
                display: {
                    blocks: {
                        upi: {
                            name: "Pay via UPI",
                            instruments: [
                                {
                                    method: "upi"
                                }
                            ]
                        }
                    },
                    sequence: ["block.upi"],
                    preferences: {
                        show_default_blocks: true
                    }
                }
            }
        };

        const paymentObject = new window.Razorpay(options);

        paymentObject.on('payment.failed', function (response) {
            if (onDismiss) onDismiss();
        });

        // if the user closes the modal
        paymentObject.on('modal.closed', function () {
            if (onDismiss) onDismiss();
        });

        paymentObject.open();
    } catch (error) {
        console.error("Payment Error:", error);
        if (onError) onError(error?.message || "Something went wrong with the payment.");
        else alert("Something went wrong with the payment.");
        if (onDismiss) onDismiss();
    }
};
