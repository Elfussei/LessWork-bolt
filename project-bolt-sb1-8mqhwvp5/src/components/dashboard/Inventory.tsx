import React, { useState } from 'react';
import { useProductStore } from '../../store/productStore';
import { CartItem } from '../../types/product';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

export const Inventory = () => {
  const { products } = useProductStore();
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (productId: string, price: number) => {
    const existingItem = cart.find((item) => item.productId === productId);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { productId, quantity: 1, price }]);
    }
  };

  const removeFromCart = (productId: string) => {
    const existingItem = cart.find((item) => item.productId === productId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.productId !== productId));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="flex items-center">
          <ShoppingCart size={24} className="text-blue-600 mr-2" />
          <span className="text-lg font-semibold">
            ${getCartTotal().toFixed(2)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          const cartItem = cart.find((item) => item.productId === product.id);
          return (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-blue-600 font-bold">${product.price}</p>
                  <p className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full disabled:opacity-50"
                    disabled={!cartItem}
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-8 text-center">
                    {cartItem?.quantity || 0}
                  </span>
                  <button
                    onClick={() => addToCart(product.id, product.price)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full disabled:opacity-50"
                    disabled={product.stock === 0}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-0 right-0 m-6">
          <button
            onClick={() => {
              // Handle checkout logic here
              setCart([]);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <ShoppingCart size={20} className="mr-2" />
            Checkout (${getCartTotal().toFixed(2)})
          </button>
        </div>
      )}
    </div>
  );
};