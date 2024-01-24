import React, { useState, useEffect } from 'react'
import './Campaign.css'

function Campaign() {

    const [campaigns, setCampaign] = useState([]);
    const [participationStatus, setParticipationStatus] = useState([]);

    useEffect(() => {
      // 토큰 가져오기
      const storedToken = localStorage.getItem('authToken');
      if (!storedToken) {
        console.log("토큰없어여");
          // 토큰이 없으면 로그인 페이지로 리다이렉트
          return;
      }

      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/campaign/info');
          const data = await response.json();

          // 각 캠페인에 랜덤 포인트 추가
          const dataPoints = data.map(item => ({
            ...item,
            points: 1+ Math.floor(Math.random() * 5)
          }));
          setCampaign(dataPoints);

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

    const handleParticipation = async (title) => {
      try {
        setParticipationStatus(prevStatus => ({
            ...prevStatus,
            [title]: !prevStatus[title] // 특정 캠페인의 참여 상태만 토글
        }));

        const response = await fetch('http://localhost"3000/users/campaign', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ${storedToken}'
          },
          body: JSON.stringify({
            addPoints: selectedCampaign.points
          })
        });
      } catch (error) {
        console.error('Error during campaign participation:', error);
      }
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
                    <img src={campaign.image} alt={campaign.title} className="card-image" />
                    <div className='campaign-info-container'>
                      <a href={campaign.link} target="_blank" rel="noopener noreferrer" className="campaign-read-more">Read More</a>
                      <p className='campaign-points'>{campaign.points} point</p>
                    </div>
                    {/* 기타 캠페인 정보 */}
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