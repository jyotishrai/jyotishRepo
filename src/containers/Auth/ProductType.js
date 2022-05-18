
import { connect } from 'react-redux'


import ProductType from '../../components/Auth/ProductType'






import { listProductTypeApi } from '../../thunks'


const mapStateToProps = ({ ProductType }) => ({
    loading: ProductType.loading,
    listProductType: ProductType.listProductType


})


const mapDispatchToProps = {
    listProductTypeApi: listProductTypeApi

}





export default connect(mapStateToProps, mapDispatchToProps)(ProductType);



