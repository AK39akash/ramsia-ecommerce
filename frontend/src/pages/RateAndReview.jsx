import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const RateAndReview = () => {
  // 🔥 TEMP DATA (replace with orders later)
  const [products] = useState([]);

  const [activeProduct, setActiveProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!rating) return alert("Please select a rating");

    console.log({
      productId: activeProduct._id,
      rating,
      review,
    });

    // reset
    setActiveProduct(null);
    setRating(0);
    setReview("");
  };

  return (
    <div className="min-h-full flex flex-col border border-gray-200 sm:p-5">
      
      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>

          {/* TITLE */}
          <h2 className="text-[17px] font-semibold tracking-wide">
            RATE & REVIEW
          </h2>

          <div />
        </div>
      </div>

      {/* TITLE */}
      <h2 className="hidden sm:block text-xl sm:text-xl text-center font-bold">
        Rate & Review
      </h2>

      <div className="flex-1 flex justify-center items-center">
        {/* EMPTY STATE */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center px-4">
            {/* ICON */}
            <div className="text-gray-300 mb-6 text-6xl">⭐</div>

            <h2 className="text-lg font-semibold mb-2">
              NO PRODUCTS TO REVIEW
            </h2>

            <p className="text-gray-500 text-[13px] sm:text-sm max-w-xs sm:max-w-[360px] lg:max-w-sm">
              Once you purchase products, you can rate and review them here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {products.map((item) => (
              <div
                key={item._id}
                className="border border-gray-200 p-4 flex gap-4 items-center"
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt=""
                  className="w-20 h-24 object-cover"
                />

                {/* INFO */}
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>

                  <button
                    onClick={() => setActiveProduct(item)}
                    className="text-sm text-blue-600 mt-2"
                  >
                    Write Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {activeProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-md p-6 relative">
            {/* CLOSE */}
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-3 right-3"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">Rate Product</h2>

            <p className="text-sm text-gray-600 mb-4">{activeProduct.name}</p>

            {/* STARS */}
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            {/* TEXTAREA */}
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full border p-2 mb-4 text-sm"
            />

            {/* SUBMIT */}
            <button
              onClick={handleSubmit}
              className="bg-black text-white w-full py-3 text-sm font-medium"
            >
              SUBMIT REVIEW
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RateAndReview;
