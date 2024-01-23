import React, { useState, useEffect } from 'react';
import './page.css';

function Page() {
    const [userData, setUserData] = useState(null);
    const [followData, setFollowData] = useState(null);

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
            }).then(response => response.json())
        ])
        .then(([userData, followData]) => {
            setUserData(userData);
            setFollowData(followData);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    }, []);

    if (!userData || !followData) {
        return <p>Loading user data...</p>;
    }

    const { username, point, image } = userData;

    const follower_id = followData.follower_id;
    const following_id = followData.following_id;

    return (
        <div className="user-profile">
            <p>Username: {username}</p>
            <p>Point: {point}</p>
            <div className="profile-image-container">
                <img src={image} alt="User" className="profile-image" />
            </div>
            <p>follower_id: {follower_id}</p>
            <p>following_id: {following_id}</p>
        </div>
    );
}

export default Page;
