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
    colorArr,
}) => {

    // style
    const { style } = StatMetaCardStyle();

    return (

        <View style={{ ...style.cardContainer,backgroundColor:colorArr[0] }}>
            {/* <Text>{className}</Text> */}
            <Text style={{ ...style.title, color:colorArr[1]}}>{title}</Text>
            <Text style={{ ...style.statistic,color:colorArr[2]}}>{statistic}</Text>
            {date && <Text style={{ ...style.date, }}>{date}</Text>}
            <Text style={{ ...style.description,color:colorArr[1]}}>{description}</Text>
        </View>
    );
}