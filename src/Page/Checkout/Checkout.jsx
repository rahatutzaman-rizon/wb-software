import  { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useParams } from "react-router-dom"; // Assuming you're using React Router for routing

const Checkout = () => {
    const { id } = useParams(); // Get the ID from the URL parameters
    const [formData, setFormData] = useState({
        fullName: '',
        formNo: '',
        parentName: '',
        parentNumber: '',
        school: '',
        jobInfo: '',
        email: '',
        gender: '',
        presentAddress: '',
        permanentAddress: '',
        nid: '',
        mobile: '',
        guardianName: '',
        dob: '',
        bloodGroup: '',
    });
    const [cartItems, setCartItems] = useState([]); // State to hold filtered cart items
    const [totalPrice, setTotalPrice] = useState(0); // Initialize totalPrice

    useEffect(() => {
        // Retrieve cart data from local storage
        const cartData = JSON.parse(localStorage.getItem("cart")) || [];
        
        // Filter cart items to match the provided ID
        const filteredItems = cartData.filter(item => item.id === parseInt(id));
        setCartItems(filteredItems);

        // Calculate total price from filtered cart items
        const total = filteredItems.reduce((acc, item) => acc + (parseFloat(item.discount_price) * item.quantity), 0);
        setTotalPrice(total);
    }, [id]); // Run effect when ID changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`; // Generate a random order ID
        const order = {
            orderId,
            ...formData,
            totalPrice,
            cartItems,
        };

        // Store the order in local storage
        localStorage.setItem("order", JSON.stringify(order));
        alert("Order submitted successfully! Order ID: " + orderId);
    };

    return (
        <div className="mt-5 border mx-2">
            <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
                <h2 className='text-5xl font-bold'>Trainee Admission Form</h2>
            </div>
            <form className="bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
                {/* Trainee Information Section */}
                <div className="form-section">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="fullName" className="block font-semibold text-base mb-2">Full Name:</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="formNo" className="block font-semibold text-base mb-2">Form No:</label>
                            <input
                                type="text"
                                id="formNo"
                                name="formNo"
                                value={formData.formNo}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="parentName" className="block font-semibold text-base mb-2">Father/Mother Name:</label>
                            <input
                                type="text"
                                id="parentName"
                                name="parentName"
                                value={formData.parentName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="parentNumber" className="block font-semibold text-base mb-2">Number:</label>
                            <input
                                type="text"
                                id="parentNumber"
                                name="parentNumber"
                                value={formData.parentNumber}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    {/* Add remaining fields similarly */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="totalPrice" className="block font-semibold text-base mb-2">Total Price:</label>
                            <input
                                type="number"
                                id="totalPrice"
                                value={totalPrice}
                                readOnly
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="m-mt_16px">
                    <div className="pt-p_16px">
                        <div className="lg:flex items-start gap-3">
                            <div className="w-full lg:w-[58%] bg-white border-2">
                                <table className="overflow-x-auto w-full">
                                    <thead>
                                        <tr className="border-b-4 border-gray-300">
                                            <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">Course</th>
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">Discount Price</th>
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">Quantity</th>
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">Sub Total</th>
                                        </tr>
                                    </thead>

                                    <tbody className="overflow-x-auto">
                                        {cartItems.length > 0 ? (
                                            cartItems.map((item, index) => (
                                                <tr key={index} className="border-b border-gray-300 overflow-x-auto">
                                                    <td>
                                                        <div className="flex items-center justify-center">
                                                            <div className="w-[20%] text-center flex items-center justify-center">
                                                                <RiDeleteBin5Line className="text-xl hover:text-footer_color cursor-pointer" />
                                                            </div>
                                                            <div className="flex flex-col text-center justify-center items-center py-2 w-[80%]">
                                                                <div className="mask">
                                                                    <img className="h-[40px] w-[70px]" src={item.photo} alt={item.course_name} />
                                                                </div>
                                                                <p className="text-[14.4px] px-[7px] text-center flex">
                                                                    {item.course_name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">{item.discount_price}</p>
                                                    </td>
                                                    <td>
                                                        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">{item.quantity}</p>
                                                    </td>
                                                    <td>
                                                        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">{(parseFloat(item.discount_price) * item.quantity).toFixed(2)}</p>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center p-4">No items found for this ID</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="lg:w-[41%] bg-white border-2 ">
                                <div className="px-[30px]">
                                    <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">Cart Summary</h2>
                                    <div className="py-3 flex justify-between border-b border-gray-300">
                                        <p className="text-black font-bold">Total Price</p>
                                        <p className="text-black font-bold">{totalPrice.toFixed(2)}</p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4 block text-center mx-auto w-full"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
