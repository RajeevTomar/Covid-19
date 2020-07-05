import React from 'react';
import { Image } from 'react-native';

const TabIconView = (props)=>{

    const {path,size,color} = props;
    return(
        <Image style={{width:size,height:size,tintColor:color}} source={path}  />
    );
}

export default TabIconView;