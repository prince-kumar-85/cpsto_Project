"use client"

import { useState } from "react"

// --- Helper Components ---

const Spinner = ({ size = "h-5 w-5" }) => (
  <div className={`animate-spin rounded-full ${size} border-t-2 border-b-2 border-white`}></div>
)

const PasswordField = ({ id, name, placeholder, value, onChange, error, disabled }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  return (
    <div className="relative md:col-span-1">
      <input
        type={isPasswordVisible ? "text" : "password"}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 bg-gray-700 text-gray-200 border ${error ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <button
        type="button"
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400 hover:text-gray-200"
      >
        {isPasswordVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m0 0l-2.175 2.175"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.543 7-4.477 0-8.268-2.943-9.543-7z"
            />
          </svg>
        )}
      </button>
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-xs mt-1 animate-fade-in-up-sm">
          {error}
        </p>
      )}
    </div>
  )
}

const InputField = ({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled,
  colSpan = "md:col-span-1",
}) => (
  <div className={`relative ${colSpan}`}>
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-4 py-3 bg-gray-700 text-gray-200 border ${error ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300`}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    {error && (
      <p id={`${id}-error`} className="text-red-500 text-xs mt-1 animate-fade-in-up-sm">
        {error}
      </p>
    )}
  </div>
)

const SelectField = ({ id, name, value, onChange, error, disabled, children, colSpan = "md:col-span-2" }) => (
  <div className={`relative ${colSpan}`}>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-4 py-3 bg-gray-700 text-gray-200 border ${error ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 appearance-none`}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
    >
      {children}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
    {error && (
      <p id={`${id}-error`} className="text-red-500 text-xs mt-1 animate-fade-in-up-sm">
        {error}
      </p>
    )}
  </div>
)

// --- Gemini API Call ---
const callGeminiAPI = async (payload) => {
  const apiKey = "" // Keep this empty, it will be handled by the environment
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      console.error("API Error Response:", await response.text())
      return null
    }
    const result = await response.json()
    return result.candidates?.[0]?.content?.parts?.[0]?.text || null
  } catch (error) {
    console.error("Error calling Gemini API:", error)
    return null
  }
}

// --- Login Page ---
const LoginPage = ({ onSwitchToCreate, handleAuthSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Basic validation for demo
    const newErrors = {}
    if (!formData.email) newErrors.email = "Email is required."
    if (!formData.password) newErrors.password = "Password is required."
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      console.log("Logging in...", formData)
      const existingUserData = localStorage.getItem("userData")
      let userData = { email: formData.email, name: "New User" }

      if (existingUserData) {
        try {
          const parsedData = JSON.parse(existingUserData)
          console.log("[v0] Found existing user data during login:", parsedData)
          // Use the stored user data if it exists
          userData = parsedData
        } catch (error) {
          console.error("Error parsing stored user data:", error)
        }
      }

      console.log("[v0] Final user data for login:", userData)
      handleAuthSuccess(userData)
    }
  }

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-white">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="login-email"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          colSpan="col-span-1"
        />
        <PasswordField
          id="login-password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <div>
          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 transform hover:-translate-y-1"
          >
            Sign In
          </button>
        </div>
      </form>
      <p className="text-sm text-center text-gray-400">
        Don't have an account?{" "}
        <button onClick={onSwitchToCreate} className="font-semibold text-indigo-400 hover:underline">
          Sign Up
        </button>
      </p>
    </div>
  )
}

// --- Location Data ---
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]

const indianCities = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Tawang"],
  Assam: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"],
  Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur"],
  Goa: ["Panaji", "Margao", "Vasco da Gama"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  Haryana: ["Faridabad", "Gurugram", "Panipat", "Ambala"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
  Karnataka: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  Manipur: ["Imphal"],
  Meghalaya: ["Shillong", "Tura"],
  Mizoram: ["Aizawl", "Lunglei"],
  Nagaland: ["Kohima", "Dimapur"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  Sikkim: ["Gangtok", "Namchi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
  Tripura: ["Agartala"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Greater Noida"],
  Uttarakhand: ["Dehradun", "Haridwar", "Roorkee"],
  "West Bengal": ["Kolkata", "Howrah", "Asansol", "Siliguri"],
  "Andaman and Nicobar Islands": ["Port Blair"],
  Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa"],
  Delhi: ["New Delhi", "Noida", "Gurgaon", "Faridabad"],
  "Jammu and Kashmir": ["Srinagar", "Jammu"],
  Ladakh: ["Leh", "Kargil"],
  Lakshadweep: ["Kavaratti"],
  Puducherry: ["Puducherry"],
}

// --- Create Account Page ---
const CreateAccountPage = ({ onSwitchToLogin, handleAuthSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    password: "",
    confirmPassword: "",
    skills: "",
    bio: "",
    serviceLocations: [{ state: "", city: "", district: "" }],
  })
  const [errors, setErrors] = useState({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [apiError, setApiError] = useState("")
  const [roleSuggestions, setRoleSuggestions] = useState([])
  const [trainingScenario, setTrainingScenario] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLocationChange = (index, e) => {
    const { name, value } = e.target
    const updatedLocations = [...formData.serviceLocations]
    const currentLocation = { ...updatedLocations[index] }
    currentLocation[name] = value
    // Reset city if state changes
    if (name === "state") {
      currentLocation.city = ""
    }
    updatedLocations[index] = currentLocation
    setFormData((prev) => ({ ...prev, serviceLocations: updatedLocations }))
  }

  const handleAddLocation = () => {
    setFormData((prev) => ({
      ...prev,
      serviceLocations: [...prev.serviceLocations, { state: "", city: "", district: "" }],
    }))
  }

  const handleRemoveLocation = (index) => {
    const updatedLocations = formData.serviceLocations.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, serviceLocations: updatedLocations }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName) newErrors.firstName = "First name is required."
    if (!formData.lastName) newErrors.lastName = "Last name is required."
    if (!formData.email) newErrors.email = "Email is required."
    if (!formData.password) newErrors.password = "Password is required."
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters."
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match."

    const locationErrors = []
    formData.serviceLocations.forEach((loc, index) => {
      const locError = {}
      if (!loc.state) locError.state = "State is required."
      if (!loc.city) locError.city = "City is required."
      if (!loc.district) locError.district = "District is required."
      if (Object.keys(locError).length > 0) {
        locationErrors[index] = locError
      }
    })

    if (locationErrors.length > 0) newErrors.serviceLocations = locationErrors

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Creating account...", formData)
      const userData = {
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        locations: formData.serviceLocations,
        skills: formData.skills,
        phone: formData.phone,
        age: formData.age,
        bio: formData.bio,
      }
      console.log("[v0] Storing user data during signup:", userData)
      handleAuthSuccess(userData)
    }
  }

  const handleSuggestRoles = async () => {
    if (!formData.skills) {
      setErrors((prev) => ({ ...prev, skills: "Please enter some skills or interests first." }))
      return
    }
    setIsGenerating(true)
    setApiError("")
    setRoleSuggestions([])

    const prompt = `Based on the skills "${formData.skills}", suggest 3 potential volunteer roles for a crisis response platform in India. For each role, provide a one-sentence description. Format the output as a numbered list.`
    const payload = { contents: [{ parts: [{ text: prompt }] }] }

    const suggestions = await callGeminiAPI(payload)
    if (suggestions) {
      setRoleSuggestions(suggestions.split("\n").filter((s) => s.length > 0))
    } else {
      setApiError("Could not fetch suggestions. Please try again later.")
    }
    setIsGenerating(false)
  }

  const handleGenerateBio = async () => {
    const requiredFields = ["firstName", "lastName", "age", "skills"]
    const missingFields = requiredFields.filter((field) => !formData[field])
    if (missingFields.length > 0) {
      setErrors((prev) => ({ ...prev, bio: `Please fill in ${missingFields.join(", ")} to generate a bio.` }))
      return
    }
    if (formData.serviceLocations.some((loc) => !loc.state || !loc.city)) {
      setErrors((prev) => ({ ...prev, serviceLocations: [{ state: "Please complete all location details." }] }))
      return
    }

    setIsGenerating(true)
    setApiError("")
    const locationsString = formData.serviceLocations.map((l) => `${l.city}, ${l.state}`).join("; ")
    const prompt = `Write a short, encouraging, and professional volunteer bio (2-3 sentences). Here is the information: Name: ${formData.firstName} ${formData.lastName}, Age: ${formData.age}, Available in: ${locationsString}, Skills/Interests: ${formData.skills}. The bio should highlight their willingness to help in their community across the specified locations.`
    const payload = { contents: [{ parts: [{ text: prompt }] }] }

    const generatedBio = await callGeminiAPI(payload)
    if (generatedBio) {
      setFormData((prev) => ({ ...prev, bio: generatedBio.trim() }))
    } else {
      setApiError("Could not generate a bio. Please try again later.")
    }
    setIsGenerating(false)
  }

  const handleGenerateScenario = async () => {
    const firstLocation = formData.serviceLocations[0]
    if (!firstLocation || !firstLocation.state || !firstLocation.city) {
      setErrors((prev) => ({
        ...prev,
        serviceLocations: [{ state: "Please enter at least one full service location." }],
      }))
      return
    }
    setIsGenerating(true)
    setApiError("")
    setTrainingScenario("")

    const prompt = `Generate a brief, one-paragraph training scenario for a new CrisisConnect volunteer based in ${firstLocation.city}, ${firstLocation.state}, India. The scenario should describe a realistic, localized potential emergency where a volunteer's help would be crucial. The tone should be informative and educational, not alarming.`
    const payload = { contents: [{ parts: [{ text: prompt }] }] }

    const scenarioText = await callGeminiAPI(payload)
    if (scenarioText) {
      setTrainingScenario(scenarioText.trim())
    } else {
      setApiError("Could not generate a scenario. Please try again later.")
    }
    setIsGenerating(false)
  }

  return (
    <div className="w-full max-w-3xl p-8 space-y-6 bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-white">Create Your Volunteer Account</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <InputField
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          disabled={isGenerating}
        />
        <InputField
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          disabled={isGenerating}
        />
        <InputField
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isGenerating}
          colSpan="md:col-span-2"
        />
        <InputField
          id="phone"
          name="phone"
          type="tel"
          placeholder="Phone Number (Optional)"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          disabled={isGenerating}
        />
        <InputField
          id="age"
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          error={errors.age}
          disabled={isGenerating}
        />

        <div className="md:col-span-2 space-y-4">
          <p className="text-gray-300 text-sm">Service Location(s)</p>
          {formData.serviceLocations.map((location, index) => {
            const availableCities = indianCities[location.state] || []
            return (
              <div key={index} className="p-4 border border-gray-700 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 font-semibold">Location {index + 1}</p>
                  {formData.serviceLocations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLocation(index)}
                      className="px-2 py-1 text-xs text-red-400 hover:bg-red-900 rounded"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <SelectField
                    id={`state-${index}`}
                    name="state"
                    value={location.state}
                    onChange={(e) => handleLocationChange(index, e)}
                    error={errors.serviceLocations?.[index]?.state}
                    disabled={isGenerating}
                    colSpan="md:col-span-2"
                  >
                    <option value="">Select State/Territory</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </SelectField>
                  <SelectField
                    id={`city-${index}`}
                    name="city"
                    value={location.city}
                    onChange={(e) => handleLocationChange(index, e)}
                    error={errors.serviceLocations?.[index]?.city}
                    disabled={isGenerating || !location.state}
                    colSpan="md:col-span-1"
                  >
                    <option value="">{location.state ? "Select City" : "Select State First"}</option>
                    {availableCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </SelectField>
                  <InputField
                    id={`district-${index}`}
                    name="district"
                    placeholder="District"
                    value={location.district}
                    onChange={(e) => handleLocationChange(index, e)}
                    error={errors.serviceLocations?.[index]?.district}
                    disabled={isGenerating}
                  />
                </div>
              </div>
            )
          })}
          <button
            type="button"
            onClick={handleAddLocation}
            className="w-full px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-400 transition-all duration-300 transform hover:-translate-y-1"
          >
            + Add Another Location
          </button>
        </div>

        <PasswordField
          id="password"
          name="password"
          placeholder="Password (min. 8 characters)"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isGenerating}
        />
        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          disabled={isGenerating}
        />

        <div className="md:col-span-2">
          <label htmlFor="skills" className="block text-sm font-medium text-gray-300 mb-2">
            Skills & Interests
          </label>
          <textarea
            id="skills"
            name="skills"
            rows="3"
            placeholder="e.g., First Aid, Driving, Cooking, Communication, Logistics..."
            value={formData.skills}
            onChange={handleChange}
            disabled={isGenerating}
            className="w-full px-4 py-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          ></textarea>
          {errors.skills && <p className="text-red-500 text-xs mt-1 animate-fade-in-up-sm">{errors.skills}</p>}
          <button
            type="button"
            onClick={handleSuggestRoles}
            disabled={isGenerating}
            className="mt-2 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 disabled:bg-sky-300 transform hover:-translate-y-1"
          >
            {isGenerating ? <Spinner size="h-4 w-4" /> : "✨"}
            <span>Suggest Roles</span>
          </button>
          {roleSuggestions.length > 0 && (
            <div className="mt-4 p-4 bg-gray-700 rounded-lg animate-fade-in">
              <h4 className="font-semibold text-white">Suggested Roles:</h4>
              <ul className="list-disc list-inside text-gray-300 mt-2">
                {roleSuggestions.map((role, i) => (
                  <li key={i}>{role}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
            Your Volunteer Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            placeholder="A brief bio will be generated here..."
            value={formData.bio}
            onChange={handleChange}
            disabled={isGenerating}
            className="w-full px-4 py-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          ></textarea>
          {errors.bio && <p className="text-red-500 text-xs mt-1 animate-fade-in-up-sm">{errors.bio}</p>}
        </div>

        <div className="md:col-span-2 -mt-4 mb-2 flex items-start">
          <button
            type="button"
            onClick={handleGenerateBio}
            disabled={isGenerating}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-300 disabled:bg-teal-300 transform hover:-translate-y-1"
          >
            {isGenerating ? <Spinner size="h-4 w-4" /> : "✨"}
            <span>Generate Bio</span>
          </button>
        </div>

        <div className="md:col-span-2 mb-2 flex flex-col items-start">
          <button
            type="button"
            onClick={handleGenerateScenario}
            disabled={isGenerating}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-300 disabled:bg-orange-300 transform hover:-translate-y-1"
          >
            {isGenerating ? <Spinner size="h-4 w-4" /> : "✨"}
            <span>Generate Training Scenario</span>
          </button>
          {trainingScenario && (
            <div className="mt-4 p-4 w-full bg-orange-900 bg-opacity-30 border border-orange-700 rounded-lg animate-fade-in">
              <h4 className="font-semibold text-orange-300">Your Training Scenario:</h4>
              <p className="text-orange-300 mt-1">{trainingScenario}</p>
            </div>
          )}
        </div>

        {apiError && <p className="text-red-500 text-sm md:col-span-2 animate-fade-in-up-sm">{apiError}</p>}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full px-4 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 disabled:bg-indigo-400 transform hover:-translate-y-1"
          >
            Create Account
          </button>
        </div>
      </form>
      <p className="text-sm text-center text-gray-400">
        Already have an account?{" "}
        <button onClick={onSwitchToLogin} className="font-semibold text-indigo-400 hover:underline">
          Sign In
        </button>
      </p>
    </div>
  )
}

// --- Background Animation Component ---
const HelpingHandsBackground = () => {
  const hands = Array.from({ length: 15 }) // Generate 15 hands

  const HandSvg = () => (
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M62.3,49.2c0.2,0-12.2,2.3-12.2,2.3s-2.1,1-3.7,1.2c-2.3,0.3-4.5,0-4.5,0s-2.2-0.3-3.6-0.8c-1.4-0.5-2.6-1.3-3.2-2.1 c-0.6-0.8-0.7-1.9-0.7-1.9s0.3-2.3,0.3-3.6c0-1.3-0.2-3.6-0.2-3.6s-0.2-2.1,0,1.9c0.2,0.6,0.7,1.1,1.1,1.4c0.4,0.3,0.9,0.5,1.4,0.6c0.7,0.4,1.8,0.6,2.8,0.6 c1,0,2.1,0.2,2.1,0.2s1.7,0.4,2.7,0.9c1,0.5,2.1,1.3,2.8,2.4c0.7,1.1,1,2.7,1,2.7s0.5,2.3,0.5,3.9c0,1.6-0.2,3.1-0.2,3.1 s-0.2,2.1,0,1.9c0.2,0.6,0.7,1.1,1.1,1.4c0.4,0.3,0.9,0.5,1.4,0.6c0.5,0.1,1.1,0.1,1.6,0c0.5-0.1,1,0.3,1.5,0.6c0.5,0.3,0.9,0.7,1.1,1.1c-0.4-0.2-0.9-0.3-1.4-0.3c-0.5,0-1.1,0-1.6,0.1c-0.5,0.1-1,0.3-1.5,0.6c-0.5,0.3-0.9,0.7-1.1,1.1c-0.2,0.4-0.3,0.9-0.3-1.4c0-0.5,0-1.1,0.1-1.6c0.1-0.5,0.3-1,0.6-1.5c0.3-0.5,0.7-0.9,1.1-1.1l0.3,0.1l-0.1,0.1c0,0-2,1.2-2.1,1.3c-0.1,0.1-0.2,0.2-0.2,0.3 v0.3c0,0.1,0.1,0.2,0.2,0.2h0.3c0.1,0,0.2-0.1,0.2-0.2v-0.3c0-0.1-0.1-0.2-0.2-0.2h-0.3c-0.1,0-0.2,0.1-0.2,0.2v0.3 c0,0.1,0.1,0.2,0.2,0.2h0.3c0.1,0,0.2-0.1,0.2-0.2l2.1-1.3l-0.1-0.1l-0.3-0.1c-0.4-0.2-0.8-0.6-1.1-1.1 c-0.3-0.5-0.5-1-0.6-1.5c-0.1-0.5,0-1.1,0.1-1.6c0-0.5,0.2-1,0.3-1.4c0.2-0.4,0.6-0.9,1.1-1.1c0.5-0.3,1-0.5,1.5-0.6 c0.5-0.1,1.1-0.1,1.6,0c0.5,0.1,1,0.3,1.4,0.6c0.4,0.3,0.9,0.7,1.1,1.1c0.2,0.4,0.3,0.9,0.3,1.4c0,0.5-0.1,1.1-0.3,1.6 c-0.2,0.5-0.5,1-1.1,1.4c-0.6,0.4-1.3,0.7-2.1,0.9c-0.8,0.2-1.7,0.3-2.6,0.3s1.8,0.1,2.6,0.3c0.8,0.2,1.5,0.5,2.1,0.9C49.5,41.2,49.5,41.2,49.5,41.2z M49.5,41.2c-0.4-1-1.3-2-2-2.4c-0.7-0.4-1.8-0.6-2.8-0.6c-1,0-2.1,0.2-2.1,0.2s-1.7,0.4-2.7,0.9 c-1,0.5-2.1,1.3-2.8,2.4c-0.7,1.1-1,2.7-1,2.7s-0.5,2.3-0.5,3.9c0,1.6,0.2,3.1,0.2,3.1s0.2,1.3,0,1.9c-0.2,0.6-0.7,1.1-1.1,1.4 c-0.4,0.3-0.9,0.5-1.4,0.6c-0.5,0.1-1.1,0.1-1.6,0c-0.5-0.1-1-0.3-1.5-0.6c-0.5-0.3-0.9-0.7-1.1-1.1c-0.2-0.4-0.3-0.9-0.3-1.4c0,0.5-0.1,1.1-0.3,1.6 c-0.2,0.5-0.5,1-1.1,1.4c-0.6,0.4-1.3,0.7-2.1,0.9c-0.8,0.2-1.7,0.3-2.6,0.3c-0.9,0-1.8,0.1-2.6,0.3 c-0.8,0.2-1.5,0.5-2.1,0.9C49.5,41.2,49.5,41.2,49.5,41.2z" />
    </svg>
  )

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="relative w-full h-full">
        {hands.map((_, i) => {
          const style = {
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 80 + 40}px`,
            animationDuration: `${Math.random() * 20 + 15}s`,
            animationDelay: `${Math.random() * 10}s`,
          }
          return (
            <div key={i} className="floating-hand text-gray-700" style={style}>
              <HandSvg />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// --- App Component ---
export default function AuthSystem() {
  const [isLoginView, setIsLoginView] = useState(true)

  const handleAuthSuccess = (userData) => {
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("userData", JSON.stringify(userData))
    window.location.reload() // Refresh to show main app
  }

  return (
    <div className="min-h-screen bg-gray-900 relative flex items-center justify-center font-sans p-4 overflow-hidden">
      <HelpingHandsBackground />
      <style>{`
        .floating-hand {
            position: absolute;
            bottom: -150px;
            animation: float-up linear infinite;
        }

        @keyframes float-up {
            0% {
                transform: translateY(0);
                opacity: 0;
            }
            10%, 90% {
                opacity: 0.08;
            }
            100% {
                transform: translateY(-110vh);
                opacity: 0;
            }
        }

        @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-down {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up-sm {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-fade-in-down { animation: fade-in-down 0.6s ease-out forwards; }
        .animate-fade-in-up-sm { animation: fade-in-up-sm 0.4s ease-out forwards; }
       `}</style>
      <div className="relative w-full z-10">
        <div className="text-center mb-8">
          <h1
            className="text-5xl font-bold text-white tracking-wider animate-fade-in-down drop-shadow-lg"
            style={{ animationDelay: "0.1s" }}
          >
            CrisisConnect
          </h1>
          <p className="text-white text-lg mt-2 animate-fade-in-down drop-shadow-md" style={{ animationDelay: "0.3s" }}>
            Connect. Respond. Save.
          </p>
        </div>
        <div className="flex justify-center">
          {isLoginView ? (
            <LoginPage onSwitchToCreate={() => setIsLoginView(false)} handleAuthSuccess={handleAuthSuccess} />
          ) : (
            <CreateAccountPage onSwitchToLogin={() => setIsLoginView(true)} handleAuthSuccess={handleAuthSuccess} />
          )}
        </div>
      </div>
    </div>
  )
}
