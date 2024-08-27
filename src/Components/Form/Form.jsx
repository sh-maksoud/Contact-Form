import { useState } from 'react';
import './Form.css';
import * as Yup from 'yup';

function Form() {
    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        queryType: '',
        message: '',
        consent: false
    };

            // Reset form data to initial values

    const [formData, setFormData] = useState(initialFormData);// <-- Added this line to clear the form data
    const [errorsArray, setErrorsArray] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const userSchema = Yup.object().shape({
        firstName: Yup.string().required('This field is required'),
        lastName: Yup.string().required('This field is required'),
        email: Yup.string().email('Invalid email').required('Please enter a valid email address'),
        queryType: Yup.string().required('Please select a query type'),
        message: Yup.string().required('This field is required'),
        consent: Yup.boolean().required().oneOf([true], 'To submit this form, please consent to being contacted')
    });

    async function testValidation() {
        try {
            await userSchema.validate(formData, {
                abortEarly: false
            });
            setSuccessMessage('Message is sent!');
            setErrorsArray([]);
            
            // Reset form data to initial values
            setFormData(initialFormData);
        } catch (err) {
            var errors = [];
            err.inner.forEach((error) => {
                errors.push({
                    key: error.path,
                    message: error.message
                });
            });
            setErrorsArray(errors);
            setSuccessMessage('');
        }
    }

    function handleOnFormSubmit(event) {
        event.preventDefault();
        testValidation();
    }

    function handleOnChange(event) {
        const keyName = event.target.name;
        let keyValue = event.target.value;
        const type = event.target.type;

        if (type === 'checkbox') {
            keyValue = event.target.checked;
        }

        setFormData({
            ...formData,
            [keyName]: keyValue
        });
    }

    // Function to handle closing the success message
    function handleSuccessMessageClick() {
        setSuccessMessage('');
    }

    return (
        <div className="form-container">
            {successMessage && (
              <div className="success-message" onClick={handleSuccessMessageClick}>
                  <div className="success-message-content">
                      <div className="success-icon">✓</div>
                      <div className="success-text">Message sent!</div>
                  </div>
                  <div className="success-message-footer">
                      Thanks for completing the form. We&apos;ll be in touch soon!
                  </div>
              </div>
            )}
            <form onSubmit={handleOnFormSubmit} action="#" method="POST">
                <h1>Contact Us</h1>

                {/* Form fields here */}
                <div className="form-row">
                    {/* First Name and Last Name Side by Side */}
                    <div className="form-group">
                        <label htmlFor="firstName">First Name *</label>
                        <input
                         onChange={handleOnChange}
                         value={formData.firstName}
                         type="text"
                         id="firstName"
                         name="firstName"
                         className={errorsArray.some(error => error.key === 'firstName') ? 'error-input' : ''}
                        />
                        {errorsArray.map((error) => {
                            if (error.key === 'firstName') {
                                return <div key={error.key} className="error-message">{error.message}</div>;
                            }
                            return null;
                        })}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name *</label>
                        <input
                            onChange={handleOnChange}
                            value={formData.lastName}
                            type="text"
                            id="lastName"
                            name="lastName"
                            className={errorsArray.some(error => error.key === 'lastName') ? 'error-input' : ''}
                        />
                        {errorsArray.map((error) => {
                            if (error.key === 'lastName') {
                                return <div key={error.key} className="error-message">{error.message}</div>;
                            }
                            return null;
                        })}
                    </div>
                </div>

                {/* Email Address Full Width */}
                <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                        onChange={handleOnChange}
                        value={formData.email}
                        type="email"
                        id="email"
                        name="email"
                        className={errorsArray.some(error => error.key === 'email') ? 'error-input' : ''}
                    />
                    {errorsArray.map((error) => {
                        if (error.key === 'email') {
                            return <div key={error.key} className="error-message">{error.message}</div>;
                        }
                        return null;
                    })}
                </div>

                {/* Query Type with Radio Inputs */}
                <div className="form-group">
                    <label htmlFor="queryType">Query Type *</label>
                    <div className="radio-group">
                        <div className="radio-item">
                            <label >
                                <input
                                    onChange={handleOnChange}
                                    value="general-enquiry"
                                    type="radio"
                                    name="queryType" 
                                    checked={formData.queryType === 'general-enquiry'}
                                />
                                General Enquiry
                            </label>
                        </div>
                        <div className="radio-item">
                            <label>
                                <input
                                    onChange={handleOnChange}
                                    value="support-request"
                                    type="radio"
                                    name="queryType"
                                    checked={formData.queryType === 'support-request'}
                                />
                                Support Request
                            </label>
                        </div>
                    </div>
                    {errorsArray.map((error) => {
                        if (error.key === 'queryType') {
                            return <div key={error.key} className="error-message">{error.message}</div>;
                        }
                        return null;
                    })}
                </div>

                {/* Message */}
                <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                        onChange={handleOnChange}
                        value={formData.message}
                        id="message"
                        name="message"
                        rows="5"
                        className={errorsArray.some(error => error.key === 'message') ? 'error-input' : ''}
                    ></textarea>
                    {errorsArray.map((error) => {
                        if (error.key === 'message') {
                            return <div key={error.key} className="error-message">{error.message}</div>;
                        }
                        return null;
                    })}
                </div>

                {/* Consent */}
                <div className={`form-group checkbox-group ${errorsArray.some(error => error.key === 'consent') ? 'error-input' : ''}`}>
    <div className="checkbox-wrapper">
        <label className='consent'>
            <input
                checked={formData.consent}
                onChange={handleOnChange}
                type="checkbox"
                name="consent"
                id="consent"
            />
            <span className="custom-checkbox"></span>
            I consent to being contacted by the team *
        </label>
    </div>
    {errorsArray.map((error) => {
        if (error.key === 'consent') {
            return <div key={error.key} className="error-message">{error.message}</div>;
        }
        return null;
    })}
</div>
                {/* Submit Button */}
                <div className="form-group">
                    <button type="submit" >Submit</button>
                     {/* disabled={!formData.consent} */}
                </div>
            </form>
        </div>
    );
}

export default Form;

