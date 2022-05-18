import { connect } from 'react-redux';
import PerWeekEarning from '../../components/Auth/PerWeekEarning'
import { listPerWeekEarningApi } from '../../thunks'

const mapStateToProps = ({ MyEarning }) => ({
    loading: MyEarning.loading,
    listMyPerWeekEarning: MyEarning.listMyPerWeekEarning
})

const mapDispatchToProps = {
    listPerWeekEarningApi: listPerWeekEarningApi
}

export default connect(mapStateToProps, mapDispatchToProps)(PerWeekEarning);