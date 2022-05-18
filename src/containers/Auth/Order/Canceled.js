import { connect } from 'react-redux';

import Canceled from '../../../components/Auth/Order/Canceled'
import { listOrderApi } from '../../../thunks'

const mapStateToProps = ({ Order }) => ({
    loading: Order.loading,
    pastListOrder: Order.pastListOrder,
    pastLoading: Order.pastLoading,
})

const mapDispatchToProps = {
    listOrderApi: listOrderApi
}

export default connect(mapStateToProps, mapDispatchToProps)(Canceled);