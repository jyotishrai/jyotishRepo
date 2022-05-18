import { connect } from 'react-redux';


import AddProductType from '../../components/Auth/AddProductType'


import { addCategoryApi, editCategoryApi } from '../../thunks'


const mapStateToProps = ({ AddProductType }) => ({
    loading: AddProductType.loading,
    addCategory: AddProductType.addCategory,
    editCategory: AddProductType.editCategory


})

const mapDispatchToProps = {
    addCategoryApi: addCategoryApi,
    editCategoryApi: editCategoryApi
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProductType);
