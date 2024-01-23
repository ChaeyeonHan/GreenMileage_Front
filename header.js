// Header.js (예시)
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/map">Map</Link></li>
        <li><Link to="/campaign">Campaign</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/mypage">MyPage</Link></li>
        <li><Link to="/chat">Chat</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
