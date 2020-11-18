import Axios from 'axios'

//ALL USERS ACTION TYPES
const SET_USERS = 'SET_USERS'

//ALL USERS ACTION CREATORS
export const setUsersState = allUsers => ({
  type: SET_USERS,
  allUsers
})

//ALL USERS THUNK CREATOR
export const getUsersFromDB = () => {
  return async dispatch => {
    try {
      const response = await Axios.get('/api/users')
      const users = response.data
      dispatch(setUsersState(users))
    } catch (error) {
      console.log(error)
    }
  }
}

//Reducer
const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.allUsers
    default:
      return state
  }
}

export default allUsersReducer
