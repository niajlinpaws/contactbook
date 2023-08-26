import { useState } from 'react';

import fetchAPI from '../../../../utils/fetchHelper';

import '../../../styles/form.css';

const ContactCommonForm = ({ contactList, setIsStep2Visible }) => {
  const [formData, setFormData] = useState({
    address: '',
    email: '',
    familyPhoto: '',
    gotra: '',
    headOfFamily: '',
    nativeAddress: '',
    primaryContact: '',
  });

  const onChange = ({ target: { files, name, value } }) => {
    // console.log('🚀 ~ file: addForm.js:21 ~ onChange ~ name:', name, value);
    setFormData((prev) => ({
      ...prev,
      ...(name === 'familyPhoto'
        ? files[0].type.includes('image')
          ? { [name]: URL.createObjectURL(files[0]) }
          : alert('Unsupported format')
        : { [name]: value }),
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { headOfFamily, primaryContact } = formData;
    const duplicateContactList = contactList.slice();
    duplicateContactList[primaryContact] = {
      ...duplicateContactList[primaryContact],
      ...formData,
      isPrimary: true,
    };
    delete duplicateContactList[primaryContact].primaryContact;
    duplicateContactList[headOfFamily] = {
      ...duplicateContactList[headOfFamily],
      isHead: true,
    };
    console.log(formData, duplicateContactList);
    const { res, err } = await fetchAPI({
      endpoint: 'admin/users/check',
      method: 'POST',
      payload: {
        contactNumber: duplicateContactList[primaryContact].contactNumber,
      },
    });

    if (err) {
      alert('Oops! Something went wrong.');
    }

    if (res === 'Contactnumber Not Found') {
      const { res, err } = await fetchAPI({
        endpoint: 'admin/users/register',
        method: 'POST',
        payload: { users: duplicateContactList },
      });

      if (err) {
        alert('Oops! Something went wrong.');
      }

      console.log('🚀 ~ file: contactCommonForm.js:53 ~ onSubmit ~ res:', res);
    }

    alert('Primary Contact Number already exists');
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
                  name="address"
                  onChange={(e) => onChange(e)}
                  placeholder="Enter your local address"
                  required
                  type="textarea"
                  value={formData.address}
                />
              </div>
              <div className="input-field">
                <label>Native Address</label>
                <input
                  name="nativeAddress"
                  onChange={(e) => onChange(e)}
                  placeholder="Enter your native address"
                  // required
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
              <div className="input-field">
                <label>Email (to reach you out)</label>
                <input
                  name="email"
                  onChange={onChange}
                  placeholder="Enter your email"
                  required
                  type="email"
                  value={formData.email}
                />
              </div>
              <div className="input-field">
                <label htmlFor="familyPhoto">Upload Family Photo</label>
                <input
                  accept="image/*"
                  // hidden
                  id="familyPhoto"
                  name="familyPhoto"
                  onChange={onChange}
                  placeholder="upload"
                  required
                  type="file"
                  // value={formData.familyPhoto}
                />
                {/* <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedfont-bold my-10"
                    // htmlFor="familyPhoto"
                    type="button"
                  >
                    Upload Family Photo
                  </button> */}
                {formData.familyPhoto && (
                  <img
                    src={formData.familyPhoto}
                    style={{
                      height: 100,
                      marginRight: '1em',
                      objectFit: 'contain',
                      width: 100,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="buttons">
            <div className="backBtn" onClick={() => setIsStep2Visible(false)}>
              <i className="uil uil-navigator"></i>
              <span className="btnText">Back</span>
            </div>

            <button className="sumbit" type="submit">
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
