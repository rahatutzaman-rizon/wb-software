import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [orderDetails, setOrderDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSearch = () => {
        try {
            // Retrieve orders from local storage
            const orders = JSON.parse(localStorage.getItem("order"));
            
            // Debug logs
            console.log("Search Term:", searchTerm);
            console.log("All Orders:", orders);
            
            // Check if orders exist and is an object
            if (orders) {
                // Convert both to uppercase for case-insensitive comparison
                const orderNum = orders.orderId.toUpperCase();
                const searchTermUpper = searchTerm.trim().toUpperCase();

                console.log("Comparing:", {
                    "Order Number": orderNum,
                    "Search Term": searchTermUpper,
                    "Are Equal?": orderNum === searchTermUpper
                });
                
                if (orderNum === searchTermUpper) {
                    setOrderDetails(orders);
                    setErrorMessage("");
                } else {
                    setOrderDetails(null);
                    setErrorMessage("No order found with this order number.");
                }
            } else {
                console.log("No orders available in local storage.");
                setOrderDetails(null);
                setErrorMessage("No orders available in local storage.");
            }
        } catch (error) {
            console.error("Search Error:", error);
            setOrderDetails(null);
            setErrorMessage("Error retrieving orders. Please try again.");
        }
    };

    // Format the search term as user types
    const handleInputChange = (e) => {
        let value = e.target.value.toUpperCase();
        // If user hasn't typed ORD- prefix, add it
        if (!value.startsWith("ORD-") && value !== "") {
            value = "ORD-" + value;
        }
        setSearchTerm(value);
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="w-full max-w-2xl px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Search Orders
                </h1>
                
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Enter Order Number (e.g., ORD-615120)"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="w-full h-12 px-4 pr-12 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 uppercase"
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-900"
                    >
                        <IoMdSearch className="text-2xl" />
                    </button>
                </div>

                {errorMessage && (
                    <div className="text-red-500 text-center mb-4">
                        {errorMessage}
                    </div>
                )}

                {orderDetails && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Order Details
                        </h2>
                        
                        <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold">Order Number:</p>
                                    <p className="text-gray-600">{orderDetails.orderId}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Full Name:</p>
                                    <p className="text-gray-600">{orderDetails.fullName}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Email:</p>
                                    <p className="text-gray-600">{orderDetails.email || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Parent Name:</p>
                                    <p className="text-gray-600">{orderDetails.parentName}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Parent Number:</p>
                                    <p className="text-gray-600">{orderDetails.parentNumber}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Total Price:</p>
                                    <p className="text-gray-600">{orderDetails.totalPrice} BDT</p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-3">Purchased Courses</h3>
                                <div className="space-y-4">
                                    {orderDetails.cartItems.map((item, index) => (
                                        <div 
                                            key={item.id} 
                                            className="bg-gray-50 p-4 rounded-lg"
                                        >
                                            <p className="font-semibold text-gray-800">
                                                Course {index + 1}: {item.course_name}
                                            </p>
                                            <p className="text-gray-600">
                                                Trainer: {item.trainer_data?.name || 'N/A'}
                                            </p>
                                            <p className="text-gray-600">
                                                Price: {item.discount_price} BDT
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
