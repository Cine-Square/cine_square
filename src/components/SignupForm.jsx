import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import SignupService from '../service/SignupService';

function SignupForm({
  account,
  setAccount,
  setConfirmAccount,
  confirmCode,
  confirmEmailRegExp,
  setConfirmEmailRegExp,
}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmRegExp, setConfirmRegExp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [samePassword, setSamePassword] = useState(false);
  const samePasswordRef = useRef('');
  const passwordRef = useRef('');

  const dispatch = useDispatch();

  function isChecked() {
    setChecked(!checked);
  }

  async function signUp() {
    if (account === null || account === '') {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (confirmCode === false) {
      alert('이메일 인증코드를 확인해주세요.');
      return;
    }
    if (userName === null || userName === '') {
      alert('이름을 입력해주세요.');
      return;
    }
    if (password === null || password === '') {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    if (samePassword === true) {
      alert('두개의 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (confirmEmailRegExp === true) {
      alert('이메일 형식을 확인해주세요.');
      return;
    }
    if (confirmPassword === true) {
      alert('비밀번호 형식을 확인해주세요.');
      return;
    }
    if (checked === false) {
      alert('이용약관에 동의해주세요.');
      return;
    }
    try {
      const response = await SignupService.completeSignup(
        account,
        password,
        userName,
      );
      if (response) {
        alert('회원가입이 완료되었습니다');
        dispatch(push('/'));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="account-form">
        <div>
          <input
            value={account}
            onChange={handleAccountChange}
            type="text"
            aria-label="이메일"
            placeholder="이메일주소"
          />
          <button type="button" onClick={isEmail}>
            중복확인
          </button>
        </div>
        <p className={confirmEmailRegExp ? 'comfirm-active' : ''}>
          * 이메일 형식에 맞지 않습니다
        </p>
      </div>

      <div className="name-form">
        <input
          type="text"
          aria-label="이름"
          placeholder="이름"
          value={userName}
          onChange={handleNameChange}
        />
        {/* <p className={confirmName ? 'comfirm-active' : ''}>이름을 입력하세요</p> */}
      </div>
      <div className="password-form">
        {/* <input ref={passwordRef} type="password" aria-label="비밀번호" placeholder="비밀번호" onChange={isPassword} /> */}
        <input
          ref={passwordRef}
          type="password"
          aria-label="비밀번호"
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
        />
        <p className={confirmPassword ? 'comfirm-active' : ''}>
          * 8 ~ 15자 사이로 영문, 숫자, 특수문자 모두 사용해주세요
        </p>
      </div>
      <div className="password-comfirm-form">
        <input
          ref={samePasswordRef}
          type="password"
          aria-label="비밀번호확인"
          placeholder="비밀번호 확인"
          onChange={issamePassword}
        />
        <p className={samePassword ? 'comfirm-active' : ''}>
          * 비밀번호가 일치하지 않습니다
        </p>
      </div>
      <div className="terms">
        <label>
          {/* <input type="checkbox" name="terms-of-service" onClick={onClick} checked={checked} /> */}
          <input
            type="checkbox"
            name="terms-of-service"
            value="terms-of-service"
            onChange={isChecked}
            checked={checked ? 'checked' : ''}
          />
          이용약관 및 개인정보 수집 및 이용에 동의합니다.
        </label>
      </div>
      <div className="signup-btns">
        <button type="button" className="cancle" onClick={singupCancel}>
          취소
        </button>
        <button type="button" className="signup-ok" onClick={signUp}>
          가입하기
        </button>
        {/* <button type="button" className="signup-ok" onClick={signupClick}>가입하기</button> */}
      </div>
    </>
  );
  function handleAccountChange(e) {
    // var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var regExp = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );
    if (regExp.test(e.target.value)) {
      setConfirmEmailRegExp(false);
    } else {
      setConfirmEmailRegExp(true);
    }
    setAccount(e.target.value);
  }

  function handleNameChange(e) {
    setUserName(e.target.value);
  }

  function handlePasswordChange() {
    const password = passwordRef.current.value;
    var regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (regExp.test(password)) {
      setConfirmPassword(false);
    } else {
      setConfirmPassword(true);
    }
    setPassword(password);
  }

  function issamePassword() {
    const password = passwordRef.current.value;
    const samePasswordValue = samePasswordRef.current.value;
    if (password === samePasswordValue) {
      setSamePassword(false);
    } else {
      setSamePassword(true);
    }
  }

  function singupCancel() {
    dispatch(push('/'));
  }

  async function isEmail() {
    if (confirmEmailRegExp === true || account === '') {
      alert('올바른 이메일을 입력하세요');
      setConfirmAccount(false);
      return;
    } else {
      try {
        const response = await SignupService.emailAuthentication(account);
        if (response) {
          alert('사용가능한 이메일 입니다.');
          setAccount(account);
          setConfirmAccount(true);
        } else {
          alert('이미 등록된 이메일 입니다.');
          setConfirmAccount(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export default SignupForm;
