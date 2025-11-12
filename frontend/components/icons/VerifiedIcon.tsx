import React from 'react';

const VerifiedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        {...props}
    >
        <path 
            fillRule="evenodd" 
            d="M12.516 2.17a.75.75 0 00-1.032 0L3.32 9.444a.75.75 0 00.27.998l7.845 4.646a.75.75 0 00.729 0l7.845-4.646a.75.75 0 00.27-.998L12.516 2.17zM3.828 11.01l7.44-4.394 7.44 4.394-7.844 4.645a.75.75 0 01-.728 0L3.828 11.01zM11 17.383l-7.845-4.645L2.25 13.5v.75c0 1.62.834 3.09 2.128 3.935l6.872 4.4a.75.75 0 00.729 0l6.872-4.4C20.916 17.34 21.75 15.87 21.75 14.25v-.75l-.904-.768-7.845 4.645a.75.75 0 01-.728 0z" 
            clipRule="evenodd" 
        />
        <path 
            d="M10.06 14.23a.75.75 0 10-1.22-.872l-3.236 4.53L4.25 16.22a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.14-.094l3.23-4.52z" 
        />
    </svg>
);

export default VerifiedIcon;