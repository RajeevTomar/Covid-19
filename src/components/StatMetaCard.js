import React from 'react';
import {
    Text, View,
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

        <View style={{ ...style.cardContainer }}>
            {/* <Text>{className}</Text> */}
            <Text style={{ ...style.title, }}>{title}</Text>
            <Text style={{ ...style.statistic, }}>{statistic}</Text>
            {date && <Text style={{ ...style.date, }}>{date}</Text>}
            <Text style={{ ...style.description}}>{description}</Text>
        </View>
    );
}