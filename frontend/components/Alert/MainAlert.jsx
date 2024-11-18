import React, { useEffect, useState } from 'react';
import { AlertFailure } from './AlertFailure';
import { AlertSuccess } from './AlertSuccess';

import '../../public/css/alert.css';

const MainAlert = ({ alertDetails }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (alertDetails) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); 

      return () => clearTimeout(timer); // Clear the timer if the component is unmounted
    }
  }, [alertDetails]);

  if (!showAlert) return null;

  return (
    <div className='mainAlert font'>
      {
        alertDetails.status !== null
          ? alertDetails.status
            ? <AlertSuccess data={alertDetails} />
            : <AlertFailure data={alertDetails} />
          : null
      }
    </div>
  );
};

export { MainAlert };
