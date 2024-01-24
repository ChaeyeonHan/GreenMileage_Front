import React, { useState, useEffect } from 'react'
import './Campaign.css'

function Campaign() {

    const [campaigns, setCampaign] = useState([]);
    const [participationStatus, setParticipationStatus] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/campaign/info');
            const data = await response.json();
            setCampaign(data);

            // 캠페인별 참여상태 초기화
            const initialStatus = data.reduce((acc, campaign) => {
              acc[campaign.title] = false;
              return acc;
            }, {});
              setParticipationStatus(initialStatus);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때 한 번만 실행

    const handleParticipation = (title) => {
    setParticipationStatus(prevStatus => ({
        ...prevStatus,
        [title]: !prevStatus[title] // 특정 캠페인의 참여 상태만 토글
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
            {campaigns.map((campaign) => (
                <div key={campaign.id} className="card">
                    <h2>{campaign.title}</h2>
                    <img src={campaign.imageUrl} alt={campaign.title} className="card-image" />
                    {/* 기타 캠페인 정보 */}
                    <a href={campaign.link} target="_blank" rel="noopener noreferrer">Read More</a>
                    <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                        <button className="button" onClick={() => openModal(campaign)}>
                            {campaign.participants}명 참여중
                        </button>
                        <button className="button" style={{ marginLeft: '10px' }} onClick={() => handleParticipation(campaign.title)}>
                            {participationStatus[campaign.title] ? "참여중" : "참여하기"}
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