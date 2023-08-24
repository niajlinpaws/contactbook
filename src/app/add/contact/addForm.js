'use client';

import { useState } from 'react';

import CloseButton from '../../../../public/closeButton.js';

import '../../../styles/form.css';

function AddForm({ contactModalData, hideContactDialog, setContactListData }) {
  const [formData, setFormData] = useState({
    contactNo: contactModalData.contactNo || '',
    dateOfAnniversary: contactModalData.dateOfAnniversary || '',
    dateOfBirth: contactModalData.dateOfBirth || '',
    gender: contactModalData.gender || '',
    name: contactModalData.name || '',
    occupation: contactModalData.occupation || '',
  });
  const onSubmit = (e) => {
    e.preventDefault();
    setContactListData((prev) => {
      contactModalData.i && prev.splice(contactModalData.i, 1, formData);
      prev = contactModalData.i ? prev : [...prev, formData];
      localStorage.setItem('listData', JSON.stringify(prev));

      return prev;
    });
    hideContactDialog();
  };
  const onChange = ({ target: { name, value } }) => {
    // console.log('🚀 ~ file: addForm.js:21 ~ onChange ~ name:', name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //   const form = document.querySelector('form'),
  //     nextBtn = form.querySelector('.nextBtn'),
  //     backBtn = form.querySelector('.backBtn'),
  //     allInput = form.querySelectorAll('.first input');
  //   nextBtn.addEventListener('click', () => {
  //     allInput.forEach((input) => {
  //       if (input.value != '') {
  //         form.classList.add('secActive');
  //       } else {
  //         form.classList.remove('secActive');
  //       }
  //     });
  //   });
  //   backBtn.addEventListener('click', () => form.classList.remove('secActive'));

  return (
    <div className="container">
      <div className="flex justify-between">
        <header>Registration</header>
        <div onClick={hideContactDialog}>
          <CloseButton className="w-5 h-5 font-semibold stroke-gray-600 hover:cursor-pointer" />
        </div>
        {/* <div
          onClick={hideContactDialog}
          className="absolute text-2xl right-5 hover:cursor-pointer text-black"
        >
          x
        </div> */}
      </div>
      <form onSubmit={onSubmit}>
        <div className="form first">
          <div className="details personal">
            <span className="title">Personal Details</span>
            <div className="fields">
              <div className="input-field">
                <label>Full Name</label>
                <input
                  name="name"
                  onChange={(e) => onChange(e)}
                  // pattern="[a-zA-Z]"
                  placeholder="Enter your name"
                  required
                  type="text"
                  value={formData.name}
                />
              </div>
              <div className="input-field">
                <label>Date of Birth</label>
                <input
                  name="dateOfBirth"
                  onChange={onChange}
                  placeholder="Enter birth date"
                  required
                  type="date"
                  value={formData.dateOfBirth}
                />
              </div>
              <div className="input-field">
                <label>Date of Anniversary</label>
                <input
                  disabled={''}
                  name="dateOfAnniversary"
                  onChange={onChange}
                  placeholder="Enter anniversary date"
                  // required
                  type="date"
                  value={formData.dateOfAnniversary}
                />
              </div>
              {/* <div className="input-field">
                <label>Email</label>
                <input type="text" placeholder="Enter your email" required />
              </div> */}
              <div className="input-field">
                <label>Mobile Number</label>
                <input
                  name="contactNo"
                  onChange={onChange}
                  placeholder="Enter mobile number"
                  required
                  type="number"
                  value={formData.contactNo}
                />
              </div>
              <div className="input-field">
                <label>Gender</label>
                <select
                  name="gender"
                  onChange={onChange}
                  required
                  value={formData.gender}
                >
                  <option disabled value="">
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="input-field">
                <label>Occupation</label>
                <input
                  name="occupation"
                  onChange={onChange}
                  placeholder="Enter your occupation"
                  required
                  type="text"
                  value={formData.occupation}
                />
              </div>
            </div>
          </div>
          {/* <div className="details ID">
            <span className="title">Identity Details</span>
            <div className="fields">
              <div className="input-field">
                <label>ID Type</label>
                <input type="text" placeholder="Enter ID type" required />
              </div>
              <div className="input-field">
                <label>ID Number</label>
                <input type="number" placeholder="Enter ID number" required />
              </div>
              <div className="input-field">
                <label>Issued Authority</label>
                <input
                  type="text"
                  placeholder="Enter issued authority"
                  required
                />
              </div>
              <div className="input-field">
                <label>Issued State</label>
                <input type="text" placeholder="Enter issued state" required />
              </div>
              <div className="input-field">
                <label>Issued Date</label>
                <input
                  type="date"
                  placeholder="Enter your issued date"
                  required
                />
              </div>
              <div className="input-field">
                <label>Expiry Date</label>
                <input type="date" placeholder="Enter expiry date" required />
              </div>
            </div>
          </div> */}
          <button className="nextBtn">
            <span className="btnText">Create</span>
            <i className="uil uil-navigator" />
          </button>
        </div>
        {/* <div className="form second">
          <div className="details address">
            <span className="title">Address Details</span>
            <div className="fields">
              <div className="input-field">
                <label>Address Type</label>
                <input
                  type="text"
                  placeholder="Permanent or Temporary"
                  required
                />
              </div>
              <div className="input-field">
                <label>Nationality</label>
                <input type="text" placeholder="Enter nationality" required />
              </div>
              <div className="input-field">
                <label>State</label>
                <input type="text" placeholder="Enter your state" required />
              </div>
              <div className="input-field">
                <label>District</label>
                <input type="text" placeholder="Enter your district" required />
              </div>
              <div className="input-field">
                <label>Block Number</label>
                <input
                  type="number"
                  placeholder="Enter block number"
                  required
                />
              </div>
              <div className="input-field">
                <label>Ward Number</label>
                <input type="number" placeholder="Enter ward number" required />
              </div>
            </div>
          </div>
          <div className="details family">
            <span className="title">Family Details</span>
            <div className="fields">
              <div className="input-field">
                <label>Father Name</label>
                <input type="text" placeholder="Enter father name" required />
              </div>
              <div className="input-field">
                <label>Mother Name</label>
                <input type="text" placeholder="Enter mother name" required />
              </div>
              <div className="input-field">
                <label>Grandfather</label>
                <input
                  type="text"
                  placeholder="Enter grandfther name"
                  required
                />
              </div>
              <div className="input-field">
                <label>Spouse Name</label>
                <input type="text" placeholder="Enter spouse name" required />
              </div>
              <div className="input-field">
                <label>Father in Law</label>
                <input type="text" placeholder="Father in law name" required />
              </div>
              <div className="input-field">
                <label>Mother in Law</label>
                <input type="text" placeholder="Mother in law name" required />
              </div>
            </div>
            <div className="buttons">
              <div className="backBtn">
                <i className="uil uil-navigator"></i>
                <span className="btnText">Back</span>
              </div>

              <button className="sumbit">
                <span className="btnText">Submit</span>
                <i className="uil uil-navigator"></i>
              </button>
            </div>
          </div>
        </div> */}
      </form>
    </div>
  );
}

export default AddForm;
