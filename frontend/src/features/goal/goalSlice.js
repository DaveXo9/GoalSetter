import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import goalService from './goalService'

const initialState = {
    goals: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}
export const createGoal = createAsyncThunk('goals/create', async(goalData,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goalData,token)
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    })

export const getGoals = createAsyncThunk('goals/getAll', async(_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await goalService.getGoals(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const deleteGoal = createAsyncThunk('goals/delete', async(id,thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token
      console.log("Bio sam ovdje")

      return await goalService.deleteGoals(id,token)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

  export const updateGoal = createAsyncThunk('goals/update', async(goalData,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        console.log(goalData.goal)
        return await goalService.updateGoal(goalData,token)
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message || 
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    })

  export const searchGoals = createAsyncThunk('goals/search', async(searchQuery,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.searchGoals(searchQuery,token)
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||  
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    })



export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(createGoal.pending, (state) => {
          state.isLoading = true
        })
        builder.addCase(createGoal.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.goals.push(action.payload)
        })
        builder.addCase(createGoal.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        builder.addCase(getGoals.pending, (state) => {
          state.isLoading = true
        })
        builder.addCase(getGoals.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.goals = action.payload
        })
        builder.addCase(getGoals.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        builder.addCase(deleteGoal.pending, (state) => {
          state.isLoading = true
        })
        builder.addCase(deleteGoal.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.goals = state.goals.filter(
            (goal) => goal._id !== action.payload.id
          )
        })
        builder.addCase(deleteGoal.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

        builder.addCase(updateGoal.pending, (state) =>{
          state.isLoading = true
          console.log("Bio sam ovdje")

        })
        builder.addCase(updateGoal.fulfilled, (state,action) => {
          state.isLoading = false
          state.isSuccess = true
          console.log("Bio sam ovdje")
          console.log(action.payload)
          
          state.goals = state.goals.map((goal) => {
            if (goal._id === action.payload._id) {
              return action.payload
            } else {
              return goal
            }
          })
        })

        builder.addCase(updateGoal.rejected, (state,action) => {
          state.isLoading = false
          state.isError = true
          console.log("Bio sam ovdje")

          state.message = action.payload
        })

        builder.addCase(searchGoals.pending, (state) => {
          state.isLoading = true
        })
        builder.addCase(searchGoals.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          console.log(action.payload)
          state.goals = action.payload
        })
        builder.addCase(searchGoals.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })






    }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer