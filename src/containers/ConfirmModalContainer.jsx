import React, { useState } from 'react';
import ConfirmModal from '../components/ConfirmModal';
import SignupService from '../service/SignupService';

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
    setIsLoading(true);
    try {
      const response = await SignupService.certificationNumber(account);
      if (!response.result) return;
      setIsLoading(false);
      alert('해당 메일로 인증번호가 요청되었습니다.');
      setCode(response.code);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <p style={{ color: '#fff' }}>로딩중...</p>}
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
