import React, {useState} from 'react'
import { Country, State, City } from "country-state-city";
import Card1 from '../images/Card1.png';

const RequestBlood = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

    const countries = Country.getAllCountries();

    const handleCountryChange = (e) => {
      const countryIsoCode = e.target.value;
      setSelectedCountry(countryIsoCode);
      setSelectedState(""); // Reset state when country changes
      setCities([]); // Reset city when country changes
  
      const fetchedStates = State.getStatesOfCountry(countryIsoCode);
      setStates(fetchedStates);
    };
  
    const handleStateChange = (e) => {
      const stateIsoCode = e.target.value;
      setSelectedState(stateIsoCode);
  
      const fetchedCities = City.getCitiesOfState(selectedCountry, stateIsoCode);
      setCities(fetchedCities);
    };
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12">
    <div className="w-full h-full  grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Image Section (Hidden on mobile) */}
      <div className="hidden md:block">
        <img
          src={Card1}
          alt="Blood Donation"
          className="w-full h-full object-cover p-14"
        />
      </div>

      {/* Form Section */}
      <div className='bg-gradient-to-t from-[#840000] to-[#ffff] shadow-md py-3'>
      <div className='bg-white rounded-[42px] shadow-lg m-5 py-4 px-8'>
      <div className="p-6 flex flex-col justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Request <span className="text-[#840000]">For Blood</span>
          </h1>
        </div>
        <form className="mt-4 space-y-3">
          <div>
            <label>Patient Name</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label>Gender</label>
            <div className="flex gap-3">
              <input type="radio" name="gender" value="Male" /> Male
              <input type="radio" name="gender" value="Female" /> Female
            </div>
          </div>

          <div>
            <label>Phone Number</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="+92 000000000" />
          </div>

          <div>
            <label>Email</label>
            <input type="email" className="w-full px-3 py-2 border rounded-md" placeholder="abc@example.com" />
          </div>

          <div>
            <label>Select Blood Group</label>
            <select className="w-full px-3 py-2 border rounded-md">
              <option value="O Rh+">O Rh+</option>
              <option value="O Rh-">O Rh-</option>
              <option value="A Rh+">A Rh+</option>
              <option value="A Rh-">A Rh-</option>
              <option value="B Rh-">B Rh-</option>
              <option value="AB Rh+">AB Rh+</option>
              <option value="AB Rh-">AB Rh-</option>
            </select>
          </div>

          <div>
            <label>Till Required Date</label>
            <input type="date" className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div className="flex justify-center">
            <button className="px-6 py-2 bg-[#840000] text-white rounded-md">Submit</button>
          </div>
        </form>
      </div>
      </div>
      </div>
    </div>
  </div>
    // <div>
    //   <div className='flex items-center justify-center min-h-screen bg-gray-50 p-4'>
    //     <div className='w-full h-full max-w-md'>
    //         <div className='h-24 flex items-center justify-center text-black mt-12 '>
    //             <img src="" alt="" />
    //             <h1 className='text-2xl font-bold'>Request <span className='text-[#840000]'>For Blood</span></h1>
    //         </div>
    //         <div className='bg-gradient-to-t from-[#840000] to-[#ffff] shadow-md py-3'>
    //             <div className='bg-white rounded-[42px] shadow-lg m-5 py-4 px-8'>
    //         <form className='space-y-1 text-lg flex flex-col'>
    //             <label>Patient Name</label>
    //             <div>
    //                 <input type="text" name="name" id='btn1' className='w-full px-3 py-1'/>
    //             </div>
    //             <label>Gender</label>
    //             <div className='flex gap-3'>
    //                 <input type="radio" name="gender" value="Male"  required/>Male
    //                 <input type="radio" name="gender" value="Female" required/>Female
    //             </div>
    //             <label>Phone Number </label>
    //             <div>
    //                 <input type="text" name="phone"  placeholder=" +92 000000000" required id='btn1' className='w-full px-3 py-1'/>
    //             </div>
    //             <label>E-mail</label>    
    //             <div>
    //                 <input type="text" name="E-mail" placeholder="abc@example.com" required id='btn1' className='w-full px-3 py-1'/>
    //             </div>
    //             <label>Select Blood Group </label>
    //             <div >
    //                 <select name="Select" id="btn1" className='w-full px-3 py-2 border border-gray-300 rounded-md'>
                        
    //                     <option value="O Rh+">O Rh+</option>
    //                     <option value="O Rh-">O Rh-</option>
    //                     <option value="A Rh+">A Rh+</option>
    //                     <option value="A Rh-">A Rh-</option>
    //                     <option value="B Rh-">B Rh-</option>
    //                     <option value="AB Rh+">AB Rh+</option>
    //                     <option value="AB Rh-">AB Rh-</option>
    //                 </select>
    //             </div>
    //             <label>Till  Required Date </label>
    //             <div>
    //                 <input type="date" name="date" placeholder= "dd/mm/yyyy"required id='btn1' className='w-full px-3 py-1'/>
    //             </div>
    //           {/* Country */}
    //           <div>
    //             <label>Country</label>
    //             <select
    //               value={selectedCountry}
    //               onChange={handleCountryChange}
    //               className="w-full px-3 py-2 border border-gray-300 rounded-md"
    //               id='btn1'
    //             >
    //               <option value="">Select Country</option>
    //               {countries.map((country) => (
    //                 <option
    //                   key={country.isoCode}
    //                   value={country.isoCode}
    //                   className="text-black"
    //                 >
    //                   {country.name}
    //                 </option>
    //               ))}
    //             </select>
    //           </div>

    //           {/* State */}
    //           <div>
    //             <label>Province/State</label>
    //             <select
    //               value={selectedState}
    //               onChange={handleStateChange}
    //               disabled={!states.length}
    //               className="w-full px-3 py-2 border border-gray-300 rounded-md"
    //               id='btn1'
    //             >
    //               <option value="">Select State</option>
    //               {states.map((state) => (
    //                 <option
    //                   key={state.isoCode}
    //                   value={state.isoCode}
    //                   className="text-black"
    //                 >
    //                   {state.name}
    //                 </option>
    //               ))}
    //             </select>
    //           </div>

    //           {/* City */}
    //           <div>
    //             <label>City</label>
    //             <select
    //               value=""
    //               onChange={(e) => {}}
    //               disabled={!cities.length}
    //               className="w-full px-3 py-2 border border-gray-300 rounded-md"
    //               id='btn1'
    //             >
    //               <option value="">Select City</option>
    //               {cities.map((city) => (
    //                 <option
    //                   key={city.name}
    //                   value={city.name}
    //                   className="text-black"
    //                 >
    //                   {city.name}
    //                 </option>
    //               ))}
    //             </select>
    //           </div> 
    //             <div className='flex justify-center'>
    //                 <input type="submit" value="Submit" className='px-6 py-2 mt-3' id='btn2'/>
    //             </div>
    //         </form>
    //     </div>
    //     </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default RequestBlood
