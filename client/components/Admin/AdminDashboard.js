import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUsersFromDB} from '../../store/allUsers'

class AdminDashboard extends Component {
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    let users = this.props.allUsers || ''
    return (
      <div className="adminDashboard">
        <div className="tableContainer">
          <div className="Rtable Rtable--4cols">
            <div className="Rtable-cell first">
              <h3>First Name</h3>
            </div>
            <div className="Rtable-cell last">
              <h3>Last Name</h3>
            </div>
            <div className="Rtable-cell username">
              <h3>Username</h3>
            </div>
            <div className="Rtable-cell orders">
              <h3>Orders Placed</h3>
            </div>
            {users && users.length ? (
              <div id="mapElements">
                {users.map(user => {
                  return (
                    <div key={user.id} id="tableRows">
                      <div className="Rtable-cell first">{user.firstName}</div>
                      <div className="Rtable-cell last">{user.lastName}</div>
                      <div className="Rtable-cell username">{user.email}</div>
                      <div className="Rtable-cell orders">
                        {user.orders.length > 1 ? user.orders.length - 1 : 0}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)
