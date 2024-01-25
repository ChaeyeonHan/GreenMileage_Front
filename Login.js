//import * as React from 'react';
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Outlet } from "react-router-dom";
import kakaoLoginImage from './images/kakao_login_medium_wide.png';
import naverLoginImage from './images/btnG_naverlogin.png';
import googleLoginImage from './images/web_light_sq_SU@2x.png';
import axios from 'axios';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
            Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


const buttonCommonStyles = {
  backgroundColor: '#F8F0E2',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  marginTop: '1rem',
  marginBottom: '2rem',
};

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    sendDataToServer(data.get('email'),data.get('password'))
  };

  const sendDataToServer = async (email, password) => {
    const userData = {
      email: email,
      password: password
    };
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      const token = data.jwt;
      localStorage.setItem('authToken', token);
      if(token) navigate("/");
      else {
        const errorMessage = "로그인 정보가 틀렸습니다"
        alert(errorMessage);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleSocialLogin = async (platform) => {
    let url = '';
    if (platform === 'Kakao') {
      url = 'http://localhost:3000/login/kakao';
      window.location.href = url;
    } else if (platform === 'Naver') {
      url = 'http://localhost:3000/login/naver';
      window.location.href = url;
    } else if (platform === 'Google') {
      url = 'http://localhost:3000/login/google';
      window.location.href = url;
    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Id"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            {/* 카카오 로그인 버튼 */}
          <button
            onClick={() => handleSocialLogin('Kakao')}
            style={{
              ...buttonCommonStyles,
              marginTop: '1rem',
              marginBottom: '2rem',
              backgroundColor: '#F8F0E2',
              height: '40px', // 원하는 높이로 조절
              width: '400px', // 원하는 너비로 조절
              backgroundImage: `url(${kakaoLoginImage})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              color: 'transparent',
              border: 'none',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
          </button>
           {/* 네이버 로그인 버튼 */}
          <button
            onClick={() => handleSocialLogin('Naver')}
            style={{
              ...buttonCommonStyles,
              marginTop: '1rem',
              marginBottom: '2rem',
              backgroundColor: '#F8F0E2',
              height: '50px', // 원하는 높이로 조절
              width: '398px', // 원하는 너비로 조절
              backgroundImage: `url(${naverLoginImage})`,
              backgroundSize: '398px 40px',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              color: 'transparent',
              border: 'none',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            Naver Login
          </button>

          <button
            style={{
              backgroundColor: '#F8F0E2',
              ...buttonCommonStyles,
              marginTop: '1rem',
              marginBottom: '2rem',
              height: '40px', // 원하는 높이로 조절
              width: '400px', // 원하는 너비로 조절
              backgroundImage: `url(${googleLoginImage})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              color: 'transparent', // 버튼의 텍스트를 투명하게 하여 이미지만 보이게 합니다.
              border: 'none', // 버튼 스타일 초기화
              cursor: 'pointer', // 커서를 포인터로 변경하여 클릭 가능한 상태로 표시
              outline: 'none', // 클릭 효과 제거
            }}
          >
          </button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}