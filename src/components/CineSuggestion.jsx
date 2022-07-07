import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

function CineSuggestion() {
  const CineSuggestionMovie = [
    {
      id: 1,
      movieCd: '203662',
      movieNm: '보이저스',
      openDt: '2021.05.26',
      nations: '미국',
      showTm: '108',
      mainImg: '../images/voyagers.jpg',
    },
    {
      id: 2,
      movieCd: '98146',
      movieNm: '감시자들',
      openDt: '2013.07.03',
      nations: '한국',
      showTm: '119',
      mainImg: '../images/watch.jpg',
    },
    {
      id: 3,
      movieCd: '161967',
      movieNm: '기생충',
      openDt: '2019.05.30',
      nations: '한국',
      showTm: '131',
      mainImg: '../images/insect.jpg',
    },
    {
      id: 4,
      movieCd: '144330',
      movieNm: '앤트맨과 와스프',
      openDt: '2018.07.04',
      nations: '미국',
      showTm: '118',
      mainImg: '../images/ant.jpg',
    },
    {
      id: 5,
      movieCd: '115622',
      movieNm: '인사이드 아웃',
      openDt: '2015.07.09',
      nations: '미국',
      showTm: '102',
      mainImg: '../images/insideout.jpg',
    },
    {
      id: 6,
      movieCd: '136900',
      movieNm: '어벤져스: 엔드게임',
      openDt: '2019.04.24',
      nations: '미국',
      showTm: '181',
      mainImg: '../images/endgame.jpg',
    },
    {
      id: 7,
      movieCd: '62328',
      movieNm: '설국열차',
      openDt: '2013.08.01',
      nations: '한국',
      showTm: '125',
      mainImg: '../images/Snowpiercer.jpg',
    },
    {
      id: 8,
      movieCd: '153652',
      movieNm: '청년경찰',
      openDt: '2017.08.09',
      nations: '한국',
      showTm: '109',
      mainImg: '../images/police.jpg',
    },
    {
      id: 9,
      movieCd: '142691',
      movieNm: '나의 소녀시대',
      openDt: '2016.05.11',
      nations: '대만',
      showTm: '134',
      mainImg: '../images/generation.jpg',
    },
    {
      id: 10,
      movieCd: '45290',
      movieNm: '인터스텔라',
      openDt: '2014.11.06',
      nations: '미국',
      showTm: '169',
      mainImg: '../images/interstella.jpg',
    },
  ];

  let slideIndex = 0;
  let start_x, end_x;

  const slideWrap = useRef();
  const prevRef = useRef();
  const nextRef = useRef();

  return (
    <>
      <h3>씨네스퀘어 영화 추천</h3>
      <div className="slide-container">
        <ul ref={slideWrap} onTouchStart={touchStart} onTouchEnd={touchEnd}>
          {CineSuggestionMovie.map((v, i) => (
            <li key={i}>
              <Link to={`/detail/${v.movieCd}`}>
                <p className="ranking">{v.id}</p>
                <img src={v.mainImg} alt={v.movieNm} />
                <div className="movie-info">
                  <p className="movie-title">{v.movieNm}</p>
                  <p>{v.openDt}</p>
                  <p>
                    {v.nations} {v.showTm}분
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={slidePrev}
        ref={prevRef}
        className={`prev-btn`}
      >
        <img src="../images/prev.png" alt="prev" />
      </button>
      <button
        type="button"
        onClick={slideNext}
        ref={nextRef}
        className={`next-btn`}
      >
        <img src="../images/next.png" alt="next" />
      </button>
    </>
  );

  function slidePrev() {
    if (slideIndex === 0) return;
    slideIndex -= 1;
    slideWrap.current.style.transform = `translate(calc(-100%/2 * ${slideIndex}))`;
    prevRef.current.style.display = 'none';
    nextRef.current.style.display = 'block';
  }

  function slideNext() {
    if (slideIndex === 1) return;
    slideIndex += 1;
    slideWrap.current.style.transform = `translate(calc(-100%/2 * ${slideIndex}))`;
    nextRef.current.style.display = 'none';
    prevRef.current.style.display = 'block';
  }

  function touchStart(e) {
    start_x = e.touches[0].pageX;
  }

  function touchEnd(e) {
    end_x = e.changedTouches[0].pageX;
    if (start_x > end_x) {
      slideNext();
    } else {
      slidePrev();
    }
  }
}

export default CineSuggestion;
