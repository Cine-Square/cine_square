import React, { useState } from 'react';
import ConfirmModal from '../components/ConfirmModal';
import SignupService from '../service/SignupService';
import AuthAlert from '../components/AuthAlert';

function ConfirmModalContainer({
  account,
  confirmAccount,
  setConfirmAccount,
  confirmCode,
  setConfirmCode,
}) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function duplicate() {
    setIsLoading('true');
    try {
      const response = await SignupService.certificationNumber(account);
      if (!response.result) return;
      setIsLoading('show');
      setCode(response.code);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading === 'true' && (
        <AuthAlert notice={'인증번호 전송중'} isLoading={isLoading} />
      )}
      {isLoading === 'show' && (
        <AuthAlert
          notice={'해당 메일로 인증번호가 요청되었습니다.'}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      <ConfirmModal
        code={code}
        setCode={setCode}
        duplicate={duplicate}
        confirmAccount={confirmAccount}
        account={account}
        setConfirmAccount={setConfirmAccount}
        setConfirmCode={setConfirmCode}
      />
    </>
  );
}

export default ConfirmModalContainer;
