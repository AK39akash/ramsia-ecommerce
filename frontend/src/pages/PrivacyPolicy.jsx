import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {

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
        {/* TITLE */}
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Privacy Policy
        </h1>

        {/* CONTENT */}
        <div className="flex flex-col gap-6 text-sm text-gray-700 leading-relaxed">
          {/* INTRO */}
          <section>
            <h2 className="font-medium mb-2">1. Introduction</h2>
            <p>
              Welcome to Ramsia. Your privacy is important to us. This policy
              explains how we collect, use, and protect your information when
              you use our platform.
            </p>
          </section>

          {/* DATA COLLECTION */}
          <section>
            <h2 className="font-medium mb-2">2. Information We Collect</h2>
            <p>
              We may collect personal information such as your name, email
              address, phone number, shipping address, and payment details when
              you make a purchase or create an account.
            </p>
          </section>

          {/* USAGE */}
          <section>
            <h2 className="font-medium mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5">
              <li>To process and deliver your orders</li>
              <li>To improve our services and user experience</li>
              <li>To communicate updates and offers</li>
            </ul>
          </section>

          {/* SHARING */}
          <section>
            <h2 className="font-medium mb-2">4. Sharing Your Information</h2>
            <p>
              We do not sell your personal information. We may share it with
              trusted third parties such as payment gateways and delivery
              partners to fulfill your orders.
            </p>
          </section>

          {/* COOKIES */}
          <section>
            <h2 className="font-medium mb-2">5. Cookies</h2>
            <p>
              We use cookies to enhance your browsing experience, remember
              preferences, and analyze website traffic.
            </p>
          </section>

          {/* SECURITY */}
          <section>
            <h2 className="font-medium mb-2">6. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your data
              from unauthorized access, alteration, or disclosure.
            </p>
          </section>

          {/* RIGHTS */}
          <section>
            <h2 className="font-medium mb-2">7. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal
              information. You can contact us for any such requests.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="font-medium mb-2">8. Contact Us</h2>
            <p>
              If you have any questions regarding this policy, please contact us
              at:
            </p>
            <p className="mt-2">
              📧 support@ramsia.com <br />
              📞 +91 9876543210
            </p>
          </section>
        </div>
      </div>
      
    </div>
  );
};

export default PrivacyPolicy;
