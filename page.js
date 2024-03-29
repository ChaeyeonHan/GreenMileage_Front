import React, { useState, useEffect } from 'react';
import './page.css';
import { useNavigate } from 'react-router';

function Page() {
    const [userData, setUserData] = useState(null);
    const [followData, setFollowData] = useState(null);
    const [campaignData, setCampaignData] = useState(null);
    const navigate = useNavigate();

    const [showFollowers, setShowFollowers] = useState(false);

    const toggleFollowers = () => {
        setShowFollowers(!showFollowers);
    };

    const [showFollowings, setShowFollowings] = useState(false);

    const toggleFollowings = () => {
        setShowFollowings(!showFollowings);
    };

    useEffect(() => {
        // 쿠키에서 토큰 읽어오기
        const storedToken = localStorage.getItem('authToken');

        if (!storedToken) {
            // 토큰이 없으면 로그인 페이지로 리다이렉트 또는 다른 처리 수행
            // 예: history.push('/login');
            return;
        }

        // 서버에 사용자 정보 및 팔로우 정보를 가져오기 위한 요청 보내기
        Promise.all([
            fetch('http://localhost:3000/get_user_info', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedToken}`,
                },
            }).then(response => response.json()),
            fetch('http://localhost:3000/get_user_info/follows', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedToken}`,
                },
            }).then(response => response.json()),
            fetch('http://localhost:3000/get_user_info/my-campaigns', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedToken}`,
                },
            }).then(response => response.json())
        ])
        .then(([userData, followData, campaignData]) => {
            setUserData(userData);
            setFollowData(followData);
            setCampaignData(campaignData);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    }, []);

    if (!userData || !followData) {
        return <p>Loading user data...</p>;
    }

    const { email, username, point, image } = userData;

    const allFollowers = followData.follower_id.map(item => ({
        id: item.id,
        username: item.username,
        email: item.email,
        image: item.image,
        // 다른 속성들이 있다면 추가
    }));
    const allFollowings = followData.following_id.map(item => ({
        id: item.id,
        username: item.username,
        email: item.email,
        image: item.image,
        // 다른 속성들이 있다면 추가
    }));


    return (
        <div className="mypage">
            <div className="user-profile">
                <div className="user-info">
                    <img src={image} alt="User" className="profile-image-container" />
                    <div className="user-details">
                        <p className="username">{username}</p>
                        <p className="point">Point: {point}</p>
                    </div>
                </div>

                <div className="follow-list">
                    <div className="followers">
                        <h3 onClick={toggleFollowers}>Follower</h3>
                        {showFollowers && allFollowers.map((follower) => (
                        <div key={follower.id} className="follower">
                            <p className="follower-username">{follower.username}</p>
                            <div>
                                <img src={follower.image} alt="User" className="fprofile-image-container" />
                            </div>
                            <button onClick={() => { navigate("/chat", { state: { email: email, image: image, roomName: [email, follower.email].sort().join() } }) }}>
                                채팅하기
                            </button>
                        </div>
                    ))}
                    </div>

                    <div className="following">
                        <h3 onClick={toggleFollowings}>Following</h3>
                        {showFollowings && allFollowings.map((following) => (
                        <div key={following.id} className="following-user">
                        <p className="following-username">{following.username}</p>
                        <div>
                        <img src={following.image} alt="User" className="fprofile-image-container" />
                        </div>
                        <button onClick={() => { navigate("/chat", { state: { email: email, image: image, roomName: [email, following.email].sort().join() } }) }}>
                            채팅하기
                        </button>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            <div className='mycampaigns'>
                <div className='camtext'>
                    내가 참여중인 캠페인
                </div>
                <div className='campaigns'>
                    {campaignData.map((campaign) => (
                    <div key={campaign.id} className="card">
                        <img src={campaign.image} alt={campaign.title} className="card-image" />
                        <div className="card-content">
                            <h2>{campaign.title}</h2>
                            <a href={campaign.link} target="_blank" rel="noopener noreferrer" className="campaign-read-more">
                                Read More
                            </a>
                            <div className='button-container'>
                                <button className="button" onClick={() => openModal(campaign)}>
                                {campaign.participants}명 참여중
                                </button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Page;
