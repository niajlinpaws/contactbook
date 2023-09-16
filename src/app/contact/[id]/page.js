'use client';

import { useEffect, useMemo, useState } from 'react';

import AddForm from '../../add/contact/addForm';
import ContactCommonForm from '../../add/contact/contactCommonForm';

import fetchAPI from '../../../../utils/fetchHelper';

import EditIcon from '../../../../public/editButton';
import Bin from '../../../../public/bin';
import ContactIcon from '../../../../public/contact';
import { useRouter } from 'next/navigation';

const displayDate = (date) =>
  Intl.DateTimeFormat('en-IN').format(new Date(date || null));

export default function EditContact({ params }) {
  const [contactModalData, setContactModalData] = useState(null);
  const [contactList, setContactList] = useState([]);
  const [isStep2Visible, setIsStep2Visible] = useState(false);
  const commonDetails = useMemo(
    () => contactList.find((x) => x.isPrimary),
    [contactList],
  );
  const router = useRouter();

  useEffect(() => {
    const getContactDetail = async () => {
      const { res, err } = await fetchAPI({
        endpoint: `admin/users/view/${params.id}?includeFamilyMembers=true`,
        method: 'GET',
      });
      console.log('🚀 ~ file: page.js:26 ~ getContactDetail ~ res:', res);

      if (err || res.message) alert('Oops!, something went wrong.');
      setContactList(res.users || []);
    };
    getContactDetail();
  }, []);

  const openContactDialog = (data, i) => {
    document.body.style.overflow = 'hidden';
    setContactModalData({ ...data, i, primaryContactId: commonDetails._id });
    // document.getElementById('contactModal').showModal();
  };
  const hideContactDialog = () => {
    document.body.style.overflow = 'scroll';
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
          {/* <span
            className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50"
            onClick={() => deleteData(i)}
          >
            <Bin className="w-4 h-4 font-semibold stroke-gray-600 hover:cursor-pointer" />
          </span> */}
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
        {displayDate(data.dateOfMarriage)}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {data.occupation || '-'}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <div style={{ display: 'flex', gap: '20px' }}>
          <span
            className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 cursor-pointer"
            onClick={() => openContactDialog(data, i)}
          >
            <EditIcon className="w-4 h-4 font-semibold stroke-gray-600 hover:cursor-pointer" />
          </span>
          {/* <span
            className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50 cursor-pointer"
            onClick={() => deleteData(i)}
          >
            <Bin className="w-4 h-4 font-semibold stroke-gray-600 hover:cursor-pointer" />
          </span> */}
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {contactModalData && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-zinc-700/50"
          id="modal-bg"
          style={{ padding: '15px' }}
        >
          <AddForm
            contactModalData={contactModalData}
            hideContactDialog={hideContactDialog}
            isEdit
            setContactListData={setContactList}
          />
        </div>
      )}

      <div className="p-5 min-h-screen bg-gray-100">
        <div
          onClick={() => router.push('/directory')}
          style={{
            alignItems: 'center',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <ContactIcon className="w-10 h-10 font-semibold stroke-gray-600 hover:cursor-pointer" />
          <h1 className="text-xl capitalize truncate text-black">
            {/* {`${
            commonDetails?.name ? commonDetails?.name + "'s" : ''
          }
          `} */}
            Contact Book
          </h1>
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
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                      Date of Marriage
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                      Occupation
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
                        key={contact._id}
                      />
                    ))
                  ) : (
                    <tr>
                      <td className="text-black text-center" colSpan={5}>
                        Loading...
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
                  <MobileCard data={contactList[i]} i={i} key={contact._id} />
                ))
              ) : (
                <p className="text-black mt-10 text-center">Loading...</p>
              )}
            </div>
            {!!contactList.length && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 roundedfont-bold my-10"
                  onClick={() => setIsStep2Visible(true)}
                >
                  Update Common Details
                </button>
              </div>
            )}
          </>
        ) : (
          <ContactCommonForm
            {...{
              contactList,
              isEdit: true,
              setIsStep2Visible,
            }}
          />
        )}
      </div>
    </>
  );
}
