/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAlunos } from "../../../services";
import { AlunoType } from "../alunos/alunoLoginSlice";

export interface AvaliacaoType {
    id: string;
    disciplina: string;
    nota: number,
    loading?: boolean,
    aluno: {
        id: string,
        nome: string,
        type: string
    }
}

const initialState: AvaliacaoType[] = [
    {
        id: '',
        disciplina: '',
        nota: 0,
        loading: false,
        aluno: {
            id: '',
            nome: '',
            type: ''
        }
    }
]

export const editAvaliacao = createAsyncThunk('edit/avaliacao', async (data: AvaliacaoType, { getState }) => {
    const stateLogged = getState() as { alunoLogin: AlunoType | undefined }
    const token = stateLogged.alunoLogin?.token

    if (!token) {
        return {
            ok: false,
            code: 500,
            message: "Erro interno ao editar avaliação"
        }
    }
    try {
        const response = await apiAlunos.put(`/avaliacao/${data.id}/${data.aluno.id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        return {
            ok: false,
            code: 500,
            message: "Erro interno do servidor"
        }
    }
})

export const listAvaliacoes = createAsyncThunk('list/avaliacoes', async (_, { getState }) => {
    const state = getState() as { alunoLogin: AlunoType | undefined }
    const token = state.alunoLogin?.token

    try {
        if (!token) {
            return {
                ok: false,
                code: 500,
                message: "Erro interno ao listar avaliacoes"
            }
        }
        const response = await apiAlunos.get("/avaliacao", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            return response.data
        }
        return {
            ok: false,
            code: 404,
            message: "Erro ao listar avaliações"
        }
    }
    catch (error: any) {
        return {
            ok: false,
            code: 500,
            message: error.toString()
        }
    }
})

const avaliacaoSlice = createSlice({
    name: 'avaliacoes',
    initialState: initialState,
    reducers: {
        clear: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(listAvaliacoes.pending, (state) => {
            return state
        });
        builder.addCase(listAvaliacoes.fulfilled, (state, action) => {
            state = action.payload || initialState;
            return state
        });
        builder.addCase(listAvaliacoes.rejected, (_, action) => {
            console.log('Erro ao listar avaliações:', action.error)
            alert("Erro ao listar avaliações")
        });
        builder.addCase(editAvaliacao.pending, (state) => {
            return state
        });
        builder.addCase(editAvaliacao.fulfilled, (_, action) => {
            return action.payload.data || initialState
        })
    }
})

export const { clear } = avaliacaoSlice.actions
export default avaliacaoSlice.reducer