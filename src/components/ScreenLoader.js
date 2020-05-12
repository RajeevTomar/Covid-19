import React from 'react';
import {ActivityIndicator} from 'react-native';

export default activityIndicator =(prop)=>{
    return(
      prop.isLoading ? <ActivityIndicator
      style={{
      flex: 1,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center' }}
      size="large"
    /> : null
    );
}