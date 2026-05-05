import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory, currentProductId }) => {
  const { products } = useContext(ShopContext);

  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    let filtered = products.filter(
      item =>
        item.category === category &&
        item.subCategory === subCategory &&
        item._id !== currentProductId,
    );

    // Shuffle randomly (Fisher-Yates)
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }

    setRelated(filtered.slice(0, 5));

  }, [products, category, subCategory, currentProductId]);

  return (
    <div className="mt-12 lg:mt-24">
      <div className="text-center font-medium text-xl sm:text-2xl lg:text-3xl py-2">
        <Title text1={"YOU MAY"} text2={"ALSO LIKE"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4 sm:mt-7 gap-y-6">
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.images?.map(img => img.url) || []}
            price={item.finalPrice || item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
