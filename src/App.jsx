import { useEffect, useState } from 'react'
import './App.css'

const productsData = [
  { id: 1, name: 'Printer', price: 9000, category: 'Electronics', image: 'https://res.cloudinary.com/itcity-production/image/upload/f_jpg,q_80,w_1000/v1684383317/products/PRD202203000098/skus/t4sussyxit1tfz4l9fix.jpg'},
  { id: 2, name: 'Clothe', price: 200, category: 'Clothing', image: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/449074/item/goods_09_449074.jpg?width=494'},
  { id: 3, name: 'Headset', price: 4000, category: 'Electronics', image: 'https://www.jib.co.th/img_master/product/original/2022060815200053648_1.jpg'},
  { id: 4, name: 'บ้านวิกล', price: 190, category: 'Books', image: 'https://storage.naiin.com/system/application/bookstore/resource/product/202407/617112/1000273441_front_XXL.jpg?imgname=%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%A7%E0%B8%B4%E0%B8%81%E0%B8%A5-%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%A1--1-(Mg)'}
]

function App() {

  const [products, setProducts] = useState(productsData)
  const [filteredProducts, setFilteredProducts] = useState(productsData)
  const [category, setCategory] = useState('All')
  const [sortOrder, setSortOrder] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Shallow Copy
    let updatedProducts = [...products];

    // Filter by category
    if (category !== 'All') {
      updatedProducts = updatedProducts.filter(product => product.category === category)
    }

    // Sort By price
    if (sortOrder === "low-to-high") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    if (searchTerm) {
      updatedProducts = updatedProducts.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    setFilteredProducts(updatedProducts);

  }, [products, category, sortOrder, searchTerm])

  return (
    <>

      <h1>Product List</h1>
      <hr />

      <div>
        <label htmlFor="search">
          Search:
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search by name'/>
        </label>
      </div>

      <div>
        <h3>Filter By Category</h3>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
        </select>
      </div>

      <div>
        <h3>Sort By Price:</h3>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">None</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>

      <div className='product-list'>
        {filteredProducts.map(product => (
          <div key={product.id} className='product-item'>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Category: {product.category}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App