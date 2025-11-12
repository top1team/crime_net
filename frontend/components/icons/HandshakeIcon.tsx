import React from 'react';

const HandshakeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    strokeWidth="1.5" 
    stroke="currentColor" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M10 16.75c.301 0 .59 -.024 .871 -.07l3.25 -1.02a2.5 2.5 0 0 0 1.879 -2.36l.203 -3.248a2.5 2.5 0 0 0 -1.879 -2.36l-3.25 -1.02a2.5 2.5 0 0 0 -2.36 1.879l-.203 3.248" />
    <path d="M14 9.25c-.301 0 -.59 .024 -.871 .07l-3.25 1.02a2.5 2.5 0 0 0 -1.879 2.36l-.203 3.248a2.5 2.5 0 0 0 1.879 2.36l3.25 1.02a2.5 2.5 0 0 0 2.36 -1.879l.203 -3.248" />
    <path d="M12 11l1 2l2 1" />
    <path d="M12 13l-2 -1l-1 -2" />
  </svg>
);

export default HandshakeIcon;