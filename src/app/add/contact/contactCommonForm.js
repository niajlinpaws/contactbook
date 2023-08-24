import { useState } from 'react';

import '../../../styles/form.css';

const ContactCommonForm = ({ contactList, setIsStep2Visible }) => {
  const [formData, setFormData] = useState({
    primaryContact: '',
    headOfFamily: '',
    localAddress: '',
    nativeAddress: '',
    gotra: '',
  });

  const onChange = ({ target: { name, value } }) => {
    // console.log('🚀 ~ file: addForm.js:21 ~ onChange ~ name:', name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="flex justify-between">
        <header>Family Common Details</header>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form first">
          <div className="details personal">
            {/* <span className="title">Family Common Details</span> */}
            <div className="fields">
              <div className="input-field">
                <label>Primary Contact</label>
                <select
                  name="primaryContact"
                  onChange={onChange}
                  required
                  value={formData.primaryContact}
                >
                  <option disabled value="">
                    Select primary contact
                  </option>
                  {contactList.map((contact, i) => (
                    <option key={i} value={i}>
                      {contact.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-field">
                <label>Head of Family</label>
                <select
                  name="headOfFamily"
                  onChange={onChange}
                  required
                  value={formData.headOfFamily}
                >
                  <option disabled value="">
                    Select head of family
                  </option>
                  {contactList.map((contact, i) => (
                    <option key={i} value={i}>
                      {contact.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-field">
                <label>Local Address</label>
                <input
                  name="localAddress"
                  onChange={(e) => onChange(e)}
                  placeholder="Enter your local address"
                  required
                  type="textarea"
                  value={formData.localAddress}
                />
              </div>
              <div className="input-field">
                <label>Native Address</label>
                <input
                  name="nativeAddress"
                  onChange={(e) => onChange(e)}
                  placeholder="Enter your native address"
                  required
                  type="textarea"
                  value={formData.nativeAddress}
                />
              </div>
              <div className="input-field">
                <label>Gotra</label>
                <input
                  name="gotra"
                  onChange={onChange}
                  placeholder="Enter your gotra"
                  required
                  type="text"
                  value={formData.gotra}
                />
              </div>
            </div>
          </div>
          <div className="buttons">
            <div className="backBtn" onClick={() => setIsStep2Visible(false)}>
              <i className="uil uil-navigator"></i>
              <span className="btnText">Back</span>
            </div>

            <button className="sumbit">
              <span className="btnText">Submit</span>
              <i className="uil uil-navigator"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactCommonForm;
