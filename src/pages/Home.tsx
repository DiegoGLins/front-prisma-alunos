import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import TableAvaliacoes from '../components/TableAvaliacoes';
import ImageLogout from './../assets/log-out-outline.svg'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/modules/alunos/alunoLoginSlice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      handleLogout()
    }
  }, [])

  function handleLogout() {
    navigate('/login')
    dispatch(logout())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid container item xs={12} sx={{ justifyContent: 'center' }}>
          <Typography variant="h3">Avaliações</Typography>
          <Button onClick={handleLogout} sx={{ padding: '2px 0px 0px 35px' }}>
            <img src={ImageLogout} /></Button>
        </Grid>
        <Grid item xs={12}>
          <TableAvaliacoes />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
