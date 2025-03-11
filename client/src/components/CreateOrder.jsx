import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext"; // ✅ Import UserContext

const CreateOrder = () => {
  const { userId } = useContext(UserContext); // ✅ Get logged-in userId
  const [products, setProducts] = useState([
    { name: "", price: "", quantity: "" },
  ]);
  const [message, setMessage] = useState("");

  // ✅ Handle product input changes
  const handleChangeProduct = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  // ✅ Add new product input field
  const handleAddProduct = () => {
    setProducts([...products, { name: "", price: "", quantity: "" }]);
  };

  // ✅ Submit order to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("⚠️ User ID is required. Please log in.");
      return;
    }

    // Validate products
    if (
      products.some(
        (product) => !product.name || !product.price || !product.quantity
      )
    ) {
      setMessage("⚠️ Please fill in all product details.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId, products }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Order created successfully!");
        setProducts([{ name: "", price: "", quantity: "" }]); // Reset form
      } else {
        setMessage("❌ Error: " + (data.error || "An error occurred."));
      }
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Create an Order
      </h2>

      {/* Display success/error message */}
      {message && (
        <p className="text-center text-lg text-red-500 mb-4">{message}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            User ID:
          </label>
          <input
            type="text"
            value={userId || ""}
            disabled
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Dynamic product input fields */}
        {products.map((product, index) => (
          <div
            key={index}
            className="mb-6 p-4 border border-gray-300 rounded-lg"
          >
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Product {index + 1}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={product.name}
                  onChange={(e) =>
                    handleChangeProduct(index, "name", e.target.value)
                  }
                  required
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Enter product price"
                  value={product.price}
                  onChange={(e) =>
                    handleChangeProduct(index, "price", e.target.value)
                  }
                  required
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Quantity
                </label>
                <input
                  type="number"
                  placeholder="Enter product quantity"
                  value={product.quantity}
                  onChange={(e) =>
                    handleChangeProduct(index, "quantity", e.target.value)
                  }
                  required
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add new product button */}
        <button
          type="button"
          onClick={handleAddProduct}
          className="mb-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          + Add Another Product
        </button>

        {/* Submit order button */}
        <button
          type="submit"
          className="w-full px-6 py-3 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
