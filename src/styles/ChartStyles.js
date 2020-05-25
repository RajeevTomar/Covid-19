
import UseTheme from '../themes/ThemeHooks';
import {Metrics} from '../themes';

export default StatChartsConfig = () => {

    const { colors } = UseTheme();

    const barChartConfig = {
        backgroundColor: colors.background,
        backgroundGradientFrom: colors.statBackground,
        backgroundGradientTo: colors.statBackground,
        color: (opacity = 1) => colors.red,
        barPercentage: .2,
        decimalPlaces: 0,
        style: {
            borderRadius: 1,
            borderRadius: 16,
        }
    };
    return { barChartConfig };
}

