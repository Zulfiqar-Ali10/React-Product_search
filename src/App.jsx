import { useEffect, useState } from "react";

function UseEffect() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("useEffect called: Component mounted, fetching products...");
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Products fetched successfully:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // Search logic
  const searched = products?.filter((data) => {
    const searchText = search.toLowerCase();
    return (
      data.title.toLowerCase().includes(searchText) ||
      data.category.toLowerCase().includes(searchText) ||
      data.price.toString().includes(searchText)
    );
  });

  // Logs the search term entered
  console.log("Component rendered, current search term:", search);

  return (
    <div className= "bg-gray-200 min-h-screen p-6">
      <h1 className="text-4xl font-extrabold  text-center mb-5 text-blue-800">
        Zulfiqar Product Catalog
      </h1> 
      <input
        placeholder="Enter product name or keyword"
        type="search"
        className="border border-gray-400 w-full md:w-1/2 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 block mx-auto mb-10"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {searched.map((data) => (
          <div
            key={data.id}
            className="border border-gray-200 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-110  hover:shadow-2xl"
          >
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-56 object-contain p-4"
            />
            <div className="p-4">
              <h2 className="hover:not-italic italic font-bold text-gray-700 mb-2">
                {data.title}
              </h2>
              <p className="font-semibold italic hover:not-italic text-gray-600 mb-1 capitalize">
                {data.category}
              </p>
              <p className="text-green-500 italic hover:not-italic font-bold text-lg mb-4">
                ${data.price}
              </p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg  font-semibold hover:text-black hover:font-bold transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UseEffect;
