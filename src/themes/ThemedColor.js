import Colors from './Colors';

 const ThemedColors = {
    default: {
        ...Colors,
    },
    light: {
        ...Colors,
    },
    dark: {
        ...Colors,
        actionbarColor:'#464646',
        titleColor:'white',
        background: '#464646',
        statBackground:Colors.coal,
        error: 'rgba(200, 0, 0, 0.8)',
        border: '#483F53',
        header: 'white',
        textColor: '#f2f2f2',
        lightColor:'#fd7e14'
    },
}

export default ThemedColors;