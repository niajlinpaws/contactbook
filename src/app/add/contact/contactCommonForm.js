import { useRouter, usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

import fetchAPI from '../../../../utils/fetchHelper';

import '../../../styles/form.css';

const ContactCommonForm = ({
  contactList,
  isEdit = false,
  setIsStep2Visible,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const commonDetails = useMemo(
    () => (isEdit ? contactList.find((x) => x.isPrimary) : {}),
    [isEdit],
  );
  const [formData, setFormData] = useState({
    address: commonDetails.address || '',
    email: commonDetails.email || '',
    gotra: commonDetails.gotra || '',
    headOfFamily: commonDetails.head || '',
    nativeAddress: commonDetails.nativeAddress || '',
    picture: commonDetails.picture || '',
    primaryContact: commonDetails.primaryContact || '',
  });
  const [isLoading, setIsLoading] = useState(false);

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
    try {
      e.preventDefault();
      // return router.push('/contact/svjds');
      setIsLoading(true);
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
      if (isEdit) {
        const payload = {
          ...formData,
          head: commonDetails.head,
          primaryContact: commonDetails.primaryContact,
          newHead: formData.headOfFamily,
          newPrimaryContact: formData.primaryContact,
        };
        console.log(
          '🚀 ~ file: contactCommonForm.js:58 ~ onSubmit ~ payload:',
          payload,
        );

        const { res, err } = await fetchAPI({
          endpoint: 'admin/users/edit/commonDetail',
          method: 'POST',
          payload,
        });

        if (res.message === 'Common details updated successfully')
          return alert('Updated Successfully');

        return alert('Oops! something went wrong.');
      }

      const { res, err } = await fetchAPI({
        endpoint: 'admin/users/check',
        method: 'POST',
        payload: {
          contactNumber: duplicateContactList[primaryContact].contactNumber,
        },
      });

      if (err) {
        return alert('Oops! Something went wrong.');
      }

      if (res === 'Contactnumber Not Found') {
        const { res, err } = await fetchAPI({
          endpoint: 'admin/users/register',
          method: 'POST',
          payload: { users: duplicateContactList },
        });

        if (err || res.message) {
          return alert('Oops! Something went wrong.');
        }

        localStorage.removeItem('listData');
        alert('Contact added successfully');
        // if (res === '')
        console.log(
          '🚀 ~ file: contactCommonForm.js:53 ~ onSubmit ~ res:',
          res,
        );
        pathname.includes('add') &&
          router.replace(`/contact/${res.find((x) => x.isPrimary)._id}`);
        return;
      }

      alert('Primary Contact Number already exists');
    } finally {
      setIsLoading(false);
    }
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
                    <option key={i} value={contact._id || i}>
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
                    <option key={i} value={contact._id || i}>
                      {contact.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-field">
                <label>Full Address (local)</label>
                <input
                  minLength={10}
                  name="address"
                  onChange={(e) => onChange(e)}
                  placeholder="Enter your full local address"
                  required
                  type="textarea"
                  value={formData.address}
                />
              </div>
              <div className="input-field">
                <label>Native Town/City</label>
                <input
                  minLength={3}
                  name="nativeAddress"
                  onChange={(e) => onChange(e)}
                  placeholder="Enter your native village/town/city"
                  required
                  type="text"
                  value={formData.nativeAddress}
                />
              </div>
              <div className="input-field">
                <label>Gotra</label>
                <input
                  name="gotra"
                  onChange={onChange}
                  pattern="[A-Za-z]+"
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
                  name="picture"
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
                {formData.picture && (
                  <img
                    alt="familyPhoto"
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
            <button
              className="backBtn"
              disabled={isLoading}
              onClick={() => setIsStep2Visible(false)}
            >
              <i className="uil uil-navigator" />
              <span className="btnText">Back</span>
            </button>

            <button className="submit" disabled={isLoading} type="submit">
              <span className="btnText">
                {isLoading ? 'Submitting...' : 'Submit'}
              </span>
              <i className="uil uil-navigator" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactCommonForm;
