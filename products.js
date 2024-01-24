import React, { useState, useEffect } from 'react'
import './Products.css'

function Products() {

    const [products, setProducts] = useState([]);
    const [participationStatus, setParticipationStatus] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/products/info');
            const data = await response.json();

            const dataPoints = data.map(item => ({
              ...item,
              points: 1+ Math.floor(Math.random() * 5)
            }));

            setProducts(dataPoints);

            // 구매상태 초기화
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

  const handleParticipation = async (name, points) => {
    try {
      setParticipationStatus(prevStatus => ({
          ...prevStatus,
          [name]: !prevStatus[name] // 특정 캠페인의 참여 상태만 토글
      }));
      
      // 여기에 연결 설정
      const storedToken = localStorage.getItem('authToken');
      if (!storedToken) {
        return;
      }

      const response = await fetch('http://localhost:3000/users/points', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        },
        body: JSON.stringify({
          title: title,
          addPoints: points
        })
      });
    } catch (error) {
      console.error('Error during campaign participation: ', error);
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
        <div className="product-container">
            {products.map((products) => (
                <div key={products.id} className="card">
                    <h2>{products.name}</h2>
                    <img src={products.imageUrl} alt={products.name} className="card-image" />
                    {/* 기타 캠페인 정보 */}
                    <div className = "card-info">
                      <a href={products.link} target="_blank" rel="noopener noreferrer">Read More</a>
                      <p className='products-points'>{products.points} point</p>
                    </div>
                    <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                      <div>{products.price}</div>
                        <button className="button" style={{ marginLeft: '10px' }} onClick={() => handleParticipation(products.name, products.points)}>
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