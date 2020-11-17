import React from 'react'
import {connect} from 'react-redux'
import {getUsersFromDB} from '../../store/allUsers'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    const users = this.props.users
    return (
      <div>
        <main>
          <header>
            <h1>All Users</h1>
          </header>
          <section>
            <div className="allUsers">
              {users && users.map(user => console.log(user))}
            </div>
          </section>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allUsers: state.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsersFromDB())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
