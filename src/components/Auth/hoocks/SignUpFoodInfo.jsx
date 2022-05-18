import React from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native'
import { Field } from 'react-final-form'
import FormTextInput from '../../FormTextInput'
import styles from '../styles'
import { colors } from '../../../theme'
import translate from '../../../i18n/i18n';
import DropDown from '../../DropDown';
import SelectSignupCategoryModal from '../../viewmodel/selectSignupCategoryModal'

const Label = ({ children, style }) => (
    <Text style={[styles.label, style]}>
        {children}
    </Text>
)

export default renderForm = (formProps, thisProps) => {
    const {
        allState,
        invalid,
        pristine,
        submitError,
        selectedRestroType,
        restroType,
        selectedSupportDelivery,
        supportDelivery,
        restroTypePicker,
        supportDeliveryPicker,
        category,
        showCategorySelectorModal,
        showCategoryModal,
        closeCategoryModal,
        tempCategoryCheckedArray,
        handleSubmit,
        myProfile
    } = formProps
    const { loading } = thisProps
    const submitDisabled = pristine || invalid
    return (
        <KeyboardAvoidingView
            behavior={Platform.select({ ios: 'padding' })}
            style={[styles.topView]}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }}
                style={[styles.scrollView, { maginVertical: 0 }]}
            >
                <Text style={{ color: colors.black, fontSize: 16, marginVertical: 10 }}>{translate('FOOD_INFORMATION')}</Text>
                <View style={styles.formControlView}>
                    <Label>{translate('COST_FOR_TWO')}</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        name="costForTwo"
                        onSubmitEditing={() => this.usernameRef.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        textContentType="CostForTwo"
                        underlineColorAndroid={colors.transparent}
                        keyboardType="numeric"
                        initialValue={myProfile != undefined ? myProfile.data.restro_detail.cost_for_two : undefined}
                    />
                </View>
                <View style={styles.formControlView}>
                    <Label>{translate('SELECT_RESTAURANT_TYPE')}</Label>
                    <DropDown
                        onChange={formProps.restroTypePicker}
                        selectedItem={selectedRestroType}
                        listData={restroType != undefined ? restroType : []}
                    />
                </View>
                <View style={styles.formControlView}>
                    <Label>{translate('SUPPORT_DELIVERY')}</Label>
                    <DropDown
                        onChange={formProps.supportDeliveryPicker}
                        selectedItem={selectedSupportDelivery}
                        listData={supportDelivery != undefined ? supportDelivery : []}
                    />
                </View>
                <View style={styles.formControlView}>
                    <Label>{translate('SELECT_CATEGORIES')}</Label>
                    <TouchableOpacity style={styles.textInput}
                        activeOpacity={0.8}
                        onPress={() => showCategoryModal()}>
                        {
                            tempCategoryCheckedArray != '' ?
                                // tempCategoryCheckedArray.map((item, index) => {
                                //     return (
                                <Text numberOfLines={1} style={{ paddingVertical: 5, fontSize: 16 }}>
                                    {tempCategoryCheckedArray + ', '}
                                </Text>
                                //     )
                                // }) 
                                :
                                <Text numberOfLines={1} style={{ flex: 1, paddingVertical: 5, fontSize: 16 }}>
                                    {'Select Items'}
                                </Text>
                        }
                    </TouchableOpacity>
                    <SelectSignupCategoryModal
                        modalVisible={showCategorySelectorModal}
                        onClose={closeCategoryModal}
                        listData={category != undefined ? category : []}
                        onChangeCheckBox={allState.onChangeCheckBox}
                    />
                </View>
                {submitError ? (
                    <Label style={{ alignSelf: 'center', color: colors.error }}>
                        {submitError}
                    </Label>
                ) : null}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}