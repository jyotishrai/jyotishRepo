import { connect } from 'react-redux';

import Ready from '../../../components/Auth/Order/Ready'
import { listOrderApi } from '../../../thunks'

const mapStateToProps = ({ Order }) => ({
    loading: Order.loading,
    readyListOrder: Order.readyListOrder,
    readyLoading: Order.readyLoading,
})

const mapDispatchToProps = {
    listOrderApi: listOrderApi,
}

export default connect(mapStateToProps, mapDispatchToProps)(Ready);