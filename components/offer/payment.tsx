import { useState } from "react";
import axios from "axios";

const Payment = () => {
  const [paymentLink, setPaymentLink] = useState("");

  const handleCreatePaymentLink = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stripe/create-payment-link`,
        {
          priceId: "1", // Replace with the actual price ID
        }
      );
      setPaymentLink(response.data.paymentLink.url);
    } catch (error) {
      console.error("Error creating payment link:", error);
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <button onClick={handleCreatePaymentLink}>Create Payment Link</button>

      {paymentLink && (
        <div>
          <p>Payment Link:</p>
          <a href={paymentLink} target="_blank" rel="noopener noreferrer">{paymentLink}</a>
        </div>
      )}
    </div>
  );
};

export default Payment
