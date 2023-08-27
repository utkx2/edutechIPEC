import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function ConfirmPay() {
  const location = useLocation();
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const formData = location.state;
  console.log(formData);
  const id = searchParams.get("id");
  const encodedFirstName = searchParams.get("firstName");
  const firstName = decodeURIComponent(encodedFirstName);

  const encodedLastName = searchParams.get("lastName");
  const lastName = decodeURIComponent(encodedLastName);

  const encodedEmail = searchParams.get("email");
  const email = decodeURIComponent(encodedEmail);

  const encodedPhone = searchParams.get("phone");
  const Phone = decodeURIComponent(encodedPhone);
  const [formData, setFormData] = useState("");
  const navigate = useNavigate();
  console.log(id, "id");

  function handleSuccess() {
    toast.success("Payment Successful !!");

  }

  function handleFailure() {
    toast.error("Payment Failed !!");
    // navigate('/');
  }

  const handlePayNow = async () => {
    fetch(`${BASE_URL}getHash`, {
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
    })
      .then((response) => response.json())
      .then((data) => {
        const txnid = data.txnid;
        const hash = data.hash;
        setHash(data);
      })
      .catch((error) => {
        console.error("Error fetching hash:", error);
      });
  };
  const submitForm = () => {
    const form = document.getElementById("paymentForm");
    form.submit();
  };
  useEffect(() => {
    console.log(id, "id");
    fetch(`${BASE_URL}QuickLinkHomePage/get/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        setFormData(data);
        console.log(data, "data");
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    handlePayNow();
    console.log("hello");
  }, [id]);

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
            <h1 name="productinfo" className="mb-6 text-2xl font-bold ">{formData.start}</h1>
            <h1 name="firstname" className="mb-6 text-2xl font-bold ">{firstName}</h1>
            <h1 name="hash" className="mb-6 text-2xl font-bold ">{hash.hash}</h1>
            <h1 name="txnid" className="mb-6 text-2xl font-bold ">{hash.txnid}</h1>
            <h1 name="lastname" className="mb-6 text-2xl font-bold ">{lastName}</h1>
            <h1 name="email" className="mb-6 text-2xl font-bold ">{email}</h1>
            <h1 name="phone" className="mb-6 text-2xl font-bold ">{Phone}</h1>
            
            <div className="flex justify-between mt-6">
              <div>
                <p className="text-sm">Actual Fee</p>
                <div className="flex gap-4 items-center">
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-xl font-bold text-thin">
                      ₹{formData?.price}
                    </h2>
                    {/* <h2 className="text-xl font-bold text-thin">₹{calculateDiscountedPrice(formData?.price,formData?.discount )}</h2> */}
                    <p className="text-[10px]">Excluded GST*</p>
                  </div>
                  {/* <div className="bg-[#17a2b8] p-1 rounded text-center text-[12px]">
                        Save {formData?.discount}
                      </div> */}
                </div>
              </div>
            </div>
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
