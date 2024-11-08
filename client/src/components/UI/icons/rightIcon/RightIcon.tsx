const RightIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="fill-active hover:fill-white"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <rect
        width="40"
        height="40"
        rx="10"
        className="fill-inactive hover:fill-active"
        fill="none"
      />
      <g
        clipPath="url(#clip0_1_1329)"
        transform="scale(-1, 1) translate(-40, 0)"
      >
        <path d="M14.71 20.9901L23.3097 29.5896C23.8567 30.1369 24.7437 30.1369 25.2905 29.5896C25.8373 29.0427 25.8373 28.1558 25.2905 27.6091L17.681 19.9999L25.2902 12.391C25.8371 11.8439 25.8371 10.9571 25.2902 10.4103C24.7434 9.86324 23.8565 9.86324 23.3095 10.4103L14.7098 19.0098C14.4364 19.2834 14.2998 19.6415 14.2998 19.9998C14.2998 20.3583 14.4366 20.7167 14.71 20.9901Z" />
      </g>
      <defs>
        <clipPath id="clip0_1_1329">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(10 10)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RightIcon;
