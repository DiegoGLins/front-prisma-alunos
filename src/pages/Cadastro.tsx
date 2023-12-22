import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addAluno } from '../store/modules/alunos/alunosSlice';
import { Link } from 'react-router-dom';

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [idade, setIdade] = useState<string>('');
  const [type, setType] = useState<string>('')
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleAdd = () => {

    if (!nome || !email || !password || !idade || !type) {
      return alert("Preeencha todos os campos")
    }
    dispatch(addAluno({ nome, email, password, idade: Number(idade), type }))
      .catch(error => console.error("Erro ao cadastrar aluno:", error));
    setEmail('')
    setIdade('')
    setNome('')
    setPassword('')
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent={'center'}>
        <Grid item xs={12}>
          <Typography variant="h2">Alunos</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ padding: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Criar novo aluno.</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={nome}
                  onChange={(ev) => setNome(ev.target.value)}
                  fullWidth
                  id="nome"
                  label="Nome"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  fullWidth
                  id="email"
                  label="E-mail"
                  type="email"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={idade}
                  onChange={(ev) => setIdade(ev.target.value)}
                  fullWidth
                  id="idade"
                  label="Idade"
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Age"
                    onChange={(ev) => setType(ev.target.value)}
                  >
                    <MenuItem value={"M"}>Matriculado</MenuItem>
                    <MenuItem value={"F"}>Formado</MenuItem>
                    <MenuItem value={"T"}>Tech Help</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid sx={{ marginBottom: '8px' }} item xs={7} display={'flex'} justifyContent={'end'} alignItems={'center'}>
                <p style={{ padding: '0px 5px 0px 0px' }}> Já tem cadastro?</p>
                <Link to={'/login'}>Faça login</Link>
              </Grid>
              <Grid item xs={5} display={'flex'} alignItems={'center'}>
                <Button onClick={handleAdd} variant="contained" fullWidth>
                  Cadastar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cadastro;
