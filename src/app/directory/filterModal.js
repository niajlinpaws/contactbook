import '../../styles/form.css';

import CloseButton from '../../../public/closeButton';
import { useEffect } from 'react';

function FilterModal({ data: { data: filterData }, setFilterModalData }) {
  // useEffect(() => {

  // }, [])

  const applyFilters = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    console.log(
      '🚀 ~ file: filterModal.js:10 ~ applyFilters ~ formData:',
      formData.getAll('filters'),
    );
    setFilterModalData({
      data: formData.getAll('filters').join(','),
      search: true,
      visible: false,
    });
  };

  return (
    <div className="container" style={{ zIndex: 1 }}>
      <div className="flex justify-between">
        <header>Advance Options</header>
        <div
          onClick={() =>
            setFilterModalData((prev) => ({ ...prev, visible: false }))
          }
        >
          <CloseButton className="w-5 h-5 font-semibold stroke-gray-600 hover:cursor-pointer" />
        </div>
      </div>
      <form id="filters" onSubmit={(e) => applyFilters(e)}>
        <div className="form first">
          <div className="details personal">
            <span className="title">Search By</span>
            {/* <div className="fields"> */}
            <div className="input-field">
              {/* <label>Gender</label> */}
              <div className="flex flex-wrap">
                <div className="mx-2 flex items-center w-1/2">
                  <input
                    defaultChecked={filterData.includes('primaryContact')}
                    id="primaryContact"
                    name="filters"
                    type="checkbox"
                    value="primaryContact.name,primaryContact.contactNumber"
                  />
                  <label className="mx-2" htmlFor="primaryContact">
                    Primary Contact
                  </label>
                </div>
                <div className="mx-2 flex items-center">
                  <input
                    defaultChecked={filterData.includes('head')}
                    id="head"
                    name="filters"
                    type="checkbox"
                    value="head.name,head.contactNumber"
                  />
                  <label className="mx-2" htmlFor="head">
                    Head of Family
                  </label>
                </div>
                {/* <div className="mx-2 flex items-center w-1/2">
                  <input
                    id="contactNumber"
                    name="filters"
                    type="checkbox"
                    value="contactNumber"
                  />
                  <label className="mx-2" htmlFor="contactNumber">
                    Contact Number
                  </label>
                </div> */}
                <div className="mx-2 flex items-center w-1/2">
                  <input
                    defaultChecked={filterData.includes('address')}
                    id="address"
                    name="filters"
                    type="checkbox"
                    value="address"
                  />
                  <label className="mx-2" htmlFor="address">
                    Address
                  </label>
                </div>
                {/* <div className="mx-2 flex items-center w-1/2">
                  <input
                    id="occupation"
                    name="filters"
                    type="checkbox"
                    value="occupation"
                  />
                  <label className="mx-2" htmlFor="occupation">
                    Occupation
                  </label>
                </div> */}
                <div className="mx-2 flex items-center">
                  <input
                    defaultChecked={filterData.includes('nativeAddress')}
                    id="nativeAddress"
                    name="filters"
                    type="checkbox"
                    value="nativeAddress"
                  />
                  <label className="mx-2" htmlFor="nativeAddress">
                    Native Place
                  </label>
                </div>
                <div className="mx-2 flex items-center w-1/2">
                  <input
                    defaultChecked={filterData.includes('includeFamilyMembers')}
                    id="includeFamilyMembers"
                    name="filters"
                    type="checkbox"
                    value="includeFamilyMembers"
                  />
                  <label className="mx-2" htmlFor="includeFamilyMembers">
                    Include Family Members
                  </label>
                </div>
                <div className="mx-2 flex items-center">
                  <input
                    defaultChecked={filterData.includes('gotra')}
                    id="gotra"
                    name="filters"
                    type="checkbox"
                    value="gotra"
                  />
                  <label className="mx-2" htmlFor="gotra">
                    Gotra
                  </label>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
          <button className="nextBtn" disabled={false}>
            <span className="btnText">Apply filter</span>
            <i className="uil uil-navigator" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilterModal;
