import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Returns = () => {

  const navigate = useNavigate();

  return (
    <div className="sm:bg-gray-100 min-h-screen sm:py-6 sm:px-6 flex flex-col sm:flex-row justify-center mb-20 sm:mb-0">

      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-3xl bg-white sm:rounded-lg p-4 sm:p-8 sm:my-10">
        <h1 className="sm:text-2xl text-[22px] font-semibold mb-6 text-center">
          Return & Exchange Policy
        </h1>

        <div className="flex flex-col gap-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-medium mb-2">1. Return Eligibility</h2>
            <p>
              Items can be returned within 7 days of delivery if they are
              unused, unwashed, and in original packaging.
            </p>
          </section>

          <section>
            <h2 className="font-medium mb-2">2. Exchange Policy</h2>
            <p>
              Exchanges are allowed for size or defective products, subject to
              availability.
            </p>
          </section>

          <section>
            <h2 className="font-medium mb-2">3. Non-returnable Items</h2>
            <p>
              Gift cards, discounted items, and used products are not eligible
              for returns.
            </p>
          </section>

          <section>
            <h2 className="font-medium mb-2">4. Refund Process</h2>
            <p>
              Refunds will be processed within 5–7 business days after the
              product is received and inspected.
            </p>
          </section>

          <section>
            <h2 className="font-medium mb-2">5. Shipping Charges</h2>
            <p>
              Shipping charges are non-refundable unless the return is due to a
              defective or incorrect product.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Returns;
