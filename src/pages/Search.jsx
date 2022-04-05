import React, { useEffect } from 'react';
import './search.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTemplate from '../components/HeaderTemplate';
import FooterTemplate from '../components/FooterTemplate';
import { startGetSearchValueActionCreator } from '../redux/modules/search';
import { startGetSearchListActionCreator } from '../redux/modules/search';

export default function Search({ match }) {
  const dispatch = useDispatch();
  const searchWord = useSelector((state) => state.search.value);
  const searchLists = useSelector((state) => state.search.list);
  const { keyword } = match.params;

  useEffect(() => {
    dispatch(startGetSearchValueActionCreator(keyword));
    dispatch(startGetSearchListActionCreator(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <HeaderTemplate />
      <main className="search-main">
        <section>
          <div className="search-results">
            <p>
              <span>{`'${searchWord}'`}</span>(으)로 검색한 결과입니다.
            </p>
          </div>
          <div className="search-results-list">
            <h2>검색결과</h2>
            <ul>
              {searchLists.map((list, index) => (
                <li key={index}>
                  <Link to={`/detail/${list.movieCd}`}>
                    <img src={`${list.mainImg}`} alt={`${list.movieNm}`} />
                    <p>{list.movieNm}</p>
                    <p>
                      {list.openDt} <span>{list.nations}</span>
                    </p>
                  </Link>
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
