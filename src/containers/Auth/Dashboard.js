import { connect } from 'react-redux'

import Dashboard from '../../components/Auth/Dashboard'
import {
  callDashBoardApi,
} from '../../thunks'

const mapStateToProps = ({ Dashboard }) => ({
  loading: Dashboard.loading,
  dashboardData: Dashboard.dashboardData
})

const mapDispatchToProps = {
  callDashBoardApi: callDashBoardApi,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)