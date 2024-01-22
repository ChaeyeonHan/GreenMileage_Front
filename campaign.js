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
        </div>
      ))}
    </div>
    );
};

export default Campaign;