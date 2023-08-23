'use client';

import { useEffect, useState } from 'react';

import AddForm from './addForm';

const displayDate = (date) =>
  Intl.DateTimeFormat('en-IN').format(new Date(date || null));

export default function AddContact() {
  const [contactModalData, setContactModalData] = useState(null);
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    setContactList(JSON.parse(localStorage.getItem('listData')) || []);
  }, []);

  const openContactDialog = (data, i) => {
    setContactModalData({ ...data, i });
    // document.getElementById('contactModal').showModal();
  };
  const hideContactDialog = () => {
    setContactModalData(null);
  };
  const deleteData = (i) => {
    confirm('Are you sure you want to delete?')
      ? setContactList((prev) => {
          const list = prev.splice(i, 1);
          localStorage.setItem('listData', JSON.stringify(list));

          return list;
        })
      : '';
  };

  const MobileCard = ({ data, i }) => (
    <div className="bg-white space-y-3 p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 text-sm">
        <div>
          <p className="text-blue-500 font-bold capitalize">{data.name}</p>
        </div>
        <div className="text-gray-500 capitalize">{data.gender}</div>
        <div style={{ gap: '10px', display: 'flex', marginLeft: 'auto' }}>
          <span
            className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50"
            onClick={() => openContactDialog(data, i)}
          >
            Edit
          </span>
          <span
            className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50"
            onClick={() => deleteData(i)}
          >
            Delete
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-700">{data.contactNo}</div>
      <div className="text-sm font-medium text-black">
        {displayDate(data.dateOfBirth)}
      </div>
    </div>
  );

  const DesktopCard = ({ data, i }) => (
    <tr className="bg-white">
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <p className="font-bold text-blue-500 capitalize">{data.name}</p>
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap capitalize">
        {data.gender}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {data.contactNo}
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
            Edit
          </span>
          <span
            className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50 cursor-pointer"
            onClick={() => deleteData(i)}
          >
            Delete
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
        // <Modal>
        //   <AddForm />
        // </Modal>
        <div
          className="absolute top-0 left-0 w-screen h-screen bg-zinc-700/50 flex flex-col justify-center items-center"
          id="modal-bg"
          style={{ padding: '0 15px' }}
          //   onClick={hideContactDialog}
        >
          <AddForm
            contactModalData={contactModalData}
            setContactListData={setContactList}
            hideContactDialog={hideContactDialog}
          />
        </div>
      )}

      <div className="p-5 h-screen bg-gray-100">
        <h1 className="text-xl mb-2 text-black">Contact Book</h1>
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
                contactList.map((_, i) => (
                  <DesktopCard data={contactList[i]} i={i} key={i} />
                ))
              ) : (
                <td className="text-black text-center" colSpan={5}>
                  Start adding contacts to show here!
                </td>
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
            contactList.map((_, i) => (
              <MobileCard data={contactList[i]} i={i} key={i} />
            ))
          ) : (
            <p className="text-black mt-10 text-center">
              Start adding contacts to show here!
            </p>
          )}
        </div>
      </div>
    </>
  );
}
