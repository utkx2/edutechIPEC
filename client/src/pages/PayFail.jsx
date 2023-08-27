import React from "react";

function PayFail() {
  return (
    <div className="mt-6">
      <div className="max-w-[60rem] p-8 mx-4 border shadow-xl md:mx-auto bg-gradient-to-b from-gray-100 to-gray-50 rounded-2xl my-10">
        <h1 className="mb-6 text-3xl font-bold">Payment Failed</h1>
        <hr className="mb-6 border-gray-400" />

        <div
          className="items-start p-8 w-full md:w-96 mx-auto shadow-2xl rounded-2xl bg-gradient-to-b from-gray-300 to-gray-50"
          style={{ color: "#fff", background: "#1f1e5a" }}
        >
          <div>
            <h1 className="mb-6 text-2xl font-bold ">
              Sorry, Your Payment is failed!
            </h1>
          </div>

          <button className="px-6 py-2 mt-5 font-bold text-white bg-yellow-400 rounded">
            Back to Home page
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayFail;
