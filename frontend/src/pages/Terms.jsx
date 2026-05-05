import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Terms = () => {

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

      <div className="w-full max-w-3xl bg-white rounded-lg p-4 sm:p-8 sm:my-10">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Terms & Conditions
        </h1>

        <div className="flex flex-col gap-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-medium mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Ramsia, you agree to comply with these
              terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="font-medium mb-2">2. Use of Website</h2>
            <p>
              You agree to use the website only for lawful purposes and not
              engage in any activity that disrupts the platform.
            </p>
          </section>

          <section>
            <h2 className="font-medium mb-2">3. Product Information</h2>
            <p>
              We strive to display accurate product details, but we do not
              guarantee that descriptions, pricing, or images are error-free.
            </p>
          </section>

          <section>
            <h2 className="font-medium mb-2">4. Orders & Payments</h2>
            <p>
              All orders are subject to availability and confirmation. Payments
              must be completed before order processing.
            </p>
          </section>

          <section>
            <h2 className="font-medium mb-2">5. Cancellation</h2>
            <p>
              Orders can only be cancelled before they are shipped. Once
              shipped, cancellation may not be possible.
            </p>
          </section>

          <section>
            <h2 className="font-medium mb-2">6. Limitation of Liability</h2>
            <p>
              Ramsia is not liable for any indirect or incidental damages
              arising from the use of our platform.
            </p>
          </section>

          <section>
            <h2 className="font-medium mb-2">7. Changes to Terms</h2>
            <p>We may update these terms at any time without prior notice.</p>
          </section>
        </div>
      </div>

    </div>
  );
};

export default Terms;
