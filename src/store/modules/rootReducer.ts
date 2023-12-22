import { combineReducers } from '@reduxjs/toolkit';
import alunosSlice from './alunos/alunosSlice';
import alunoLoginSlice from './alunos/alunoLoginSlice';
import avaliacaoSlice from './avaliacao/avaliacaoSlice';

export default combineReducers({
  alunoLogin: alunoLoginSlice,
  avaliacoes: avaliacaoSlice,
  alunos: alunosSlice
});
