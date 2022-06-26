import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './home.scss';

import HeaderTemplate from '../components/HeaderTemplate';
import FooterTemplate from '../components/FooterTemplate';
import VideoFrame from '../components/VideoFrame';
import Owlslide from '../components/Owlslide';
import VideoFrameContainer from '../containers/VideoFrameContainer';
import { startGetBoxOfficeListActionCreator } from '../redux/modules/boxoffice';
import BoxOffice from '../components/BoxOffice';
import TokenService from '../service/TokenService';
import AccountService from '../service/AccountService';
import CineSuggestion from '../components/CineSuggestion';
import AverageRanking from '../components/AverageRanking';

function Home() {
  const dispatch = useDispatch();
  const boxOfficeList = useSelector((state) => state.boxoffice.boxOfficeList);
  const [modalId, setModalId] = useState(0);
  const token = useSelector((state) => state.auth.token);
  const account = useSelector((state) => state.auth.account);
  const userName = useSelector((state) => state.auth.userName);

  if (token && account) {
    TokenService.save(token);
    AccountService.save(account, userName);
  }

  const show = useCallback((id) => {
    setModalId(id);
  }, []);
  const hide = useCallback(() => {
    setModalId(0);
  }, []);

  const getBoxOfficeList = useCallback(() => {
    dispatch(startGetBoxOfficeListActionCreator());
  }, [dispatch]);

  useEffect(() => {
    getBoxOfficeList();
  }, [getBoxOfficeList]);

  return (
    <>
      {/* <div class="skip_nav">
        <a href="#mainService">주요 서비스 바로가기</a>
        <a href="#mainMedia">미디어 정보 바로가기</a>
        <a href="#mainShopping">쇼핑 바로가기</a>
        <a href="#mainNotice">공지사항 바로가기</a>
        <a href="#mainLogin">로그인 바로가기</a>
      </div> */}
      <HeaderTemplate />
      <main className="home-main">
        <h2 className="a11y-hidden">메인페이지</h2>
        <Owlslide show={show} />
        {modalId > 0 && <VideoFrameContainer hide={hide} id={modalId} />}
        <section>
          <article className="rank cine-square-rank">
            <CineSuggestion />
          </article>

          <article className="rank box-office-rank">
            <h3>박스오피스 순위</h3>
            <BoxOffice boxOfficeList={boxOfficeList} />
          </article>

          <article className="rank highly-rated-rank">
            <h3>평균 별점 높은 순위</h3>
            <AverageRanking />
          </article>
          {/* <article className="my-collection-wrapper">
            <div className="my-collection">
              <h3>마이컬렉션</h3>
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <div></div>
            </div>
          </article> */}
        </section>
      </main>
      <FooterTemplate />
    </>
  );
}

export default React.memo(Home);
