import React from 'react';
import {
    Text, View, Image, FlatList, TouchableHighlight, AppState, ScrollView,
    RefreshControl,
} from 'react-native';
import StatMetaViewStyle from '../styles/StatMetaViewStyle';


export default StatMetaView = () => {

    const { style } = StatMetaViewStyle();

    return (
        <View>
            <View style={style.statRowContainer}>

            </View>
        </View>
    );
}