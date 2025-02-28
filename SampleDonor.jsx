import React, {useState} from 'react'
import { Country, State, City } from "country-state-city";


const Donor = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [dates, setDates] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

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

     // Define the required wait time for each activity in months
  const activityWaitTimes = {
    Tattooing: 6,
    EarPercing: 6,
    DentalExtraction: 3,
  };

  // Handle checkbox selection
  const handleActivityChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setActivities((prev) => [...prev, value]);
      setDates((prev) => ({ ...prev, [value]: "" })); // Add empty date for the activity
    } else {
      setActivities((prev) => prev.filter((activity) => activity !== value));
      setDates((prev) => {
        const updatedDates = { ...prev };
        delete updatedDates[value]; // Remove the date for the unchecked activity
        return updatedDates;
      });
    }
  };

  // Handle date input for each activity
  const handleDateChange = (e, activity) => {
    const { value } = e.target;
    setDates((prev) => ({ ...prev, [activity]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    let maxWaitTimePassed = true;

    for (const activity of activities) {
      const date = dates[activity];
      if (!date) {
        setErrorMessage(`Please provide a date for ${activity}.`);
        return;
      }

      const activityDate = new Date(date);
      const waitMonths = activityWaitTimes[activity];
      const eligibleDate = new Date(activityDate);
      eligibleDate.setMonth(eligibleDate.getMonth() + waitMonths);

      if (today < eligibleDate) {
        maxWaitTimePassed = false;
        setErrorMessage(
          `You cannot donate blood because you had ${activity} on ${activityDate.toLocaleDateString()}. You can donate after ${eligibleDate.toLocaleDateString()}.`
        );
        return;
      }
    }

    if (maxWaitTimePassed) {
      setErrorMessage(""); // Clear the error message
      alert("You are eligible to donate blood. Thank you!");
    }
  };
  return (
    <div>
    <div className="w-full h-full max-w-[65rem] p-6">
    <div id='Donation' className='h-52 flex flex-col items-center justify-center text-white px-14'>
            <h1 className='text-3xl font-bold'>Blood Donation Form</h1>
            <p className='text-xl font-semibold'>Confidential, Please answer the following question correctly.
                This will help to protect you and the patient who receives your blood.
            </p>
        </div>
        <div className="bg-gradient-to-b from-[#840000] to-[#ffff] shadow-md py-3">
            <div className="bg-white rounded-[42px] shadow-lg mx-3 py-5 px-6">
        <form className="space-y-4 text-lg font-semibold">
        <p className='text-xl text-left text-gray-400 py-2'>Personal Details</p>
 {/* Full Name & Date of Birth */}
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block">Date Of Birth</label>
          <input
            type="date"
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>

    {/* Phone Number & Email & Occupation */}
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block">Phone Number</label>
          <input
            type="text"
            placeholder="+92 000000000"
            required
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            placeholder="abc@gmail.com"
            required
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block">Occupation</label>
          <input
            type="text"
            placeholder="Occupation"
            className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md"
          />
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-1">
        Please enter a valid phone number
      </p>
    </div>

    {/* Gender */}
    <div className="flex items-center gap-4">
      <label>Gender</label>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-1">
          <input type="radio" name="gender" value="Male" />
          Male
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" name="gender" value="Female" />
          Female
        </label>
      </div>
    </div>
     {/* Country, State, City */}
     <div>
     <div className="grid grid-cols-3 gap-4">
        <div>
        <label className="block">Country</label>
        <select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="w-full px-3 py-2 border-[2px] border-gray-300 rounded-md"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option
                      key={country.isoCode}
                      value={country.isoCode}
                      className="text-black"
                    >
                      {country.name}
                    </option>
                  ))}
                </select>
                </div>
                <div>
                <label className="block">Province/State</label>
                <select
                  value={selectedState}
                  onChange={handleStateChange}
                  disabled={!states.length}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option
                      key={state.isoCode}
                      value={state.isoCode}
                      className="text-black"
                    >
                      {state.name}
                    </option>
                  ))}
                </select>
                </div>
                <div>
                <label className="block">City</label>
                <select
                  value=""
                  onChange={(e) => {}}
                  disabled={!cities.length}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option
                      key={city.name}
                      value={city.name}
                      className="text-black"
                    >
                      {city.name}
                    </option>
                  ))}
                </select>
                </div>
    </div>
    </div>
          <p className='text-xl text-left text-gray-400 py-1'>Medical Details</p>
               {/* Blood Type Selection */}
          <label className="block text-lg font-medium text-black">Blood Type</label>
          <select
            name="bloodType"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select</option>
            <option value="O Rh+">O Rh+</option>
            <option value="O Rh-">O Rh-</option>
            <option value="A Rh+">A Rh+</option>
            <option value="A Rh-">A Rh-</option>
            <option value="B Rh-">B Rh-</option>
            <option value="AB Rh+">AB Rh+</option>
            <option value="AB Rh-">AB Rh-</option>
          </select>

          {/* Previous Donation */}
          <label className="block text-lg font-medium text-black">Have you donated previously?</label>
          <div className="flex gap-3">
            <input type="radio" name="donatedPreviously" value="yes" /> Yes
            <input type="radio" name="donatedPreviously" value="no" /> No
          </div>

          {/* Last Donation Date */}
          <label className="block text-lg font-medium text-black">Last Donation Date</label>
          <input
            type="date"
            name="lastDonationDate"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />

          {/* Diseases Checkbox */}
          <label className="block text-lg font-medium text-black">Do you have any of the following diseases?</label>
          <div className="grid grid-cols-2 gap-2">
            {["Hepatitis B/C", "Heart Disease", "Malaria", "Kidney Disease", "Lung Disease", "Diabetes", "HIV/AIDS"].map((disease) => (
              <label key={disease} className="flex items-center">
                <input type="checkbox" name="diseases" value={disease}/>
                <span className="ml-2">{disease}</span>
              </label>
            ))}
          </div>
          <label className="block text-lg font-medium text-black">In the last six months have you had any of the following?</label>
                       <div className="grid grid-cols-2 gap-2">
                           <div>
                           <div className="space-y-2">
                       {Object.keys(activityWaitTimes).map((activity) => (
                         <div key={activity} className="flex items-center gap-3">
                           <input
                             type="checkbox"
                             name="sixmonths"
                             value={activity}
                             onChange={handleActivityChange}
                             className="cursor-pointer"
                           />
                           <label>{activity}</label>
                           {activities.includes(activity) && (
                             <input
                               type="date"
                               value={dates[activity] || ""}
                               onChange={(e) => handleDateChange(e, activity)}
                               className="border border-gray-300 px-3 py-1 rounded-md"
                               required
                             />
                           )}
                         </div>
                       ))}
                     </div>
                           </div>
                       </div>
          {/* Surgery History */}
          <label className="block text-lg font-medium text-black">History of surgery or blood transfusion?</label>
          <div className="flex gap-3">
            <input type="checkbox" name="surgeries" value="Major"/> Major
            <input type="checkbox" name="surgeries" value="Minor"/> Minor
            <input type="checkbox" name="surgeries" value="Blood Transfusion"/> Blood Transfusion
          </div>
              {/* Error Message */}
          {errorMessage && <p className="text-[#840000]">{errorMessage}</p>}
          <button type="submit" className="w-full bg-gradient-to-b from-[#840000] to-[#000000] text-white py-2 rounded-md transition my-5">
            Submit
          </button>
        </form>
            </div>
           </div>
      </div>
     </div>
  )
}

export default Donor
