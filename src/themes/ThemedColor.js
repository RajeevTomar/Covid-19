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
        error: 'rgba(200, 0, 0, 0.8)',
        border: '#483F53',
        header: 'white',
        textColor: 'white',
    },
}

export default ThemedColors;