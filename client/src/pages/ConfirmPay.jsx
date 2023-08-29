import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { useCallback, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function ConfirmPay() {
  const location = useLocation();
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const formData = location.state;
  const id = searchParams.get("id");
  const encodedFirstName = searchParams.get("firstName");
  const firstName = decodeURIComponent(encodedFirstName);

  const encodedLastName = searchParams.get("lastName");
  const lastName = decodeURIComponent(encodedLastName);

  const encodedEmail = searchParams.get("email");
  const email = decodeURIComponent(encodedEmail);

  const encodedPhone = searchParams.get("phone");
  const Phone = decodeURIComponent(encodedPhone);
  const [formDatas, setFormData] = useState("");
  const navigate = useNavigate();

  function handleSuccess() {
    toast.success("Payment Successful !!");

  }

  function handleFailure() {
    toast.error("Payment Failed !!");
    navigate("/pay-fail");
  }

  const handlePayNow = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}getHash`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: formData?.price,
          productinfo: formData?.start,
          firstname: firstName,
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const txnid = data.txnid;
      const hash = data.hash;
      setHash(data);
    } catch (error) {
      console.error("Error fetching hash:", error);
      // handleFailure();
    }
  }, [formData, firstName, email]);

  const submitForm = () => {
    const form = document.getElementById("paymentForm");
    form.submit();
    // handleSuccess();
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        // Fetch data from the first API using async/await
        const response = await fetch(`${BASE_URL}QuickLinkHomePage/get/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setFormData(data);

        // Call the `handlePayNow` function
        handlePayNow();
      } catch (error) {
        console.error(error);
        // handleFailure();
      }
    };

    fetchData(); // Call the fetchData function

  }, [id, handlePayNow]);


  return (
    <div className="mt-6">
      <div className="max-w-[60rem] p-8 mx-4 border shadow-xl md:mx-auto bg-gradient-to-b from-gray-100 to-gray-50 rounded-2xl my-10">
        <h1 className="mb-6 text-3xl font-bold">Confirm Payment</h1>
        <hr className="mb-6 border-gray-400" />

        <div
          className="items-start p-8 w-full md:w-96 mx-auto shadow-2xl rounded-2xl bg-gradient-to-b from-gray-300 to-gray-50"
          style={{ color: "#fff", background: "#1f1e5a" }}
        >
          <form
            id="paymentForm"
            action="https://test.payu.in/_payment"
            method="post"
          >
            <div>
              <input
                hidden
                type="text"
                value={formDatas.start}
                name="productinfo"
                className="mb-6 text-2xl font-bold text-black"
                readOnly
              />
              <input
                hidden
                type="text"
                value={firstName}
                name="firstname"
                className="mb-6 text-2xl font-bold text-black"
                readOnly
              />
              <input
                hidden
                type="text"
                value={hash.hash}
                name="hash"
                className="mb-6 text-2xl font-bold text-black"
                readOnly
              />
              <input
                hidden
                type="text"
                value={hash.txnid}
                name="txnid"
                className="mb-6 text-2xl font-bold text-black"
                readOnly
              />
              <input
                hidden
                type="text"
                value={lastName}
                name="lastname"
                className="mb-6 text-2xl font-bold text-black"
                readOnly
              />
              <input
                hidden
                type="text"
                value={email}
                name="email"
                className="mb-6 text-2xl font-bold text-black"
                readOnly
              />
              <input
                hidden
                type="text"
                value={Phone}
                name="phone"
                className="mb-6 text-2xl font-bold text-black"
                readOnly
              />
              <input
                hidden
                type="text"
                value="gtKFFx"
                name="key"
                className="mb-6 text-2xl font-bold text-black"
                readOnly
              />
              <input
                hidden
                type="text"
                value="eCwWELxi"
                name="salt"
                className="mb-6 text-2xl font-bold text-black"
                readOnly
              />
              <input
                hidden
                type="text"
                value="http://localhost:3000/api/payment/success"
                name="surl"
                className="mb-6 text-2xl font-bold text-black"
                readOnly
              />
              <input
                hidden
                type="text"
                value="http://localhost:3000/api/payment/failed"
                name="furl"
                className="mb-6 text-2xl font-bold text-black"
                readOnly
              />
              <label>Total Amount:</label>
              <br /><br />
              <input
                type="text"
                value={formDatas?.price}
                name="amount"
                className="mb-6 text-2xl font-bold text-black"
                readOnly
                style={{
                  border: "2px yellow solid",
                  borderRadius: "10px"
                }}
              />

            </div>

            <button
              className="px-6 py-2 mt-5 font-bold text-white bg-yellow-400 rounded"
              disabled={loading}
              onClick={submitForm}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPay;
