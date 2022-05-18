import React from 'react'
import { Image, TouchableOpacity, Model } from 'react-native'

import { colors } from '../theme'

export default ({ onPress, imageSource }) => (
    <Model

    >
        <Image
            resizeMode="center"
            source={imageSource}
            style={{ height: 28, width: 28 }}
        />
    </Model>
)