import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import './UserLikeList.css';

function UserLikeList(){

    const [myLikeList, setMyLikeList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("전체");

    useEffect(()=>{
        const fetchgetLike = async() => {
            try {
                //찜 리스트 불러오기
                const resp = await axios.get('/userStoreList/getLikeInfo');
                if (resp.status === 200) {
                    const data = resp.data;
                    setMyLikeList(data); // 전체 찜 리스트 설정
                }

            }catch (error){
                console.log("찜리스트 불러오기 중 error ", error);
            }
        };
        fetchgetLike();
    },[]);

    console.log("찜리스트 ", myLikeList);

    // 선택된 카테고리에 따라 리스트 필터링
    const filteredList = selectedCategory === "전체" ? myLikeList : myLikeList.filter(item => item.store_cate === selectedCategory);

    const goToStoreDetail = (id) => {
        window.location.href = `/userStoreDetail.user/${id}`;
    };

    return (
        <div className="favorite-list">
            <h1 className="title">찜 리스트</h1>
            <div className="category-buttons">
                <button className={`category-button ${selectedCategory === "전체" ? "active" : ""}`} onClick={() => setSelectedCategory("전체")}>
                    전체
                </button>
                <button  className={`category-button ${selectedCategory === "케이크" ? "active" : ""}`} onClick={() => setSelectedCategory("케이크")}>
                    케이크
                </button>
                <button className={`category-button ${selectedCategory === "공방" ? "active" : ""}`} onClick={() => setSelectedCategory("공방")} >
                    공방
                </button>
                <button className={`category-button ${selectedCategory === "꽃" ? "active" : ""}`} onClick={() => setSelectedCategory("꽃")} >
                    꽃
                </button>
            </div>

            <div className="card-list">
                {filteredList.length > 0 ? (
                <>
                    {filteredList
                        .filter(likeList => likeList.store_status === '활성화') // 활성화된 카드만 필터링
                        .map(likeList => (
                            <div className="likecard activate" key={likeList.store_no} onClick={() => goToStoreDetail(likeList.store_no)}>
                                <div className="card">
                                    <p className="category">{likeList.store_cate}</p>
                                    <div className="card-main">
                                        <img src={likeList.store_img_location} alt="store" className="card-image" />
                                        <div className="card-content">
                                            <h2 className="store">{likeList.store_name}</h2>
                                            <p className="address">{likeList.addr}</p>
                                            <p className="addrdetail">{likeList.addrdetail}</p>
                                            <div className="rating-section">
                                                <span className="rating">⭐ {likeList.avg_rating ? likeList.avg_rating : "N/A"}</span>
                                                <span className="reviews">리뷰 {likeList.review_count}개</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    ))}

                    {filteredList
                        .filter(likeList => likeList.store_status !== '활성화') // 비활성화된 카드만 필터링
                        .map(likeList => (
                            <div className="likecard no-activate" key={likeList.store_no}>
                                <div className="card">
                                    <p className="category">{likeList.store_cate}</p>
                                    <div className="card-main">
                                        <img src={likeList.store_img_location} alt="store" className="card-image" />
                                        <div className="card-content">
                                            <h2 className="store">{likeList.store_name}</h2>
                                            <p className="address">{likeList.addr}</p>
                                            <p className="addrdetail">{likeList.addrdetail}</p>
                                            <div className="rating-section">
                                                <span className="rating">⭐ {likeList.avg_rating ? likeList.avg_rating : "N/A"}</span>
                                                <span className="reviews">리뷰 {likeList.review_count}개</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="overlay"></div>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>해당 카테고리의 찜 리스트가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UserLikeList />);

