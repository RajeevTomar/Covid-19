import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Dashboard from '../screens/Dashboard';
import useTheme from '../themes/ThemeHooks';
import DistrictScreen from '../screens/DistrictScreen';
import StatScreen from '../screens/StatScreen';




const Stack = createStackNavigator();

function Navigation() {
  const { colors } = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard" screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.titleColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      >
        <Stack.Screen name="Dashboard"
          component={Dashboard}
          options={{ title: 'DASHBOARD', headerTitleAlign:'center'}}
        />
         <Stack.Screen name="District"
          component={DistrictScreen}
          options={{ title: '', headerTitleAlign:'center'}}
        />
         <Stack.Screen name="Stat"
          component={StatScreen}
          options={{ title: '', headerTitleAlign:'center'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;