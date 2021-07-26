import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './signup.scss';

const { Kakao } = window;
const { naver } = window;


export default function Signup() {

  const overlap = false

  const [account, setAccount] = useState('')
  const [confirmAccount, setConfirmAccount] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false)
  const [checked, setChecked] = useState(false)
  const [samePassword, setSamePassword] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(false)

  const passwordRef = useRef('');
  const samePasswordRef = useRef('');
  const phoneNumberRef = useRef('')

  const history = useHistory();

  function loginWithKakao() {
    Kakao.Auth.login({
      success: function (authObj) {
        const kakaoToken = Kakao.Auth.getAccessToken();
        console.log(kakaoToken)
        localStorage.removeItem('kakao_7b617f923188c842b0efaaecb0e0c1ad');
        Kakao.API.request({
          url: '/v2/user/me',
          success: res => {
            console.log(res)
            history.push('/complete')
          }
        })
      },
      fail: function (err) {
        alert(JSON.stringify(err))
      },
    })

  }

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "TczK7UIIwTaztom5Lmsv",
      callbackUrl: "http://localhost:3000/complete",
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: 'white', type: 1, height: '50' }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();

  }, []);

  return (
    <main role="main" className="signup-main">
      <section className="signup-wrapper">
        <form action="#" className="signup-form">
          <fieldset>
            <legend>Sign up</legend>
            <div className="account-form">
              <div>
                <input value={account} onChange={change} type="text" aria-label="이메일" placeholder="이메일주소" />
                <button type="button" onClick={isAccount}>중복확인</button>
              </div>
              <p className={confirmAccount ? 'comfirm-active' : ''}>* 이메일 형식에 맞지 않습니다</p>
            </div>
            <div className="certification-number-form">
              <div>
                <input type="text" aria-label="인증번호" placeholder="인증번호입력" />
                <button type="submit">인증하기</button>
              </div>
              <p>* 인증번호가 맞지 않습니다.</p>
            </div>
            <div className="name-form">
              <input type="text" aria-label="이름" placeholder="이름" />
            </div>
            <div className="phone-number-form">
              <label>핸드폰 번호 ( ' - ' 를 포함한 숫자만 입력하세요.)</label>
              <div>
                <input ref={phoneNumberRef} type="text" aria-label="핸드폰 번호" placeholder="핸드폰 번호" onChange={isPhoneNumber} />
                {/* <input type="text" aria-label="핸드폰 번호 앞 네자리" />
                <input type="text" aria-label="핸드폰 번호 뒤 네자리" /> */}
              </div>
              <p className={phoneNumber ? 'comfirm-active' : ''}>* 잘못된 휴대폰 번호입니다. 숫자, - 를 포함한 숫자만 입력하세요.</p>
            </div>
            <div className="password-form">
              <input ref={passwordRef} type="password" aria-label="비밀번호" placeholder="비밀번호" onChange={isPassword} />
              <p className={confirmPassword ? 'comfirm-active' : ''}>* 8 ~ 15자 사이로 영문, 숫자, 특수문자 모두 사용해주세요</p>
            </div>
            <div className="password-comfirm-form">
              <input ref={samePasswordRef} type="password" aria-label="비밀번호확인" placeholder="비밀번호 확인" onChange={issamePassword} />
              <p className={samePassword ? 'comfirm-active' : ''}>* 비밀번호가 일치하지 않습니다</p>
            </div>
            <div className="terms">
              <label>
                <input type="checkbox" name="terms-of-service" value="terms-of-service" onChange={isChecked} checked={checked ? 'checked' : ''} />
                이용약관 및 개인정보 수집 및 이용에 동의합니다.
              </label>
            </div>
            <div className="signup-btns">
              <button type="button" className="cancle">취소</button>
              <button type="button" className="signup-ok" onClick={signupClick}>가입하기</button>
            </div>
            <div className="social-btn">
              <p>소셜로그인</p>
              <ul>
                <li><button type="button" className="kakao_btn" onClick={loginWithKakao}>카카오로그인</button></li>
                <li><div className="naver-btn" id='naverIdLogin' /></li>
              </ul>
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  )

  function change(e) {
    setAccount(e.target.value)
  }

  function isAccount() {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (regExp.test(account)) {
      setConfirmAccount(false)
      !overlap
    } else {
      setConfirmAccount(true)
    }
  }

  function isPassword() {
    const password = passwordRef.current.value;
    var regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (regex.test(password)) {
      setConfirmPassword(false)
    } else {
      setConfirmPassword(true)
    }
  }

  function issamePassword() {
    const password = passwordRef.current.value;
    const samePasswordValue = samePasswordRef.current.value;

    if (password === samePasswordValue) {
      setSamePassword(false)
    } else {
      setSamePassword(true)
    }
  }

  function isChecked() {
    setChecked(!checked)
  }

  function isPhoneNumber() {
    var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    const phoneNumberValue = phoneNumberRef.current.value

    if (regExp.test(phoneNumberValue)) {
      setPhoneNumber(false)
    } else {
      setPhoneNumber(true)
    }

  }

  function signupClick() {
    if (checked === false) {
      alert('이용약관을 확인해주세요')
    }
    if (overlap === false) {
      alert('이메일 중복확인 해주세요')
    }
    const confirmValue = [confirmAccount, confirmPassword, checked, samePassword, phoneNumber]
    if (confirmValue.filter((i) => i === true).length > 0) return;
  }
}

// var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
// if (regExp.test(value)) {
//   setEmail(value)
//   return true
// } else {
//   return false
// }