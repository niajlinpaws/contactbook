'use client';

import { memo, useEffect, useState } from 'react';

import EditIcon from '../../../../public/editButton';
import Bin from '../../../../public/bin';

import AddForm from './addForm';
import ContactCommonForm from './contactCommonForm';
import ContactIcon from '../../../../public/contact';

const displayDate = (date) =>
  Intl.DateTimeFormat('en-IN').format(new Date(date || null));

export default function AddContact() {
  const [contactModalData, setContactModalData] = useState(null);
  const [contactList, setContactList] = useState([]);
  const [isStep2Visible, setIsStep2Visible] = useState(false);

  useEffect(() => {
    setContactList(JSON.parse(localStorage.getItem('listData')) || []);
  }, []);

  const openContactDialog = (data, i) => {
    console.log('🚀 ~ file: page.js:29 ~ openContactDialog ~ i:', i);
    document.body.style.overflow = 'hidden';
    setContactModalData(i > -1 ? { ...data, i } : {});
    // document.getElementById('contactModal').showModal();
  };

  const hideContactDialog = () => {
    document.body.style.overflow = 'scroll';
    setContactModalData(null);
  };
  const deleteData = (i) => {
    confirm(`Are you sure you want to remove ${contactList[i].name}?`)
      ? setContactList((prev) => {
          // const list =
          prev.splice(i, 1);

          console.log('🚀 ~ file: page.js:32 ~ ?setContactList ~ i:', i, prev);
          localStorage.setItem('listData', JSON.stringify(prev));

          return prev;
        })
      : '';
    // setTimeout(() => {
    //   console.log(
    //     '🚀 ~ file: page.js:48 ~ setTimeout ~ contactList:',
    //     contactList,
    //   );
    // }, 0);
  };

  const MobileCard = memo(function card({ data, i }) {
    return (
      <div className="bg-white space-y-3 p-4 rounded-lg shadow">
        <div className="flex items-center space-x-2 text-sm">
          <div>
            <p
              className="text-blue-500 font-bold capitalize truncate"
              style={{ width: '13rem' }}
            >
              {data.name}
            </p>
          </div>

          <div style={{ gap: '10px', display: 'flex', marginLeft: 'auto' }}>
            <span
              className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50"
              onClick={() => openContactDialog(data, i)}
            >
              <EditIcon className="w-4 h-4 font-semibold stroke-gray-600 hover:cursor-pointer" />
            </span>
            <span
              className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50"
              onClick={() => deleteData(i)}
            >
              <Bin className="w-4 h-4 font-semibold stroke-gray-600 hover:cursor-pointer" />
            </span>
          </div>
        </div>
        <div
          className="text-sm text-black"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <span>{displayDate(data.dateOfBirth)}</span>
          <div className="text-sm text-gray-700">{data.contactNumber}</div>
          <div className="text-gray-500 capitalize">{data.gender}</div>
        </div>
      </div>
    );
  });

  const DesktopCard = ({ data, i }) => (
    <tr className="bg-white">
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <p className="font-bold text-blue-500 capitalize">{data.name}</p>
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap capitalize">
        {data.gender}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {data.contactNumber}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {displayDate(data.dateOfBirth)}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <div style={{ display: 'flex', gap: '20px' }}>
          <span
            className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 cursor-pointer"
            onClick={() => openContactDialog(data, i)}
          >
            <EditIcon className="w-4 h-4 font-semibold stroke-gray-600 hover:cursor-pointer" />
          </span>
          <span
            className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50 cursor-pointer"
            onClick={() => deleteData(i)}
          >
            <Bin className="w-4 h-4 font-semibold stroke-gray-600 hover:cursor-pointer" />
          </span>
        </div>
      </td>
    </tr>
  );

  return (
    // <section className="container">
    //   <header>Registration Form</header>
    //   <form action="#" className="form">
    //     <div className="input-box">
    //       <label>Full Name</label>
    //       <input type="text" placeholder="Enter full name" required />
    //     </div>

    //     <div className="input-box">
    //       <label>Email Address</label>
    //       <input type="text" placeholder="Enter email address" required />
    //     </div>

    //     <div className="column">
    //       <div className="input-box">
    //         <label>Phone Number</label>
    //         <input type="number" placeholder="Enter phone number" required />
    //       </div>
    //       <div className="input-box">
    //         <label>Birth Date</label>
    //         <input type="date" placeholder="Enter birth date" required />
    //       </div>
    //     </div>
    //     <div className="gender-box">
    //       <h3>Gender</h3>
    //       <div className="gender-option">
    //         <div className="gender">
    //           <input type="radio" id="check-male" name="gender" checked />
    //           <label for="check-male">male</label>
    //         </div>
    //         <div className="gender">
    //           <input type="radio" id="check-female" name="gender" />
    //           <label for="check-female">Female</label>
    //         </div>
    //         <div className="gender">
    //           <input type="radio" id="check-other" name="gender" />
    //           <label for="check-other">prefer not to say</label>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="input-box address">
    //       <label>Address</label>
    //       <input type="text" placeholder="Enter street address" required />
    //       <input
    //         type="text"
    //         placeholder="Enter street address line 2"
    //         required
    //       />
    //       <div className="column">
    //         <div className="select-box">
    //           <select>
    //             <option hidden>Country</option>
    //             <option>America</option>
    //             <option>Japan</option>
    //             <option>India</option>
    //             <option>Nepal</option>
    //           </select>
    //         </div>
    //         <input type="text" placeholder="Enter your city" required />
    //       </div>
    //       <div className="column">
    //         <input type="text" placeholder="Enter your region" required />
    //         <input type="number" placeholder="Enter postal code" required />
    //       </div>
    //     </div>
    //     <button>Submit</button>
    //   </form>
    // </section>
    <>
      {contactModalData && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-zinc-700/50"
          id="modal-bg"
          style={{ padding: '15px' }}
        >
          <AddForm
            contactModalData={contactModalData}
            setContactListData={setContactList}
            hideContactDialog={hideContactDialog}
          />
        </div>
      )}

      <div className="p-5 h-screen bg-gray-100">
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <ContactIcon className="w-10 h-10 font-semibold stroke-gray-600 hover:cursor-pointer" />
          <h1 className="text-xl text-black">Contact Book</h1>
        </div>
        {!isStep2Visible ? (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedfont-bold my-10"
              onClick={openContactDialog}
            >
              Add Contact
            </button>
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200 text-black">
                  <tr>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                      Name
                    </th>
                    <th className="w-20  p-3 text-sm font-semibold tracking-wide text-left">
                      Gender
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                      Contact No.
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                      Date of Birth
                    </th>
                    <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {contactList.length ? (
                    contactList.map((contact, i) => (
                      <DesktopCard
                        data={contactList[i]}
                        i={i}
                        key={contact.name}
                      />
                    ))
                  ) : (
                    <tr>
                      <td className="text-black text-center" colSpan={5}>
                        Start adding contacts to show here!
                      </td>
                    </tr>
                  )}
                  {/* <tr className="bg-gray-50">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <a href="#" className="font-bold text-blue-500 hover:underline">
                  10002
                </a>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Kring New Fit office chair, mesh + PU, black
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                  Shipped
                </span>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                16/10/2021
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                $200.00
              </td>
            </tr> */}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              {contactList.length ? (
                contactList.map((contact, i) => (
                  <MobileCard
                    data={contactList[i]}
                    i={i}
                    key={contact.name + i}
                  />
                ))
              ) : (
                <p className="text-black mt-10 text-center">
                  Start adding contacts to show here!
                </p>
              )}
            </div>
            {!!contactList.length && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedfont-bold my-10"
                  onClick={() => setIsStep2Visible(true)}
                >
                  Proceed to next step
                </button>
              </div>
            )}
          </>
        ) : (
          <ContactCommonForm
            {...{ contactList, setContactList, setIsStep2Visible }}
          />
        )}
      </div>
    </>
  );
}
