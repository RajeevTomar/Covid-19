import React from 'react';
import {
    View, Text
} from 'react-native';
import StatMetaViewStyle from '../styles/StatMetaViewStyle';
import { format, parse } from 'date-fns';
import StatMetaCard from './StatMetaCard';
import { Metrics } from '../themes';
import { POPULATION_SOURCE } from '../Constant';
import ThemeHooks from '../themes/ThemeHooks';



export default StatMetaView = ({ statMetaObj }) => {

    const { style } = StatMetaViewStyle();
    const { colors } = ThemeHooks();

    const stateData = statMetaObj.locationStat;
    const testObject = statMetaObj.testData;
    const population = statMetaObj.population;
    const lastSevenDaysData = statMetaObj.lastSevenDaysData;

    const confirmed = stateData.confirmed;
    const active = stateData.active;
    const deaths = stateData.deaths;
    const recovered = confirmed - active - deaths;
    const sevenDayBeforeData = lastSevenDaysData[0].totalconfirmed;
    const sevenDayBeforeDate = format(lastSevenDaysData[0].date, 'dd MMM');
    const previousDayData = lastSevenDaysData[6].totalconfirmed;
    const previousDayDate = format(lastSevenDaysData[6].date, 'dd MMM');
    const confirmedPerMillion = (confirmed / population) * 1000000;
    const recoveryPercent = (recovered / confirmed) * 100;
    const activePercent = (active / confirmed) * 100;
    const deathPercent = (deaths / confirmed) * 100;
    const testPerMillion = (testObject?.totaltested / population) * 1000000;
    const growthRate =
        ((previousDayData - sevenDayBeforeData) / sevenDayBeforeData) * 100;
    // const totalConfirmedPerMillion =
    //     (totalData[0].confirmed / 1332900000) * 1000000;
    const updatedDate = !isNaN(
        parse(testObject?.updatedon, 'dd/MM/yyyy', new Date())
    )
        ? `As of ${format(
            parse(testObject?.updatedon, 'dd/MM/yyyy', new Date()),
            'dd MMM'
        )}`
        : '';

    return (
        <View style={{ marginTop: Metrics.smallMargin }}>
            <View style={style.statRowContainer}>

                <StatMetaCard
                    colorArr={colors.greyColorArr}
                    className="confirmed"
                    title={'Confirmed Per Million'}
                    statistic={confirmedPerMillion.toFixed(2)}
                    formula={'(confirmed / state population) * 1 Million'}
                    description={`${Math.round(confirmedPerMillion)} out of every 1 million people in ${stateData.name} have tested positive for the virus.`}
                />
                <StatMetaCard
                    colorArr={colors.blueColrArr}
                    className="active"
                    title={'Active'}
                    statistic={`${activePercent.toFixed(2)}%`}
                    formula={'(active / confirmed) * 100'}
                    description={`For every 100 confirmed cases, ${activePercent.toFixed(0)} are currently infected.`}
                />
            </View>
            <View style={style.statRowContainer}>
                <StatMetaCard
                    colorArr={colors.orangeColorArr}
                    className="recovery"
                    title={'Recovery Rate'}
                    statistic={`${recoveryPercent.toFixed(2)}%`}
                    formula={'(recovered / confirmed) * 100'}
                    description={`For every 100 confirmed cases,${Math.round(recoveryPercent.toFixed(0))} have recovered from the virus.`}
                />
                <StatMetaCard
                    colorArr={colors.oliveColorArr}
                    className="mortality"
                    title={'Mortality Rate'}
                    statistic={`${deathPercent.toFixed(2)}%`}
                    formula={'(deceased / confirmed) * 100'}
                    description={`For every 100 confirmed cases,${Math.round(deathPercent.toFixed(0))} have unfortunately passed away from the virus.`}
                />
            </View>
            <View style={style.statRowContainer}>
                {!isNaN(testPerMillion) && <StatMetaCard
                    colorArr={colors.greenColorArr}
                    className="gr"
                    title={'Avg. Growth Rate'}
                    statistic={growthRate > 0 ? `${Math.round(growthRate / 7)}%` : '-'}
                    formula={
                        '(((previousDayData - sevenDayBeforeData) / sevenDayBeforeData) * 100)/7'
                    }
                    date={`${sevenDayBeforeDate} - ${previousDayDate}`}
                    description={`In the last one week, the number of new infections has grown by an average of ${Math.round(growthRate / 7)}% every day.`}
                />}

                {!isNaN(testPerMillion) && <StatMetaCard
                    colorArr={colors.redColorArr}
                    className="tpm"
                    title={'Tests Per Million'}
                    statistic={`≈ ${Math.round(testPerMillion)}`}
                    formula={
                        '(total tests in state / total population of state) * 1 Million'
                    }
                    date={updatedDate}
                    description={`For every 1 million people in ${stateData.state},${Math.round(testPerMillion)} people were tested.`}
                />}
            </View>
        </View>
    );
}