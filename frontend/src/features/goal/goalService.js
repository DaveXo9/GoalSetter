import axios from 'axios'

const API_URL = '/api/goals/'

// Create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, goalData, config)

  return response.data
}


const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const deleteGoals = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + goalId, config)

  return response.data
}

const updateGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },

  }
  console.log(API_URL + goalData.id)
  const response = await axios.patch(`/api/goals/${goalData.id}`, goalData.goal, config)
  return response.data
}

const searchGoals = async (searchQuery, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
    const response = await axios.get(API_URL + `search?searchQuery=${searchQuery || 'none'}`, config)
    return response.data
}


const goalService = {
    createGoal,
    getGoals,
    deleteGoals,
    updateGoal,
    searchGoals,
  }
export default goalService