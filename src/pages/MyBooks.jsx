import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import HeaderTemplate from '../components/HeaderTemplate';
import FooterTemplate from '../components/FooterTemplate';
import './mybooks.scss';
import { ReactComponent as FullStar1 } from '../images/star-full.svg';
import axios from 'axios';
import APIService from '../service/APIService';
import { Link } from 'react-router-dom';

const collection = [
  {
    id: 1,
    poster: '../images/Miracle_poster.jpg',
    title: '기적',
  },
];

const AWSAPI = APIService.AWSAPI;
const PROXY = APIService.PROXY;

function MyBooks() {
  const [tabNumber, setTabNumber] = useState(1);
  const account = useSelector((state) => state.auth.account);
  const [evaluatedMovieList, setEvaluatedMovieList] = useState([]);

  useEffect(() => {
    async function EvaluatedMovies() {
      try {
        const response = await axios({
          method: 'POST',
          url: `${PROXY}/user/userMovieGrade`,
          data: {
            account: account,
          },
        });
        const result = response.data.result;
        let movieBox = [];
        // const evaluatedMoviesList = result.map((v, i) => {
        //   return v.movieNm
        // });
        for (let i = 0; i < result.length; i++) {
          movieBox = [
            ...movieBox,
            {
              movieNm: result[i].movieNm,
              movieCd: result[i].movieCd,
              grade: result[i].grade,
            },
          ];
        }
        setEvaluatedMovieList(movieBox);
      } catch (error) {
        console.log(error);
      }
    }
    EvaluatedMovies();
  }, [account]);

  return (
    <>
      <HeaderTemplate />
      <main className="MyBooks-main">
        <h2 className="title" aria-labelledby="mybooks 페이지 제목">
          <p>모든 영화</p>
        </h2>
        <section>
          <div className="tab-menu-title">
            <ul>
              <li
                style={
                  tabNumber === 1
                    ? { borderBottom: '2px solid #6100ff', color: '#6100ff' }
                    : {}
                }
              >
                <button onClick={() => setTabNumber(1)}>
                  내가 평가한 영화
                </button>
              </li>
              <li
                style={
                  tabNumber === 2
                    ? { borderBottom: '2px solid #6100ff', color: '#6100ff' }
                    : {}
                }
              >
                <button onClick={() => setTabNumber(2)}>마이 컬렉션</button>
              </li>
            </ul>
          </div>
          <div
            className="tab-menu-content1"
            style={tabNumber === 1 ? { display: 'block' } : { display: 'none' }}
          >
            <ul>
              {evaluatedMovieList !== null &&
                evaluatedMovieList.map((v, i) => (
                  <li key={i}>
                    <Link to={`/detail/${v.movieCd}`}>
                      <img src="../images/no-images.png" alt="이미지 준비중" />
                      <p>{v.movieNm}</p>
                      <p>
                        <span>
                          <FullStar1 />
                        </span>
                        {v.grade}점으로 평가함
                      </p>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div
            className="tab-menu-content2"
            style={tabNumber === 2 ? { display: 'block' } : { display: 'none' }}
          >
            <ul>
              {collection !== null &&
                collection.map((v, i) => (
                  <li key={i}>
                    <img src={v.poster} alt={v.title} />
                    <p>{v.title}</p>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </main>
      <FooterTemplate />
    </>
  );
}

export default MyBooks;
