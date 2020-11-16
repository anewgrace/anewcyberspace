import Axios from 'axios'

//ALL USERS ACTION TYPES
const SET_USERS = 'SET_USERS'

//ALL USERS ACTION CREATORS
export const setUsersState = users => ({
  type: SET_USERS,
  users
})

//ALL USERS THUNK CREATOR
export const getUsersFromDB = () => {
  return async dispatch => {
    try {
      const response = await Axios.get('/api/users')
      const users = response.data
      const action = getUsersFromDB(users)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

//Reducer
const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}
export default allUsersReducer
