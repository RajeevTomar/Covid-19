import React from 'react';
import {
    Text, View, Image, FlatList, TouchableHighlight, AppState, ScrollView,
    RefreshControl,
} from 'react-native';
import StatMetaCardStyle from '../styles/StatMetaCardStyle';

export default StateMetaCard = ({
    title,
    statistic,
    total,
    formula,
    date,
    description,
    className,
}) => {

    // style
    const { style } = StatMetaCardStyle();

    return (

        <View style={style.cardContainer}>
            {/* <Text>{className}</Text> */}
            <Text>{title}</Text>
            <Text>{statistic}</Text>
            {date && <Text>{date}</Text>}
            <Text>{description}</Text>
        </View>
    );
}