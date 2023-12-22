import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiAlunos } from '../../../services';

export interface AlunoType {
  id: string,
  email: string,
  nome: string,
  type: string,
  token?: string,
  loading: boolean
}

const initialState: AlunoType = {
  id: '',
  email: '',
  nome: '',
  type: '',
  token: '',
  loading: false,
};

interface AlunoLogin {
  email: string;
  password: string
}

export const login = createAsyncThunk('/loginAluno', async (aluno: AlunoLogin) => {
  const response = await apiAlunos.post('/auth', aluno)

  if (response.status === 200) {
    return response.data
  }
})

const alunoLoginSlice = createSlice({
  name: 'alunoLogin',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("token")
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      return state
    }).addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload.aluno) {
        return alert("Erro ao fazer login")
      }
      state.id = action.payload.aluno.id
      state.email = action.payload.aluno.email
      state.type = action.payload.aluno.type
      state.nome = action.payload.aluno.nome
      state.token = action.payload.token
      localStorage.setItem("token", JSON.stringify(action.payload.token))

      return state
    })
  }
});


export const { logout } = alunoLoginSlice.actions;
export default alunoLoginSlice.reducer;
