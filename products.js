import React, { useState, useEffect } from 'react'
import './Products.css'

function Products() {

    const [products, setCampaign] = useState([]);
    const [participationStatus, setParticipationStatus] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/products/info');
            const data = await response.json();
            setCampaign(data);

            // 캠페인별 참여상태 초기화
            const initialStatus = data.reduce((acc, products) => {
              acc[products.name] = false;
              return acc;
            }, {});
              setParticipationStatus(initialStatus);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때 한 번만 실행

    const handleParticipation = (name) => {
    setParticipationStatus(prevStatus => ({
        ...prevStatus,
        [name]: !prevStatus[name] // 특정 캠페인의 참여 상태만 토글
    }));
  };


    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);

    const openModal = (campaign) => {
      console.log('Open Modal Clicked');
      setSelectedCampaign(campaign);
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
      setSelectedCampaign(null);
    };

    return(
        <div className="campaign-container">
            {products.map((products) => (
                <div key={products.id} className="card">
                    <h2>{products.name}</h2>
                    <img src={products.imageUrl} alt={products.name} className="card-image" />
                    {/* 기타 캠페인 정보 */}
                    <a href={products.link} target="_blank" rel="noopener noreferrer">Read More</a>
                    <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                        <button className="button" style={{ marginLeft: '10px' }} onClick={() => handleParticipation(products.name)}>
                            {participationStatus[products.name] ? "구매완료" : "구매하기"}
                        </button>
                    </div>
                </div>
            ))}

        {modalOpen && selectedCampaign && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedCampaign.name}</h2>
            <p>{selectedCampaign.participants}명 참여중</p>
          </div>
        </div>
      )}
        </div>
    );
};

export default Products;