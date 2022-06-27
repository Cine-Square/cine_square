import React from 'react';
import './authAlert.scss';

function AuthAlert({ notice, setResult, isLoading, setIsLoading }) {
  const modalClose = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading === 'true' && (
        <div className="auth-alert">
          <div className="loading">
            <div className="spinner"></div>
          </div>
          <p>{notice}</p>
        </div>
      )}
      {isLoading === 'show' && (
        <div className="auth-alert">
          <img src="../images/complete2.png" alt="complete" />
          <p>{notice}</p>
          {/* <button onClick={() => setResult(0)}>확인</button> */}
          <button onClick={modalClose}>확인</button>
        </div>
      )}
    </>
  );
}

export default AuthAlert;
