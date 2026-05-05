import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {

  console.log("TOKEN IN ADD:", token);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("T-Shirts");

  const [groupId, setGroupId] = useState("");

  const [color, setColor] = useState({ name: "" });

  const [images, setImages] = useState([]);
  
  const [sizes, setSizes] = useState([{ size: "", stock: "", sku: "" }]);

  const [tags, setTags] = useState([]);

  
  const [fit, setFit] = useState("");
  const [pattern, setPattern] = useState("");
  const [collar, setCollar] = useState("");
  const [sleeve, setSleeve] = useState("");
  
  const [bestseller, setBestseller] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [dragIndex, setDragIndex] = useState(null);


  const isBottomWear = ["Jeans", "Trousers", "Palazzo"].includes(subCategory);
 

  // ADD SIZE
  const addSize = () => {
    setSizes([...sizes, { size: "", stock: "", sku: "" }]);
  };
  

  // IMAGE HANDLER
  const handleImageChange = (files) => {
    setImages(prev => [...prev, ...files]);
  }


  // REMOVE IMAGE
  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  }


  // dragging image
  const handleDrop = (dropIndex) => {
    if (dragIndex === null) return;

    const updated = [...images];

    const draggedItem = updated[dragIndex];

    // remove dragged
    updated.splice(dragIndex, 1);

    // insert at new position
    updated.splice(dropIndex, 0, draggedItem);

    setImages(updated);
    setDragIndex(null);
  }


  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setDiscount(0);
    setCategory("Men");
    setSubCategory("T-Shirts");

    setGroupId("");

    setColor({ name: "" });

    setImages([]);

    setSizes([{ size: "", stock: "", sku: "" }]);

    setTags([]);

    setFit("");
    setPattern("");
    setCollar("");
    setSleeve("");

    setBestseller(false);
    setIsActive(true);

    setDragIndex(null);
  }
 

  // SUBMIT
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("groupId", groupId);

      formData.append("color", JSON.stringify(color));
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("tags", JSON.stringify(tags));

      formData.append("fit", fit);
      formData.append("pattern", pattern);
      if (!isBottomWear) {
        formData.append("collar", collar);
        formData.append("sleeve", sleeve);
      }

      formData.append("bestseller", bestseller);
      formData.append("isActive", isActive);

      
      // images
      images.forEach(file => {
        formData.append("images", file);
      });

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        toast.success("Product Added");

        resetForm();        
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <form 
      onSubmit={onSubmitHandler} 
      className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-md flex flex-col gap-6"
    >

      {/* TITLE */}
      <h2 className="text-2xl font-bold">Add Product</h2>

      <input 
        placeholder="Name" 
        value={name} 
        onChange={e => setName(e.target.value)} 
        className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-black outline-none"
      />

      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={e => setDescription(e.target.value)} 
        className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-black outline-none"
      ></textarea>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* CATEGORY */}
        <div>
          <p className="text-sm mb-1 text-gray-600">Category</p>
        
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubCategory("");
            }} 
            className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-black"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Boy">Boy</option>
            <option value="Girl">Girl</option>
          </select>
        </div>

        {/* SUBCATEGORY */}
        <div>
          <p className="text-sm mb-1 text-gray-600">Sub Category</p>

          <select
            value={subCategory}
            onChange={(e) =>
              {
                setSubCategory(e.target.value)

                const value = e.target.value;

                if (["Jeans", "Trousers", "Palazzo"].includes(value)) {
                  setCollar("");
                  setSleeve("");
                }

              } 
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
          >
            <option value="">Select</option>

            {category === "Men" && (
              <>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Shirts">Shirts</option>
                <option value="Jackets">Jackets</option>
                <option value="Jeans">Jeans</option>
                <option value="Trousers">Trousers</option>
              </>
            )}

            {category === "Women" && (
              <>
                <option value="Top">Top</option>
                <option value="Jackets">Jackets</option>
                <option value="Palazzo">Palazzo</option>
              </>
            )}

            {category === "Boy" && (
              <>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Shirts">Shirts</option>
                <option value="Jeans">Jeans</option>
              </>
            )}

            {category === "Girl" && (
              <>
                <option value="Top">Top</option>
                <option value="Trousers">Trousers</option>
              </>
            )}
          </select>

        </div>

        {/* PRICE */}
        <div>
          <p className="text-sm mb-1 text-gray-600">Price</p>
          <input 
            type="number" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        {/* DISCOUNT */}
        <div>
          <p className="text-sm mb-1 text-gray-600">Discount</p>
          <input 
            type="number" 
            placeholder="Discount %" 
            value={discount} 
            onChange={e => setDiscount(e.target.value)} 
            className="border rounded-lg px-4 py-1.5 w-full focus:ring-2 focus:ring-black outline-none"
          />
        </div>

      </div>
      


      <input 
        placeholder="Group ID (same for color variants)" 
        value={groupId} 
        onChange={e => setGroupId(e.target.value)} 
        className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-black outline-none"
      />


      {/* COLOR */}
      <input 
        placeholder="Color Name" 
        value={color.name}
        onChange={e => setColor({ ...color, name: e.target.value })} 
        className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-black outline-none"
      />
      


      {/* IMAGES */}
      <div>
        <p className="text-sm mb-2 text-gray-600">Upload Images</p>

        <input 
          key={images.length}
          type="file" 
          multiple
          className="border p-2 rounded-lg w-full"
          onChange={(e) => handleImageChange(Array.from(e.target.files))}
        />

        {/* IMAGE PREVIEW GRID */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-10 gap-3 mt-4">
            {images.map((file, index) => (
              <div 
                key={index} 
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
                className="relative group cursor-grab active:cursor-grabbing"
              >

                <img 
                  src={URL.createObjectURL(file)} 
                  alt="" 
                  className="w-full h-24 object-contain rounded-lg border"
                />

                {/* PRIMARY TAG */}
                {index === 0 && (
                  <span className="absolute bottom-1 left-1 bg-white text-xs px-2 rounded">
                    Primary
                  </span>
                )}

                {/* REMOVE BUTTON */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black text-white text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition cursor-pointer"
                >
                  ✕
                </button>

              </div>
            ))}
          </div>
        ) }

      </div>

      {/* SIZES */}
      <div>

        {sizes.map((s, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <input 
              placeholder="Size" 
              value={s.size}
              onChange={(e) => {
                const updated = [...sizes];
                updated[i].size = e.target.value;
                setSizes(updated);
              }} 
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            />

            <input 
              type="number" 
              value={s.stock}
              placeholder="Stock" 
              onChange={(e) => {
                const updated = [...sizes];
                updated[i].stock = e.target.value;
                setSizes(updated);
              }} 
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            />

            <input 
              placeholder="SKU" 
              value={s.sku}
              onChange={(e) => {
                const updated = [...sizes];
                updated[i].sku = e.target.value;
                setSizes(updated);
              }} 
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            />
            
          </div>
        ))}

        <button type="button" onClick={addSize} className="cursor-pointer text-blue-500 w-fit mt-2" >+ Add Size</button>

      </div>


      {/* TAGS */}
      <input 
        placeholder="Tags (comma separated)" 
        value={tags.join(",")}
        onChange={(e) => setTags(e.target.value.split(","))} 
        className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-black outline-none"
      />

      {/* EXTRA */}
      <input 
        placeholder="Fit" 
        value={fit}
        onChange={(e) => setFit(e.target.value)} 
        className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-black outline-none"
      />
      <input 
        placeholder="Pattern"
        value={pattern} 
        onChange={(e) => setPattern(e.target.value)} 
        className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-black outline-none"
      />

      {!isBottomWear && (
        <>
        
          <input 
            placeholder="Collar" 
            value={collar}
            onChange={(e) => setCollar(e.target.value)} 
            className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-black outline-none"
          />
          <input 
            placeholder="Sleeve" 
            value={sleeve}
            onChange={(e) => setSleeve(e.target.value)} 
            className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-black outline-none"
          />

        </>
      )}


      <div className="flex items-center gap-20">

        {/* BESTSELLER */}
        <label className="flex items-center justify-center gap-2 w-fit cursor-pointer">
          <input 
            type="checkbox"
            checked={bestseller}
            className="w-3 cursor-pointer" 
            onChange={() => setBestseller(!bestseller)} 
          />
          Bestseller
        </label>

        <label className="flex gap-2 w-fit cursor-pointer">

          <input 
            type="checkbox" 
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            className="cursor-pointer"
          />
          Active Product

        </label>

      </div>



      <button 
        type="submit"
        className="bg-black text-white font-semibold tracking-wider px-6 py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
      >
        ADD PRODUCT
      </button>

    </form>
  );
};

export default Add;
