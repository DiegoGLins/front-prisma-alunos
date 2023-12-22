
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/modules/alunos/alunoLoginSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Paper, TextField, Button } from '@mui/material';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('');
  const [validate, setValidate] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (password && email) {
      setValidate(false)
    }
  }, [password, email])

  function navigateCadastro() {
    navigate('/alunos')
  }

  function clearForm() {
    setEmail('');
    setPassword('');
  }

  async function handleLogin() {
    if (!email.length || !password.length) {
      alert('Preencha todos os campos.');
    }
    const { payload: { aluno } } = await dispatch(login({ email, password }))

    if (aluno) {
      navigate('/')
      clearForm()
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent={'center'}>
        <Grid item xs={12}>
          <Typography variant="h2">Login</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ padding: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Faça seu login.</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  fullWidth
                  id="email"
                  label="Email"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  fullWidth
                  id="password"
                  label="Senha"
                  type="password"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleLogin} disabled={validate} fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography component={Button} onClick={navigateCadastro} size="small" textTransform={'none'}>
                  Não tem conta? Cadastrar.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login;
