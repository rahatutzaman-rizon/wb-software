import  { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Modal styles
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
};

// Setting up the modal
Modal.setAppElement('#root'); // Ensure to set the root element for accessibility

const OrderDetails = () => {
    const [order, setOrder] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem('order'));
        setOrder(orderData);
    }, []);

    const openModal = (course) => {
        setSelectedCourse(course);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedCourse(null);
    };

    if (!order) {
        return <div>Loading...</div>; // Show loading message while data is being retrieved
    }

    return (
        <div className="m-mt_16px">
            <div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2">
                <div className="bg-white lg:p-p_30px w-full">
                    <div className="text-center flex flex-col justify-center items-center">
                        <p className="text-xl font-bold">Order Information</p>
                        <p className="p-3 rounded-md lg:my-2 my-1 w-fit border bg-[#D2C5A2] font-bold text-lg">
                            Order Id: <span className="font-semibold">{order.orderId}</span>
                        </p>
                    </div>

                    <div className="w-full border flex flex-col md:flex-row md:items-start md:mt-4 mt-3 bg-[#D2C5A2] rounded-md p-4">
                        <div className="md:text-base text-sm flex-1 font-semibold md:border-r-2 md:border-black md:pr-10">
                            <p className="font-bold md:mb-4 w-full">Customer Information</p>
                            <div className="space-y-1 w-full">
                                <div className="flex items-center justify-between">
                                    <p>Full Name:</p>
                                    <p className="text-start">{order.fullName}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Email:</p>
                                    <p>{order.email || 'N/A'}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Mobile:</p>
                                    <p>{order.mobile || 'N/A'}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Parent Name:</p>
                                    <p className="text-start">{order.parentName}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Parent Number:</p>
                                    <p>{order.parentNumber}</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:text-base text-sm flex-1 font-semibold md:ml-10 mt-m_medium">
                            <p className="font-bold md:mb-4 w-full">Order Summary</p>
                            <div className="space-y-1 w-full">
                                <div className="flex items-center justify-between">
                                    <p>Order ID:</p>
                                    <p>{order.orderId}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Total Price:</p>
                                    <p>{order.totalPrice} BDT</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:my-8 md:my-6 my-8 px-p_4px">
                        <p className="md:my-2 font-semibold">Courses:</p>
                        <table className="overflow-x-auto border w-full">
                            <thead className="b w-full">
                                <tr className="text-sm">
                                    <th className="lg:w-20 md:w-16 w-8 py-2 md:py-4 lg:py-6 border">Image</th>
                                    <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">Course Name</th>
                                    <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">Trainer Name</th>
                                    <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border">Quantity</th>
                                    <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border text-center">Price</th>
                                    <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="md:text-base text-sm font-semibold">
                                {order.cartItems.map((item) => (
                                    <tr key={item.id}>
                                        <td className="border text-center w-10 h-12 px-2">
                                            <img className="w-full h-full object-cover mx-auto" src={item.photo} alt={item.course_name} />
                                        </td>
                                        <td className="lg:py-6 md:py-4 py-2 text-center border">{item.course_name}</td>
                                        <td className="lg:py-6 md:py-4 py-2 text-center border">{item.trainer_data?.name || 'N/A'}</td>
                                        <td className="lg:py-6 md:py-4 py-2 text-center border">{item.quantity}</td>
                                        <td className="lg:py-6 md:py-4 py-2 text-center border">{item.discount_price} BDT</td>
                                        <td className="lg:py-6 md:py-4 py-2 text-center border">
                                            <button
                                                className="bg-blue-500 text-white rounded px-2 py-1"
                                                onClick={() => openModal(item)}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal for Course Details */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Course Details"
            >
                <h2 className="text-lg font-bold">{selectedCourse?.course_name}</h2>
                {selectedCourse && (
                    <div>
                        <img className="w-full h-40 object-cover mb-4" src={selectedCourse.photo} alt={selectedCourse.course_name} />
                        <p><strong>Trainer:</strong> {selectedCourse.trainer_data?.name}</p>
                        <p><strong>Trainer Phone:</strong> {selectedCourse.trainer_data?.phone}</p>
                        <p><strong>Description:</strong> {selectedCourse.trainer_data?.details}</p>
                        <p><strong>Regular Price:</strong> {selectedCourse.regular_price} BDT</p>
                        <p><strong>Discount Price:</strong> {selectedCourse.discount_price} BDT</p>
                        <button
                            className="mt-4 bg-red-500 text-white rounded px-4 py-2"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default OrderDetails;
