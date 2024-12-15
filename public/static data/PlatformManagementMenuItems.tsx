export const menuItems = [
  {
    icon: (isActive: boolean) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9997 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7362 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C4.00035 18.1425 3.26375 17.0401 2.7612 15.8268C2.25866 14.6136 2 13.3132 2 12C2 10.6868 2.25866 9.38642 2.76121 8.17316C3.26375 6.95991 4.00035 5.85752 4.92893 4.92893C5.85752 4.00035 6.95991 3.26375 8.17317 2.7612C9.38642 2.25866 10.6868 2 12 2C13.3132 2 14.6136 2.25866 15.8268 2.76121C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12Z"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          strokeWidth="1.5"
        />
        <path
          d="M16 12C16 13.3132 15.8965 14.6136 15.6955 15.8268C15.4945 17.0401 15.1999 18.1425 14.8284 19.0711C14.457 19.9997 14.016 20.7362 13.5307 21.2388C13.0454 21.7413 12.5253 22 12 22C11.4747 22 10.9546 21.7413 10.4693 21.2388C9.98396 20.7362 9.54301 19.9997 9.17157 19.0711C8.80014 18.1425 8.5055 17.0401 8.30448 15.8268C8.10346 14.6136 8 13.3132 8 12C8 10.6868 8.10346 9.38642 8.30448 8.17316C8.5055 6.95991 8.80014 5.85752 9.17157 4.92893C9.54301 4.00035 9.98396 3.26375 10.4693 2.7612C10.9546 2.25866 11.4747 2 12 2C12.5253 2 13.0454 2.25866 13.5307 2.76121C14.016 3.26375 14.457 4.00035 14.8284 4.92893C15.1999 5.85752 15.4945 6.95991 15.6955 8.17317C15.8965 9.38642 16 10.6868 16 12Z"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          strokeWidth="1.5"
        />
        <path
          d="M2 12H22"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    text: "Country",
  },
  {
    icon: (isActive: boolean) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M3 22V12C3 10.1144 3 9.17157 3.58579 8.58579C4.17157 8 5.11438 8 7 8C8.88562 8 9.82843 8 10.4142 8.58579C11 9.17157 11 10.1144 11 12"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          strokeWidth="1.5"
        />
        <path
          d="M17 22V16C17 14.1144 17 13.1716 16.4142 12.5858C15.8284 12 14.8856 12 13 12H11C9.11438 12 8.17157 12 7.58579 12.5858C7 13.1716 7 14.1144 7 16V22"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          strokeWidth="1.5"
        />
        <path
          d="M21 22.0003V7.77232C21 6.43147 21 5.76105 20.6439 5.24713C20.2877 4.7332 19.66 4.4978 18.4045 4.027C15.9492 3.10628 14.7216 2.64592 13.8608 3.24247C13 3.83901 13 5.15011 13 7.77232V12.0003"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          strokeWidth="1.5"
        />
        <path
          d="M4 8V6.5C4 5.55719 4 5.08579 4.29289 4.79289C4.58579 4.5 5.05719 4.5 6 4.5H8C8.94281 4.5 9.41421 4.5 9.70711 4.79289C10 5.08579 10 5.55719 10 6.5V8"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7 4V2"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M22 22H2"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10 15H14"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10 18H14"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    text: "Hotels",
  },
  {
    icon: (isActive: boolean) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M18 16.9208C19.1395 16.8215 19.9218 16.5974 20.5376 16.092C20.7401 15.9258 20.9258 15.7401 21.092 15.5376C22 14.4312 22 12.7875 22 9.5C22 6.21252 22 4.56878 21.092 3.46243C20.9258 3.25989 20.7401 3.07418 20.5376 2.90796C19.4312 2 17.7875 2 14.5 2H9.5C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07418 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07418 15.7401 3.25989 15.9258 3.46243 16.092C4.07821 16.5974 4.86048 16.8215 6 16.9208"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20.5 15.5L14 10.5M14 10.5L3.5 3M14 10.5L20.5 3.5"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M15.2673 19.2006L13.932 16.5295C13.089 14.8432 12.6675 14 12 14C11.3325 14 10.911 14.8432 10.068 16.5295L8.73273 19.2006C8.22086 20.2245 7.96493 20.7365 8.00387 21.0588C8.06013 21.5245 8.41041 21.9006 8.87082 21.9897C9.18949 22.0514 9.71822 21.8324 10.7757 21.3943C11.1669 21.2322 11.3625 21.1512 11.5629 21.1097C11.8513 21.0501 12.1487 21.0501 12.4371 21.1097C12.6375 21.1512 12.8331 21.2322 13.2243 21.3943C14.2818 21.8324 14.8105 22.0514 15.1292 21.9897C15.5896 21.9006 15.9399 21.5245 15.9961 21.0588C16.0351 20.7365 15.7791 20.2245 15.2673 19.2006Z"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          strokeWidth="1.5"
        />
      </svg>
    ),
    text: "Camps",
  },
  {
    icon: (isActive: boolean) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M11.5281 12.5825C11.8501 12.8431 12.3223 12.7934 12.5829 12.4714C12.8435 12.1494 12.7938 11.6772 12.4718 11.4166L11.5281 12.5825ZM6.71831 2.63655C6.35755 2.84008 6.23009 3.29753 6.43362 3.65829C6.63716 4.01905 7.09461 4.14651 7.45537 3.94298L6.71831 2.63655ZM9.86581 5.59414C9.47282 5.72502 9.26034 6.14971 9.39122 6.5427C9.5221 6.93569 9.94678 7.14817 10.3397 7.01729L9.86581 5.59414ZM20.9348 14.3936C19.6125 19.3282 14.5404 22.2566 9.6059 20.9344L9.21768 22.3833C14.9524 23.9199 20.847 20.5166 22.3836 14.7819L20.9348 14.3936ZM9.6059 20.9344C4.67134 19.6122 1.74295 14.54 3.06517 9.60552L1.61628 9.21729C0.0796537 14.952 3.48292 20.8466 9.21768 22.3833L9.6059 20.9344ZM14.394 3.06478C19.3286 4.38699 22.257 9.45911 20.9348 14.3936L22.3836 14.7819C23.9203 9.04714 20.517 3.15251 14.7822 1.61589L14.394 3.06478ZM12.4718 11.4166L5.47376 5.75252L4.53006 6.91847L11.5281 12.5825L12.4718 11.4166ZM3.06517 9.60552C3.3276 8.62609 3.73713 7.72699 4.26313 6.92478L3.00872 6.1023C2.3963 7.03634 1.92054 8.08177 1.61628 9.21729L3.06517 9.60552ZM7.45537 3.94298C9.49125 2.79438 11.9586 2.41222 14.394 3.06478L14.7822 1.61589C11.9525 0.857647 9.08232 1.30284 6.71831 2.63655L7.45537 3.94298ZM5.47376 5.75252C4.74051 5.15904 3.58273 5.22685 3.00872 6.1023L4.26313 6.92478C4.28531 6.89093 4.31608 6.87122 4.3615 6.86573C4.41138 6.8597 4.47422 6.87327 4.53006 6.91847L5.47376 5.75252ZM17.2499 11.9996C17.2499 14.899 14.8994 17.2496 11.9999 17.2496V18.7496C15.7279 18.7496 18.7499 15.7275 18.7499 11.9996H17.2499ZM11.9999 17.2496C9.10048 17.2496 6.74998 14.899 6.74998 11.9996H5.24998C5.24998 15.7275 8.27206 18.7496 11.9999 18.7496V17.2496ZM11.9999 6.74959C14.8994 6.74959 17.2499 9.1001 17.2499 11.9996H18.7499C18.7499 8.27167 15.7279 5.24959 11.9999 5.24959V6.74959ZM6.74998 11.9996C6.74998 10.7308 7.19907 9.56904 7.9477 8.66144L6.79055 7.70697C5.82847 8.87334 5.24998 10.3699 5.24998 11.9996H6.74998ZM10.3397 7.01729C10.8606 6.84383 11.4185 6.74959 11.9999 6.74959V5.24959C11.2554 5.24959 10.5375 5.37043 9.86581 5.59414L10.3397 7.01729Z"
          fill={isActive ? "#C5494C" : "#3F528E"}
        />
      </svg>
    ),
    text: "Routes",
  },

  {
    icon: (isActive: boolean) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M10 7H2"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M8 12H2"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M10 17H2"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M17 17C19.7614 17 22 14.7614 22 12C22 9.23858 19.7614 7 17 7C14.2386 7 12 9.23858 12 12C12 14.7614 14.2386 17 17 17Z"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          stroke-width="1.5"
        />
        <path
          d="M17 10V11.8462L18 13"
          stroke={isActive ? "#C5494C" : "#3F528E"}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    text: "Active",
  },
];