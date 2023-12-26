/* eslint-disable react-hooks/exhaustive-deps */

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Alert, Button, CircularProgress, Snackbar, Typography } from '@mui/material';
import { listAvaliacoes } from '../store/modules/avaliacao/avaliacaoSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function TableAvaliacoes() {
  const avaliacoesRedux = useAppSelector((state) => state.avaliacoes);
  const alunoLogged = useAppSelector((state) => state.alunoLogin)

  const [alert, setAlert] = useState('Nenhuma avaliação para listar')
  const [alertAuthorization, setAlertAuthorization] = useState<boolean>(false)

  const dispatch = useAppDispatch();

  function showAlertAuthorization() {
    if (alunoLogged.type === "M" || alunoLogged.type === "F") {
      setAlertAuthorization(true)
      return
    }
    setAlertAuthorization(false)
  }

  useEffect(() => {
    if (!avaliacoesRedux.data) {
      return setAlert('Nenhuma avaliação para listar')
    }
    dispatch(listAvaliacoes())
  }, []);

  return (
    <>
      {avaliacoesRedux.loading ?
        <CircularProgress /> :
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">id Avaliação</StyledTableCell>
                <StyledTableCell align="right">Disciplina</StyledTableCell>
                <StyledTableCell align="right">Nota</StyledTableCell>
                <StyledTableCell align="left">id Aluno</StyledTableCell>
                <StyledTableCell align="left">Avaliação do Aluno</StyledTableCell>
                <StyledTableCell align="right">Tipo</StyledTableCell>
                <StyledTableCell align="center">Ação</StyledTableCell>
                <StyledTableCell align="center">Ação</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {avaliacoesRedux.data ? avaliacoesRedux.data.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{item.disciplina}</StyledTableCell>
                  <StyledTableCell align="right">{item.nota}</StyledTableCell>
                  <StyledTableCell align="right">{item.aluno.id}</StyledTableCell>
                  <StyledTableCell align="right">{item.aluno.nome}</StyledTableCell>
                  <StyledTableCell align="right">{item.aluno.type}</StyledTableCell>
                  <StyledTableCell align="center"><Button variant='contained' onClick={showAlertAuthorization} color='success'>Editar</Button></StyledTableCell>
                  <StyledTableCell align="center"><Button variant='contained' onClick={showAlertAuthorization} color='error'>Deletar</Button></StyledTableCell>
                </StyledTableRow>
              )) : <Typography>{alert}</Typography>}
            </TableBody>
          </Table>
        </TableContainer>
      }
      <Snackbar className='styleAlert' open={alertAuthorization} autoHideDuration={1900} onClose={() => setAlertAuthorization(false)}>
        <Alert variant='filled' onClose={() => setAlertAuthorization(false)} severity="error">
          "Você não tem autorização para editar ou deletar avaliações"
        </Alert>
      </Snackbar>
    </>
  );
}


export default TableAvaliacoes