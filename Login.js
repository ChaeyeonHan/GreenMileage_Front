import * as React from 'react';
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
    } else if (platform === 'Naver') {
      url = 'http://localhost:3000/login/naver';
    } else if (platform === 'Google') {
      url = 'http://localhost:3000/login/redirect';
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include'
      });

      // 응답 json으로 변환
      const data = await response.json();
      if (response.status === 200) {
        console.log(`${platform} 사용자 로그인 완료: `, data);
      } else {
        console.error(`${platform} 로그인 실패:`, data.message);
      }
    } catch (error) {
      console.error(`${platform} 로그인 중 에러 발생:`, error);
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
          <Button
            fullWidth
            variant="contained"
            // sx={{ mt: 1, mb: 2, bgcolor: 'yellow', color: 'black' }} // 카카오 색상에 맞게 스타일을 지정합니다.
            onClick={() => handleSocialLogin('Kakao')}
            sx = {{
              mt: 1,
              mb: 2,
              backgroundImage: `url(${kakaoLoginImage})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              color: 'transparent', // 버튼의 텍스트를 투명하게 하여 이미지만 보이게 합니다.
                '&:hover': {
              bgcolor: 'transparent', // 호버 상태에서도 배경색을 투명하게 유지합니다.
            },
            }}
          >
            Kakao Login
          </Button>
           {/* 네이버 로그인 버튼 */}
          <Button
            fullWidth
            variant="contained"
            // sx={{ mt: 1, mb: 2, bgcolor: 'green', color: 'white' }} // 네이버 색상에 맞게 스타일을 지정합니다.
            onClick={() => handleSocialLogin('Naver')}
            sx = {{
              mt: 1,
              mb: 2,
              backgroundImage: `url(${naverLoginImage})`,
              backgroundSize: '398px 40px',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              color: 'transparent', // 버튼의 텍스트를 투명하게 하여 이미지만 보이게 합니다.
                '&:hover': {
              bgcolor: 'transparent', // 호버 상태에서도 배경색을 투명하게 유지합니다.
            },
            }}
          >
            Naver Login
          </Button>
          {/* 구글 로그인 버튼 */}
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleSocialLogin('Google')}
            // sx={{ mt: 1, mb: 2, bgcolor: 'white', color: 'black' }} // 구글 색상에 맞게 스타일을 지정합니다.
            sx = {{
              mt: 1,
              mb: 2,
              backgroundImage: `url(${googleLoginImage})`,
              backgroundSize: '398px 60px',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              color: 'transparent', // 버튼의 텍스트를 투명하게 하여 이미지만 보이게 합니다.
                '&:hover': {
              bgcolor: 'transparent', // 호버 상태에서도 배경색을 투명하게 유지합니다.
            },
            }}
          >
          </Button>
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