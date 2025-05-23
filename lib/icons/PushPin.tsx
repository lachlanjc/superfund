import * as React from "react";
import type { SVGProps } from "react";
const SvgPushPin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="currentColor"
    role="img"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M16.993 19.99h-1.988a.503.503 0 0 0-.506.523l.045.947c.113 2.357.357 4.706.732 7.036a.775.775 0 0 0 1.445 0c.375-2.33.62-4.68.732-7.036l.045-.947a.5.5 0 0 0-.505-.523m2.993-5.858a.78.78 0 0 1-.525-.666l-.41-5.334a.8.8 0 0 1 .513-.805 4.64 4.64 0 0 0 2.34-2.151.8.8 0 0 0 .097-.389.795.795 0 0 0-.795-.795h-10.41a.795.795 0 0 0-.795.795c0 .136.033.27.098.389a4.64 4.64 0 0 0 2.34 2.15c.33.127.538.454.513.806l-.41 5.334a.78.78 0 0 1-.525.666c-1.227.435-3.015 1.631-3.015 3.858v.205c0 .439.356.795.795.795h12.409c.439 0 .795-.356.795-.795v-.205c0-2.227-1.788-3.423-3.015-3.858"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgPushPin;
