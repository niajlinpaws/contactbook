function Add({ className }) {
  return (
    <div
      style={{
        backgroundColor: 'black',
        border: '1px dotted white',
        boxSizing: 'border-box',
        height: '3px',
        left: '100px',
        position: 'relative',
        top: '100px',
        transform: ' scale(5)',
        width: '3px',
      }}
    />
    // <svg
    //   className={className}
    //   fill="none"
    //   height="800"
    //   stroke="#fff"
    //   viewBox="0 0 24 24"
    //   width="800"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path
    //     fill="#fff"
    //     fillRule="evenodd"
    //     d="M11.25 12.75V18h1.5v-5.25H18v-1.5h-5.25V6h-1.5v5.25H6v1.5h5.25z"
    //     clipRule="evenodd"
    //   ></path>
    // </svg>
  );
}

export default Add;
