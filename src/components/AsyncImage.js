import React from 'react';
import { View, Image } from 'react-native';

export default asyncImage = props => {

    const {
        placeholderColor,
        style,
        source
    } = props;

    return (
        <View
            style={style}>
            <Image
                source={source}
                resizeMode={'cover'}
                style={
                    style
                }
            />
        </View>
    )

}