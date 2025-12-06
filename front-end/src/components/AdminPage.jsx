import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import API from '../config'
import axios from 'axios'

function AdminPage() {
  const { products, fetchProducts } = useContext(ShopContext)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

  // Delete product
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')
    
    if (confirmDelete) {
      try {
        await axios.delete(`${API}/products/${productId}`)
        alert('Product deleted successfully!')
        fetchProducts() // Refresh the product list
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Failed to delete product')
      }
    }
  }

  // Open edit modal
  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowEditModal(true)
  }

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault()
    
    try {
      await axios.put(`${API}/products/${editingProduct._id}`, editingProduct)
      alert('Product updated successfully!')
      setShowEditModal(false)
      setEditingProduct(null)
      fetchProducts() // Refresh the product list
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Failed to update product')
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditingProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className='p-4 sm:p-10'>
      <h1 className='text-3xl font-bold mb-8'>Admin - Product Management</h1>

      {/* Product Table */}
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse border border-gray-300'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border border-gray-300 px-4 py-2'>Image</th>
              <th className='border border-gray-300 px-4 py-2'>Name</th>
              <th className='border border-gray-300 px-4 py-2'>Price</th>
              <th className='border border-gray-300 px-4 py-2'>Category</th>
              <th className='border border-gray-300 px-4 py-2'>SubCategory</th>
              <th className='border border-gray-300 px-4 py-2'>Best Seller</th>
              <th className='border border-gray-300 px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className='hover:bg-gray-50'>
                  <td className='border border-gray-300 px-4 py-2'>
                    <img 
                      src={`${API}${product.image[0]}`} 
                      alt={product.name}
                      className='w-16 h-16 object-cover rounded'
                    />
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>{product.name}</td>
                  <td className='border border-gray-300 px-4 py-2'>€{product.price}</td>
                  <td className='border border-gray-300 px-4 py-2'>{product.category}</td>
                  <td className='border border-gray-300 px-4 py-2'>{product.subCategory}</td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {product.bestSeller ? '✅' : '❌'}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    <div className='flex gap-2 justify-center'>
                      <button
                        onClick={() => handleEdit(product)}
                        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className='text-center py-10 text-gray-500'>
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingProduct && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <h2 className='text-2xl font-bold mb-4'>Edit Product</h2>
            
            <form onSubmit={handleUpdate}>
              {/* Product Name */}
              <div className='mb-4'>
                <label className='block text-sm font-medium mb-2'>Product Name</label>
                <input
                  type='text'
                  name='name'
                  value={editingProduct.name}
                  onChange={handleInputChange}
                  className='w-full border border-gray-300 rounded px-3 py-2'
                  required
                />
              </div>

              {/* Price */}
              <div className='mb-4'>
                <label className='block text-sm font-medium mb-2'>Price ($)</label>
                <input
                  type='number'
                  name='price'
                  value={editingProduct.price}
                  onChange={handleInputChange}
                  className='w-full border border-gray-300 rounded px-3 py-2'
                  required
                />
              </div>

              {/* Description */}
              <div className='mb-4'>
                <label className='block text-sm font-medium mb-2'>Description</label>
                <textarea
                  name='description'
                  value={editingProduct.description}
                  onChange={handleInputChange}
                  className='w-full border border-gray-300 rounded px-3 py-2 h-24'
                  required
                />
              </div>

              {/* Category */}
              <div className='mb-4'>
                <label className='block text-sm font-medium mb-2'>Category</label>
                <select
                  name='category'
                  value={editingProduct.category}
                  onChange={handleInputChange}
                  className='w-full border border-gray-300 rounded px-3 py-2'
                >
                  <option value='Men'>Men</option>
                  <option value='Women'>Women</option>
                  <option value='Kids'>Kids</option>
                </select>
              </div>

              {/* SubCategory */}
              <div className='mb-4'>
                <label className='block text-sm font-medium mb-2'>SubCategory</label>
                <select
                  name='subCategory'
                  value={editingProduct.subCategory}
                  onChange={handleInputChange}
                  className='w-full border border-gray-300 rounded px-3 py-2'
                >
                  <option value='Topwear'>Topwear</option>
                  <option value='Bottomwear'>Bottomwear</option>
                  <option value='Winterwear'>Winterwear</option>
                  <option value='Sets'>Sets</option>
                </select>
              </div>

              {/* Best Seller */}
              <div className='mb-4'>
                <label className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    name='bestseller'
                    checked={editingProduct.bestseller}
                    onChange={(e) => setEditingProduct(prev => ({
                      ...prev,
                      bestseller: e.target.checked
                    }))}
                    className='w-4 h-4'
                  />
                  <span className='text-sm font-medium'>Best Seller</span>
                </label>
              </div>

              {/* Buttons */}
              <div className='flex gap-4 justify-end'>
                <button
                  type='button'
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingProduct(null)
                  }}
                  className='bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600'
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage