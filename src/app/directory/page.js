'use client';

import { useEffect, useState } from 'react';

import EditIcon from '../../../public/editButton';
import Bin from '../../../public/bin';
import ContactIcon from '../../../public/contact';
import FilterIcon from '../../../public/filter';
import SearchContactIcon from '../../../public/searchContact';
import HeadIcon from '../../../public/headIcon';
import PrimaryContact from '../../../public/primaryContact';
import FamilyIcon from '../../../public/familyCount';
import MobileIcon from '../../../public/mobile';
import LocationPin from '../../../public/locationPin';

import FilterModal from './filterModal';

import fetchAPI from '../../../utils/fetchHelper';
import { FamilyDetailsModal, genderTextStyle } from './familyDetailsModal';

const displayDate = (date) =>
  Intl.DateTimeFormat('en-IN').format(new Date(date || null));

export default function Directory() {
  const [contactModalData, setContactModalData] = useState(null);
  const [filterModalData, setFilterModalData] = useState({
    data: '',
    search: false,
    visible: false,
  });
  const [contactList, setContactList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isStep2Visible, setIsStep2Visible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUsersData() {
      try {
        const { res, err } = await fetchAPI({
          endpoint: 'admin/users/find/',
          method: 'POST',
        });

        console.log('🚀 ~ file: page.js:32 ~ getUsersData ~ res:', res);
        if (res.data) {
          return setContactList(res);
        }

        alert('Oops! something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    getUsersData();
  }, []);
  useEffect(() => {
    filterModalData.search && getSearchResults();
  }, [filterModalData.search]);

  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const openContactDialog = (data, i) => {
    document.body.style.overflow = 'hidden';
    setContactModalData({ ...data, i });
    // document.getElementById('contactModal').showModal();
  };
  const hideContactDialog = () => {
    document.body.style.overflow = 'scroll';
    setContactModalData(null);
  };
  const getSearchResults = async () => {
    // if (searchQuery.trim()) {
    setContactList([]);
    setLoading(true);

    const { res, err } = await fetchAPI({
      endpoint: 'admin/users/find',
      method: 'POST',
      payload: JSON.stringify({
        searchFields: filterModalData.data.includes('includeFamilyMembers')
          ? ''
          : filterModalData.data,
        'search[value]': searchQuery,
      }),
    });

    setLoading(false);

    if (!err) {
      setContactList(res);
    }

    // setIsStep2Visible(false);
    // }

    setFilterModalData((prev) => ({ ...prev, search: false }));
  };

  const MobileCard = ({ data, i }) => {
    // console.log('🚀 ~ file: page.js:73 ~ MobileCard ~ data:', data);

    return (
      <div className="bg-white space-y-3 p-4 rounded-lg shadow">
        <div className="flex space-x-2 text-base">
          <div
            onClick={() => openContactDialog(data)}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <div
              style={{
                width: '11rem',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <HeadIcon className="w-5 h-5 font-semibold stroke-gray-600 hover:cursor-pointer" />
              <p
                className={`${genderTextStyle(
                  data.head.gender,
                )} capitalize truncate`}
              >
                {data.head.name}
              </p>
            </div>
            <div
              className={`${genderTextStyle(
                data.primaryContact.gender,
              )} capitalize`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                width: '11rem',
              }}
            >
              <PrimaryContact className="w-4 h-4 font-semibold stroke-gray-600 hover:cursor-pointer" />
              <p className="truncate">{data.primaryContact.name}</p>
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
                <p>{data.totalMembers}</p>
              </div>
              <p className="truncate font-bold" style={{ maxWidth: '6rem' }}>
                {data.gotra}
              </p>
            </div>
            <a
              href={`tel:${data.primaryContact.contactNumber}`}
              className="text-black flex items-center"
              style={{ gap: '1px', width: 'fit-content' }}
            >
              <MobileIcon className="w-4 h-4 font-semibold stroke-gray-600 hover:cursor-pointer" />
              {data.primaryContact.contactNumber}
            </a>
          </div>
        </div>
        <div
          className="text-sm text-gray-700 flex items-start gap-1"
          onClick={() => openContactDialog(data)}
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
  };

  const DesktopCard = ({ data, i }) => (
    <tr className="bg-white">
      <td className="p-3 text-sm text-gray-700">
        <HeadIcon className="w-5 h-5 font-semibold stroke-gray-600 hover:cursor-pointer" />
        <p
          className={`font-bold ${
            data.gender === 'Male' ? 'text-blue-500' : 'text-pink-500'
          } capitalize`}
        >
          {data.name}
        </p>
      </td>
      <td className="p-3 text-sm text-gray-700 capitalize">
        {data.contactNumber}
      </td>
      <td className="p-3 text-sm text-gray-700">{data.occupation || '-'}</td>
      {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {'{displayDate(data.dateOfBirth)}'}
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
      </td> */}
    </tr>
  );

  return (
    <>
      {contactModalData && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-zinc-700/50 flex flex-col items-center"
          id="modal-bg"
          style={{ padding: '0 15px', zIndex: 1 }}
        >
          <FamilyDetailsModal
            data={contactModalData}
            hideContactDialog={hideContactDialog}
          />
        </div>
      )}
      {filterModalData.visible && (
        <div
          className="absolute top-0 left-0 w-screen h-screen bg-zinc-700/50 flex flex-col justify-center items-center"
          id="modal-bg"
          style={{ padding: '0 15px' }}
        >
          <FilterModal
            data={filterModalData}
            setFilterModalData={setFilterModalData}
          />
        </div>
      )}

      <div className="p-5 min-h-screen bg-gray-100">
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
                    name="search"
                    onChange={(e) => onChange(e)}
                    placeholder="Enter keyword"
                    required
                    style={{ width: '100%' }}
                    type="text"
                    value={searchQuery}
                  />
                </div>
                <div onClick={getSearchResults}>
                  <SearchContactIcon
                    className="w-7 h-7 font-semibold stroke-gray-600 hover:cursor-pointer"
                    style={{ position: 'absolute', right: '5px', top: '14px' }}
                  />
                </div>
              </div>
              {/* <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedfont-bold my-10"
                onClick={openContactDialog}
              >
                Search
              </button> */}
              <FilterIcon
                onClick={() =>
                  setFilterModalData((prev) => ({ ...prev, visible: true }))
                }
                className="w-8 h-8 font-semibold stroke-gray-600 hover:cursor-pointer"
              />
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
                        No Contact Found
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
              {!loading &&
                (contactList.data?.length ? (
                  contactList.data.map((contact, i) => (
                    <MobileCard
                      data={contact}
                      i={i}
                      key={contact.primaryContact._id}
                    />
                  ))
                ) : (
                  <p className="text-black mt-10 text-center">
                    No Contact Found
                  </p>
                ))}
            </div>
            {loading && (
              <div
                style={{
                  color: 'black',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {/* <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedfont-bold my-10"
                  onClick={() => setIsStep2Visible(true)}
                > */}
                Fetching Contacts...
                {/* </button> */}
              </div>
            )}
          </>
        ) : (
          'Fetching Contacts...'
        )}
      </div>
    </>
  );
}
