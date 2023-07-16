import { useState } from "react";
// import { IndianStates } from '../constants/IndianStates';

const Registration = () => {
    const [formData, setFormdata] = useState({
        motiveOfJoining: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        mobileNumber: '',
        dob: '',
        gender: '',
        fatherName: '',
        fatherMob: '',
        motherName: '',
        motherMob: '',
        category: '',
        nationality: '',
        addressLine1: '',
        addressLine2: '',
        country: '',
        state: '',
        district: '',
        city: '',
        pinCode: '',
        schoolName: '',
        schoolCity: '',
    });

    const handleChange = (event) => {
        setFormdata(...formData, [event.target.name], event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.email !== formData.confirmEmail) {
            alert('Emails do not match');
            return;
        }

        try {
            const response = await fetch('api/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Form submitted successfully', responseData);
                alert('Form submitted successfully');
            } else {
                console.log('Form submission failed', response.statusText);
                alert('Form submission failed');
            }
        } catch (error) {
            console.log('Error submitting form', error);
            alert('Error submitting form');
        }
    };

    return (
        <>
            <form>
                <div className="border-b border-gray-900/10 pb-12">
                    <h1 className='my-2'>Personal Details</h1>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="firstName"
                                aria-label="First name"
                                name="firstName"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="lastName"
                                aria-label="Last name"
                                name="lastName"
                                onChange={handleChange}
                            />
                        </div>
                    </div>


                    <div className="row g-3">
                        <div className="col">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="email"
                                aria-label="Email"
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="confirmEmail">Retype Email</label>
                            <input
                                type="email"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="confirmEmail"
                                aria-label="Retype Email"
                                name="confirmEmail"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col">
                            <label htmlFor="mobileNumber">Mobile Number</label>
                            <input
                                type="tel"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="mobileNumber"
                                aria-label="Mobile Number"
                                name="mobileNumber"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="dob">DOB</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="dob"
                                aria-label="Date of Birth"
                                name="dob"
                                onChange={handleChange}
                            />
                        </div>
                    </div>


                    <fieldset className="row mb-3">
                        <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
                        <div className="col-sm-10">
                            <div className="form-check">
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="radio"
                                    name="gender"
                                    id="male"
                                    value="male"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="male">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="radio"
                                    name="gender"
                                    id="female"
                                    value="female"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="female">
                                    Female
                                </label>
                            </div>
                        </div>
                    </fieldset>


                    <fieldset className="row mb-3">
                        <legend className="col-form-label col-sm-2 pt-0">For Class?</legend>
                        <div className="col-sm-10">
                            <div className="form-check">
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="radio"
                                    name="class"
                                    id="class9"
                                    value="9th"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="class9">
                                    9th
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="radio"
                                    name="class"
                                    id="class10"
                                    value="10th"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="class10">
                                    10th
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="radio"
                                    name="class"
                                    id="class11"
                                    value="11th"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="class11">
                                    11th
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="radio"
                                    name="class"
                                    id="class12"
                                    value="12th"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="class12">
                                    12th
                                </label>
                            </div>
                        </div>
                    </fieldset>


                    <h1 className='my-2'>Category</h1>

                    <select
                        className="form-select"
                        aria-label="Default select example"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="0">Category</option>
                        <option value="1">General</option>
                        <option value="2">SC</option>
                        <option value="3">ST</option>
                        <option value="4">OBC</option>
                        <option value="5">PWD</option>
                        <option value="6">EWS</option>
                    </select>


                    <h1 className='my-2'>Address</h1>

                    <form className="row g-3">
                        <div className="col-12">
                            <label htmlFor="address1" className="form-label">Address 1</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="address1"
                                name="addressLine1"
                                placeholder="1234 Main St"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="address2" className="form-label">Address 2</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="address2"
                                name="addressLine2"
                                placeholder="Apartment, studio, or floor"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="city" className="form-label">City</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="city"
                                name="city"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="zip" className="form-label">Zip</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="zip"
                                name="zipCode"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="state" className="form-label">State</label>
                            <select
                                id="state"
                                className="form-select"
                                name="state"
                                onChange={handleChange}
                            >
                                <option value="">select</option>
                                {Object.values(IndianStates).map((state, index) => (
                                    <option key={index} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>

                    </form>


                    <h1 className='my-2'>School Details</h1>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="schoolName" className="form-label">School Name</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="schoolName"
                                name="schoolName"
                                placeholder="School name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="schoolCity" className="form-label">School City</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="schoolCity"
                                name="schoolCity"
                                placeholder="School city"
                                onChange={handleChange}
                            />
                        </div>
                    </div>


                    <h1 className='my-2'>Other Details</h1>

                    <fieldset className="row mb-3">
                        <legend className="col-form-label col-sm-2 pt-0">Alternative Mobile Number</legend>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="alternativeMobileNumber"
                                name="alternativeMobileNumber"
                                placeholder="Mobile number"
                                aria-label="Mobile number"
                                onChange={handleChange}
                            />
                            <div className="form-check">
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="radio"
                                    name="alternativeMobileContact"
                                    id="fatherContact"
                                    value="father"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="fatherContact">
                                    Father
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="radio"
                                    name="alternativeMobileContact"
                                    id="motherContact"
                                    value="mother"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="motherContact">
                                    Mother
                                </label>
                            </div>
                            <div className="form-check disabled">
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="radio"
                                    name="alternativeMobileContact"
                                    id="guardianContact"
                                    value="guardian"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="guardianContact">
                                    Guardian
                                </label>
                            </div>
                        </div>
                    </fieldset>


                    <fieldset className="row mb-3">
                        <legend className="col-form-label col-sm-2 pt-0">Alternative Email Id</legend>
                        <div className="col-sm-10">
                            <input
                                type="email"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="alternativeEmail"
                                name="alternativeEmail"
                                placeholder="Email ID"
                                aria-label="Email ID"
                                onChange={handleChange}
                            />
                            <div className="form-check">
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="radio"
                                    name="alternativeEmailContact"
                                    id="fatherContact"
                                    value="father"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="fatherContact">
                                    Father
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="radio"
                                    name="alternativeEmailContact"
                                    id="motherContact"
                                    value="mother"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="motherContact">
                                    Mother
                                </label>
                            </div>
                            <div className="form-check disabled">
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="radio"
                                    name="alternativeEmailContact"
                                    id="guardianContact"
                                    value="guardian"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="guardianContact">
                                    Guardian
                                </label>
                            </div>
                        </div>
                    </fieldset>


                    <div className="form-check">
                        <input
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="checkbox"
                            id="termsCheckbox"
                            name="termsCheckbox"
                            value=""
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="termsCheckbox">
                            Do you agree to our terms and conditions?
                        </label>
                    </div>



                    <button
                        type="submit"
                        className="btn my-5"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#C62828',
                            padding: '30px 70px',
                            color: '#fff',
                        }}
                        onClick={handleSubmit}
                    >
                        Register
                    </button>
                </div>
            </form>
        </>
    )
}

export default Registration;