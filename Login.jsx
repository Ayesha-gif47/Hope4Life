import React,{useState} from 'react'
import Donation from '../images/donation.jpg'

const Login = () => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
    };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 mt-20">
        {/* Header Section */}
        <div className="mb-4 text-center">
          <img 
            src={Donation} 
            alt="Log In" 
            className="rounded-md mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800">Log In</h2>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit}>

          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border-b-[2px] border-gray-300 focus:outline-none focus:border-[#E46A6A] mb-4"
            required
          />

          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border-b-[2px] border-gray-300 focus:outline-none focus:border-[#E46A6A] mb-4"
            required
          />
      <div className="text-left mb-4">
        <a href="#" className="text-sm text-red-400 hover:underline">
          Forgot Password?
        </a>
      </div>
          <button
            type="submit"
            className="w-full bg-[#E46A6A] text-white py-2 rounded-md hover:bg-[#e45d5d] transition"
          >
            Log In
          </button>
        </form>         
    <div className="text-center">
      <p className="text-sm mt-4">
        Don't have an account?{" "}
    <a href="/Register" className="text-red-400 hover:underline">Register Now</a>
      </p>
    </div>
    </div>
    </div>
  )
}

export default Login
