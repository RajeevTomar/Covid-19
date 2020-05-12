import React from 'react';
import { Text, View } from 'react-native';
import ApplicationStyle from '../themes/ApplicationStyles';

const Dashboard = (props) => {
    const {style} = ApplicationStyle();
    return (
        <View style={style.screen.mainContainer}>
            <Text>Dashboard</Text>
        </View>
    );
}

export default Dashboard;