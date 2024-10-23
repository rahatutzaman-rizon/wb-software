import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom'; // Import Link
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const [cart, setCart] = useState([]);

    // Fetch cart items from localStorage on component mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Function to update cart in localStorage
    const updateLocalStorage = (updatedCart) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    // Function to increase quantity
    const increaseQuantity = (courseId) => {
        const updatedCart = cart.map((item) => {
            if (item.id === courseId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        updateLocalStorage(updatedCart);
        toast.success('Quantity increased.');
    };

    // Function to decrease quantity
    const decreaseQuantity = (courseId) => {
        const updatedCart = cart.map((item) => {
            if (item.id === courseId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        updateLocalStorage(updatedCart);
        toast.success('Quantity decreased.');
    };

    // Function to remove an item from the cart
    const removeItem = (courseId) => {
        const updatedCart = cart.filter((item) => item.id !== courseId);
        updateLocalStorage(updatedCart);
        toast.info('Course removed from the cart.');
    };

  

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
            {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="grid gap-6">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center bg-white shadow-md rounded-lg p-4"
                        >
                            <img
                                src={item.photo}
                                alt={item.course_name}
                                className="w-20 h-20 object-cover rounded-md"
                            />
                            <div className="flex-1 ml-4">
                                <h3 className="text-lg font-semibold">{item.course_name}</h3>
                                <p className="text-gray-600">Trainer: {item.trainer_data?.name}</p>
                                <div className="flex items-center mt-2">
                                    <button
                                        onClick={() => decreaseQuantity(item.id)}
                                        className="bg-gray-200 px-2 py-1 rounded-l-md"
                                    >
                                        -
                                    </button>
                                    <span className="px-3 py-1 bg-gray-100">{item.quantity}</span>
                                    <button
                                        onClick={() => increaseQuantity(item.id)}
                                        className="bg-gray-200 px-2 py-1 rounded-r-md"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="ml-4 text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-gray-800 font-bold">
                                    Tk {item.discount_price * item.quantity}
                                </p>
                            </div>
                            <div className="ml-4">
                                <Link 
                                    to={`/checkout/${item.id}`} // Unique checkout link for each item
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Checkout
                                </Link>
                            </div>
                        </div>
                    ))}
               
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Cart;
