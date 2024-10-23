import  { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://itder.com/api/get-course-list');
                setCourses(response.data.courseData);
            } catch (error) {
                console.error('Error fetching course data:', error);
            } finally {
                setLoading(false);
            }
        };

        // Fetch courses when the component mounts
        fetchCourses();

        // Retrieve cart data from local storage if it exists
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    const calculateDiscountPercentage = (regularPrice, discountPrice) => {
        return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
    };

    const saveCartToLocalStorage = (updatedCart) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const addToCart = (course) => {
        const isAlreadyInCart = cart.some((item) => item.id === course.id);

        if (isAlreadyInCart) {
            toast.warning('This course is already in your cart!');
        } else {
            const updatedCart = [...cart, { ...course, quantity: 1 }];
            setCart(updatedCart);
            saveCartToLocalStorage(updatedCart);
            toast.success('Course added to cart successfully!');
        }
    };

    const increaseQuantity = (courseId) => {
        const updatedCart = cart.map((item) => 
            item.id === courseId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
    };

    const decreaseQuantity = (courseId) => {
        const updatedCart = cart.map((item) =>
            item.id === courseId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
    };

    if (loading) {
        return <p className="text-center mt-10 text-blue-500">Loading...</p>;
    }

    return (
        <div className="m-4">
            <ToastContainer />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="relative">
                            <img src={course.photo} alt={course.course_name} className="w-full h-48 object-cover" />
                            <div className="absolute top-0 left-0 p-2 bg-black bg-opacity-50">
                                <h3 className="text-white text-xl font-bold">{course.course_name}</h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <h2 className="text-gray-800 text-lg font-semibold mb-2">{course.course_name}</h2>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-blue-500 text-md">★★★★★</span>
                                <span className="ml-2 text-gray-600 text-md font-bold">{course.trainer_data?.name || 'Trainer not assigned'}</span>
                            </div>
                            <p className="text-gray-600 text-md mb-4">
                                Course Details <span className="text-blue-500">Show Details</span>
                            </p>
                            <hr />
                            <div className="mt-4 flex justify-between items-center">
                                <div>
                                    <span className="line-through text-gray-400 text-sm">Tk {course.regular_price}</span>
                                    <span className="text-green-600 text-md font-bold ml-2">
                                        -{calculateDiscountPercentage(course.regular_price, course.discount_price)}%
                                    </span>
                                    <span className="text-black text-lg font-bold ml-2">Tk {course.discount_price}</span>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full font-bold text-md"
                                    onClick={() => addToCart(course)}
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

       
        </div>
    );
};

export default Courses;
