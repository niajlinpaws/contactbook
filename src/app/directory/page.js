'use client';

import { useEffect, useState } from 'react';

import EditIcon from '../../../public/editButton';
import Bin from '../../../public/bin';
import ContactIcon from '../../../public/contact';

import AddForm from '../add/contact/addForm';
import ContactCommonForm from '../add/contact/contactCommonForm';
import FilterIcon from '../../../public/filter';
import SearchContactIcon from '../../../public/searchContact';
import HeadIcon from '../../../public/headIcon';
import PrimaryContact from '../../../public/primaryContact';
import FamilyIcon from '../../../public/familyCount';
import MobileIcon from '../../../public/mobile';
import LocationPin from '../../../public/locationPin';

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
    setContactModalData({ ...data, i });
    // document.getElementById('contactModal').showModal();
  };
  const hideContactDialog = () => {
    setContactModalData(null);
  };
  const deleteData = (i) => {
    confirm(`Are you sure you want to remove ${contactList[i].name}?`)
      ? setContactList((prev) => {
          const list = prev.splice(0, 1);

          console.log('🚀 ~ file: page.js:32 ~ ?setContactList ~ i:', i, list);
          localStorage.setItem('listData', JSON.stringify(prev));

          return prev;
        })
      : '';
  };

  const MobileCard = ({ data, i }) => (
    <div className="bg-white space-y-3 p-4 rounded-lg shadow">
      <div className="flex space-x-2 text-base">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div
            style={{
              width: '11rem',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <HeadIcon className="w-5 h-5 font-semibold stroke-gray-600 hover:cursor-pointer" />
            <p className="text-blue-500 capitalize truncate">{data.head}</p>
          </div>
          <div
            className="text-black capitalize"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              width: '11rem',
            }}
          >
            <PrimaryContact className="w-4 h-4 font-semibold stroke-gray-600 hover:cursor-pointer" />
            <p className="truncate">{data.primaryContact}</p>
          </div>
        </div>

        <div
          style={{
            gap: '10px',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 'auto',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          {/* <span
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
          </span> */}
          <div
            className="text-gray-500 capitalize"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <div className="flex items-center">
              <FamilyIcon className="w-4 h-4 font-semibold stroke-gray-600 hover:cursor-pointer" />
              <p>{data.members}</p>
            </div>
            <p className="truncate font-bold">{data.gotra}</p>
          </div>
          <a
            href={`tel:${data.primaryContactNumber}`}
            className="text-black flex items-center"
            style={{ gap: '1px', width: 'fit-content' }}
          >
            <MobileIcon className="w-4 h-4 font-semibold stroke-gray-600 hover:cursor-pointer" />
            {data.primaryContactNumber}
          </a>
        </div>
      </div>
      <div
        className="text-base text-gray-700 flex items-start gap-1"
        style={{ marginTop: '2.5vh' }}
      >
        <LocationPin className="w-8 h-7 font-semibold stroke-gray-600 hover:cursor-pointer" />
        <p className="line-clamp-2" style={{ background: '#e5e7eb96' }}>
          {data.address}
        </p>
      </div>
      {/* <div
        className="text-sm text-black"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <span>{data.primaryContact}</span>
        <div className="text-gray-500 capitalize">{data.gotra}</div>
        <div className="text-sm text-gray-700">{data.address}</div>
      </div> */}
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
    <>
      {/* {contactModalData && (
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
      )} */}

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
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '5px',
                margin: '2vh 0',
              }}
            >
              <div
                style={{ display: 'flex', position: 'relative', width: '80vw' }}
              >
                <div className="input-field" style={{ width: '100%' }}>
                  <input
                    name="address"
                    //   onChange={(e) => onChange(e)}
                    placeholder="Enter keyword"
                    required
                    style={{ width: '100%' }}
                    type="textarea"
                    //   value={formData.address}
                  />
                </div>
                <SearchContactIcon
                  style={{ position: 'absolute', right: '5px', top: '14px' }}
                  className="w-7 h-7 font-semibold stroke-gray-600 hover:cursor-pointer"
                />
              </div>
              {/* <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedfont-bold my-10"
                onClick={openContactDialog}
              >
                Search
              </button> */}
              <FilterIcon className="w-8 h-8 font-semibold stroke-gray-600 hover:cursor-pointer" />
              {/* <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedfont-bold my-10"
                onClick={openContactDialog}
              >
                +
              </button> */}
              {/* {contactModalData && ( */}
              {/* )} */}
            </div>
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200 text-black">
                  <tr>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                      Family Head
                    </th>
                    <th className="w-20  p-3 text-sm font-semibold tracking-wide text-left">
                      Primary Contact
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                      Address
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                      Gotra
                    </th>
                    <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                      Family Members
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
              {[{}].length ? (
                [
                  {
                    head: 'V C Jain',
                    primaryContact: 'Vipin Jain',
                    address: 'Shyam Nagar',
                    gotra: 'Jhanjhari',
                    members: 6,
                  },
                  {},
                ].map((contact, i) => (
                  <MobileCard
                    data={{
                      head: 'Shri Vimal Chand Jhanjhari',
                      primaryContact: 'Vipin Jain',
                      primaryContactNumber: '1234567890',
                      address:
                        'C-118, near my own school, shri ram marg, Shyam Nagar, Jaipur - 302019',
                      gotra: 'Jhanjhari',
                      members: 6,
                    }}
                    i={i}
                    key={contact.head + i}
                  />
                ))
              ) : (
                <p className="text-black mt-10 text-center">
                  Start adding contacts to show here!
                </p>
              )}
            </div>
            {contactList.length && (
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
