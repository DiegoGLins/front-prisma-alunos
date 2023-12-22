import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiAlunos } from '../../../services';

interface AlunoType {
  id?: string;
  nome: string;
  email: string;
  idade: number;
  password: string;
  type: string
}

interface AlunosType {
  alunos: AlunoType[];
  loading: boolean;
}

const initialState: AlunosType = {
  alunos: [],
  loading: false
};

export const getAlunos = createAsyncThunk('alunos/getAlunos', async () => {
  const response = await apiAlunos.get('/alunos');

  if (response.status === 200) {
    const { data } = response;

    if (data.ok) {
      return data.data;
    }
  }

  return [];
});

export const addAluno = createAsyncThunk('alunos/addAluno', async (aluno: Omit<AlunoType, 'id'>) => {
  const response = await apiAlunos.post('/alunos', aluno);

  if (response.status === 201) {
    return response.data;
  }
});

const alunosSlice = createSlice({
  name: 'alunos',
  initialState: initialState,
  reducers: {
    clear: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAlunos.pending, (state) => {
      state.loading = true;
      return state;
    }),
      builder.addCase(getAlunos.fulfilled, (state, action) => {
        state.loading = false;
        state.alunos = action.payload;

        return state;
      }),
      builder.addCase(addAluno.pending, (state) => {
        state.loading = true;
        return state;
      })
    builder.addCase(addAluno.fulfilled, (state, action) => {
      console.log('Resposta da API:', action.payload)
      state.loading = false;
      state.alunos.push(action.payload);
      return state;
    }),
      builder.addCase(addAluno.rejected, (_, action) => {
        console.log('Erro ao cadastrar aluno:', action.error)
        alert("Erro ao cadastrar aluno")
      })
  }
});

export const { clear } = alunosSlice.actions;
export default alunosSlice.reducer;
