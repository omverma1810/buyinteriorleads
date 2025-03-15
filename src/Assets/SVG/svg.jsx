import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={512}
    height={512}
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    viewBox="0 0 100 100"
    {...props}
  >
    <g stroke="#FFFFFF" strokeMiterlimit={10} strokeWidth={2}>
      <path
        fill="#fff"
        d="M29.05 24.46h11.38m-5.25-7.75v3.26M18.63 58.16v1.75m4.6-1.75v1.75"
        data-original="#ffffff"
      />
      <g>
        <path d="M37.68 35.34v-13a2.5 2.5 0 1 0-5 0v13zM29.93 49.5h9.87m0 4.75-9.87 5.06m9.87 5.14-9.87 5.06m9.87 5.14-9.87 5.06m40.14 3.58V64.22a8.94 8.94 0 0 1 17.88 0v19.07z" />
        <path d="M74 83.29V71.72a5.09 5.09 0 1 1 10.15 0v11.57zM87.25 60.9H70.77m8.48-10.19v4.41m-6.07-14.28H57.45m2.75-5.5h9.88v47.95H60.2z" />
      </g>
      <path
        fill="#fff"
        d="M70.95 24.46H59.58m5.25-7.75v3.26m16.54 38.19v1.75m-4.6-1.75v1.75"
        data-original="#ffffff"
      />
    </g>
  </svg>
);
export default SvgComponent;
