import React from 'react';
import './footerTemplate.scss';
import { Link } from 'react-router-dom';

export default function FooterTemplate() {
  return (
    <footer>
      <section>
        <h3 className="a11y-hidden">씨네스퀘어</h3>
        <ul className="footer-bedge">
          <li>
            <a href="https://github.com/Cine-Square/cinesquare">
              <img src="../images/github1.png" alt="깃허브 버튼" />
            </a>
          </li>
          <li>
            <a href="mailto:ehwlgus22@gmail.com">
              <img src="../images/mail.png" alt="메일 보내기 버튼" />
            </a>
          </li>
        </ul>
        <div>
          <ul className="footer_list">
            <li>
              <Link to="#">회사소개</Link>
            </li>
            <li>
              <Link to="#">서비스 이용약관</Link>
            </li>
            <li>
              <Link to="#">개인정보 처리방침</Link>
            </li>
            <li>
              <Link to="#">이메일주소 무단수집 거부</Link>
            </li>
          </ul>
          <span>
            고객센터 :{' '}
            <a href="mailto:ehwlgus22@gmail.com?">ehwlgus22@gmail.com</a>
          </span>
          <p>주식회사 씨네스퀘어</p>
          <p>도지현</p>
          <small className="copyright">
            CINE SQUARE &copy; 2021 by CINESQUARE, Inc. All rights reserved.
          </small>
        </div>
      </section>
    </footer>
  );
}
