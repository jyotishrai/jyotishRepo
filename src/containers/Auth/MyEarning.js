import { connect } from 'react-redux';
import MyEarning from '../../components/Auth/MyEarning'
import { listMyEarningApi } from '../../thunks'

const mapStateToProps = ({ MyEarning }) => ({
    loading: MyEarning.loading,
    listMyEarning: MyEarning.listMyEarning
})

const mapDispatchToProps = {
    listMyEarningApi: listMyEarningApi
}

export default connect(mapStateToProps, mapDispatchToProps)(MyEarning);