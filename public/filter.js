function FilterIcon({ className, onClick }) {
  return (
    <svg
      className={className}
      fill="none"
      height="800"
      onClick={onClick}
      viewBox="0 0 24 24"
      width="800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke="#3b82f6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 6h-2m2 6h-5m5 6h-5m-9 2v-6.439c0-.208 0-.312-.02-.411a1.002 1.002 0 00-.09-.254c-.046-.09-.11-.172-.24-.334l-3.3-4.124a2.117 2.117 0 01-.24-.334 1 1 0 01-.09-.254C3 7.75 3 7.647 3 7.44V5.6c0-.56 0-.84.109-1.054a1 1 0 01.437-.437C3.76 4 4.04 4 4.6 4h8.8c.56 0 .84 0 1.054.109a1 1 0 01.437.437C15 4.76 15 5.04 15 5.6v1.839c0 .208 0 .312-.02.411a1 1 0 01-.09.254c-.046.09-.11.172-.24.334l-3.3 4.124c-.13.162-.194.243-.24.334a1 1 0 00-.09.254c-.02.1-.02.203-.02.411V17l-4 3z"
      ></path>
    </svg>
  );
}

export default FilterIcon;
