import React, { useState, useEffect } from 'react'
import './Campaign.css'

function Campaign() {

    const [campaigns, setCampaign] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/campaign/info');
            const data = await response.json();
            setCampaign(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때 한 번만 실행

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
          {campaigns.map((news, index) => (
            <div key={index} className="card">
              <h2>{news.title}</h2>
              <img src={news.image} alt={news.title} className="card-image" />
              {/* 기타 캠페인 정보를 표시할 수 있는 요소 추가 */}
              <a href={news.link} target="_blank" rel="noopener noreferrer">
                  Read More
              </a>
              <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button className="button" onClick={() => openModal(news)}>
                  명 참여중
                </button>
                <button className="button" style={{ marginLeft: '10px' }}>
                  참여하기
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
            <h2>{selectedCampaign.title}</h2>
            <p>{selectedCampaign.participants}명 참여중</p>
          </div>
        </div>
      )}
        </div>
    );
};

export default Campaign;