import React, { useState, useEffect } from 'react';

const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];
const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let allProducts = [];
      for (let company of companies) {
        const response = await fetch(`http://127.0.0.1:5000/products?company=${company}&category=${selectedCategory}&top=10&minPrice=1&maxPrice=10000`);
        const data = await response.json();
        allProducts = [...allProducts, ...data];
      }
      setProducts(allProducts);
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div style={styles.container}>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={styles.select}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div style={styles.gridContainer}>
        {products.map((product, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.productName}>{product.productName}</h3>
            <h4 style={styles.companyHeading}>Company</h4>
            <p style={styles.company}><strong>{product.company}</strong></p>
            <p style={styles.price}><strong>Price:</strong> ${product.price}</p>
            <p style={styles.rating}><strong>Rating:</strong> {product.rating}</p>
            <p style={styles.discount}><strong>Discount:</strong> {product.discount}%</p>
            <p style={product.availability === 'yes' ? styles.inStock : styles.outOfStock}>
              <strong>{product.availability === 'yes' ? 'In Stock' : 'Out of Stock'}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  select: {
    padding: '12px',
    marginBottom: '20px',
    fontSize: '18px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: '#f8f8f8',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    backgroundColor: '#fff',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  productName: {
    fontSize: '20px',
    margin: '10px 0',
    color: '#2c3e50',
  },
  companyHeading: {
    fontSize: '18px',
    margin: '10px 0 5px 0',
    color: '#2980b9',
  },
  company: {
    fontSize: '16px',
    margin: '5px 0 10px 0',
    color: '#34495e',
  },
  price: {
    color: '#27ae60',
    fontSize: '18px',
  },
  rating: {
    color: '#f39c12',
  },
  discount: {
    color: '#e74c3c',
  },
  inStock: {
    color: '#2ecc71',
  },
  outOfStock: {
    color: '#e74c3c',
  },
};

export default ProductList;
