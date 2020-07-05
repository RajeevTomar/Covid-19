import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Dashboard from '../screens/Dashboard';
import useTheme from '../themes/ThemeHooks';
import DistrictScreen from '../screens/DistrictScreen';
import StatScreen from '../screens/StatScreen';
import NewsListScreen from '../screens/NewsListScreen';
import colors from '../themes/Colors';
import TabIconView from './TabIconView';
import NewsArticleScreen from '../screens/NewsArticleScreen';




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const NewsStack = createStackNavigator();

function CovidStackScreen() {
  const { colors } = useTheme();
  return (
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
        options={{ title: 'DASHBOARD', headerTitleAlign: 'center' }}
      />
      <Stack.Screen name="District"
        component={DistrictScreen}
        options={{ title: '', headerTitleAlign: 'center' }}
      />
      <Stack.Screen name="Stat"
        component={StatScreen}
        options={{ title: '', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}

function NewsStackScreen() {
  const { colors } = useTheme();
  return (
    <NewsStack.Navigator initialRouteName="NewsList" screenOptions={{
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTintColor: colors.titleColor,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    >
      <Stack.Screen name="NewsList"
        component={NewsListScreen}
        options={{ title: 'HEADLINES', headerTitleAlign: 'center' }}
      />
      <Stack.Screen name="Article"
          component={NewsArticleScreen}
          options={{ headerShown:false }}
        />
    </NewsStack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Covid19') {
              iconName = require('../images/stat.png');
            } else if (route.name === 'News') {
              iconName = require('../images/news.png');
            }
            return <TabIconView path={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          backgroundColor:colors.blue,
          activeTintColor: colors.bloodOrange,
          inactiveTintColor: colors.background,
        }}
      >
        <Tab.Screen name='Covid19' component={CovidStackScreen} />
        <Tab.Screen name='News' component={NewsStackScreen} />
      </Tab.Navigator>

    </NavigationContainer>
  );
}

export default Navigation;