import React, { useState, useEffect } from "react";
import Navigation from "../Components/Navigation/Nav";
import Products from "../Components/Products/Products";
import Card from "../Components/Card";
import Sidebar from "../Components/Sidebar/Sidebar";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.log("Error fetching products:", error);
        setProducts([]);
      });
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    if (query) {
      filteredProducts = filteredItems;
    }

    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, price, title }) =>
          category === selected || price === selected || title === selected
      );
    }

    return filteredProducts.map((product) => (
      <Card key={product.id} product={product} />
    ));
  }

  const result = filteredData(products, selectedCategory, query);
  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation
        query={query}
        handleInputChange={handleInputChange}
        handleSearch={() => filteredData(products, selectedCategory, query)}
      />
      {!products.length < 1 ? (
        <Products result={result} />
      ) : (
        <h2 style={{ textAlign: "center", margin: "40px" }}>Loarding...</h2>
      )}
    </>
  );
};

export default HomePage;
