import Platform from 'react';

const colors = {
    actionbarColor:'white',
    titleColor:'#464646',
    background: 'white',
    clear: 'rgba(0,0,0,0)',
    facebook: '#3b5998',
    transparent: 'rgba(0,0,0,0)',
    steel: '#CCCCCC',
    error: 'rgba(200, 0, 0, 0.8)',
    ricePaper: 'rgba(255,255,255, 0.75)',
    frost: '#D8D8D8',
    cloud: 'rgba(200,200,200, 0.35)',
    windowTint: 'rgba(0, 0, 0, 0.4)',
    panther: '#161616',
    charcoal: '#595959',
    coal: '#2d2d2d',
    bloodOrange: '#fb5f26',
    ember: 'rgba(164, 0, 48, 0.5)',
    fire: '#e73536',
    drawer: 'rgba(30, 30, 29, 0.95)',
    eggplant: '#251a34',
    border: '#483F53',
    banner: '#5F3E63',
    header:'rgba(1, 1, 1, 0.9)',
    textColor:'#f2f2f2',
    sourceColor:'#bababa',
    
    snow: 'white',
    red: '#E64044',
    redShadow: '#E83E3F',
    silver: '#F3F5F6',
    purple: '#5C195A',
    darkPurple: '#140034',
    purpleShadow1: '#694F6C',
    purpleShadow2: '#B997BC',
    headerPurple: '#571757',
    avatarBorder: '#DCE3E8',
    lightText: '#656565',
    text: '#000000',
    transparentBump: (Platform.OS === 'ios') ? 'rgba(140,42,140, 0.5)' : 'rgba(140,42,140, 0.9)'
  }


  const darkThemeColors ={
    background: '#464646',
    error: 'rgba(200, 0, 0, 0.8)',
    border: '#483F53',
    header:'rgba(1, 1, 1, 0.9)',
    textColor:'#f2f2f2',
  }


  
  export default colors