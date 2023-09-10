import { useMemo } from 'react';
import CloseButton from '../../../public/closeButton';
import HeadIcon from '../../../public/headIcon';

import '../../styles/form.css';

export function FamilyDetailsModal({ children, data, hideContactDialog }) {
  // const primaryContactDetails = useMemo(() => data.users.find(x => x.))

  const DesktopCard = ({ contactData, i }) => (
    <tr className="bg-white">
      <td className="p-3 text-sm text-gray-700">
        {data.head._id === contactData._id && (
          <HeadIcon className="w-5 h-5 font-semibold stroke-gray-600 hover:cursor-pointer" />
        )}
        <p
          className={`font-bold ${genderTextStyle(
            contactData.gender,
          )} capitalize`}
        >
          {contactData.name}
        </p>
      </td>
      <td className="p-3 text-sm text-gray-700 capitalize">
        {contactData.contactNumber || '-'}
      </td>
      <td className="p-3 text-sm text-gray-700">
        {contactData.occupation || '-'}
      </td>
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
    <div
      className="container overflow-auto"
      style={{ marginTop: '8vh', zIndex: 1 }}
    >
      <div className="flex justify-between">
        <header>Family Details</header>
        <div onClick={() => hideContactDialog()}>
          <CloseButton className="w-5 h-5 font-semibold stroke-gray-600 hover:cursor-pointer" />
        </div>
      </div>
      <div className="form first my-6">
        <div className="details personal">
          <span className="title text-black font-semibold">Address:</span>
          <span className="text-gray-400 ml-3">{data.address}</span>
        </div>
        <div className="details personal mt-6">
          <span className="title text-black font-semibold">Native Place:</span>
          <span className="text-gray-400 ml-3">{data.nativeAddress}</span>
        </div>
        <div className="details personal mt-6">
          <span className="title text-black font-semibold">Gotra:</span>
          <span className="text-gray-400 ml-3">{data.gotra}</span>
        </div>
        <div className="details personal mt-6">
          <span className="title text-black font-semibold">Family Photo:</span>
          <img
            className="aspect-video object-contain"
            src={'http://localhost:8000/img/fileupload/' + data.picture}
          />
        </div>
      </div>
      <div className="overflow-auto rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200 text-black">
            <tr>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                Name
              </th>
              <th className="w-20  p-3 text-sm font-semibold tracking-wide text-left">
                Contact No.
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Occupation
              </th>
              {/* <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Gotra
                  </th>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                    Family Members
                  </th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.users.map((contact) => (
              <DesktopCard contactData={contact} key={contact._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function genderTextStyle(gender) {
  return gender === 'Male' ? 'text-blue-500' : 'text-pink-500';
}
