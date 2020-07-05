import React, { useEffect } from 'react';
import { FlatList, Text, TouchableHighlight, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncImage from '../components/AsyncImage';
import ScreenLoader from '../components/ScreenLoader';
import NewsListStyle from '../styles/NewsListScreenStyle';
import Utils from '../utils/Utils';
import useTheme from '../themes/ThemeHooks';
import { fetchTopHeadlines } from '../redux/actions/NewsAction'



const NewsListScreen = (props) => {

  // Style
  const { styles } = NewsListStyle();
  // colors
  const { colors } = useTheme();

  // navigation
  const navigation = props.navigation;

  // Redux - useDisptach
  const dispatch = useDispatch();

  // Redux- useSelector
  const { loading, articles, error } = useSelector(state => state.news);

  // useEffect
  useEffect(() => {
    // fetch top headlines
    dispatch(fetchTopHeadlines());
  }, []);






  // Render Articles
  const renderNewsArticle = (article, index) => {
    let articleDate = new Date(article.publishedAt);
    let date = Utils.getFormattedDate(articleDate, '-');
    // let submittedBidCount = item.totalBids;
    return (
      <TouchableHighlight
        onPress={() => onTapNewsArticle(article, index)}>
        <View style={styles.newsItemContainer}>
          <AsyncImage style={styles.image}
            source={{
              uri: article.urlToImage
            }}
            placeholderColor={colors.background} />
          <View style={styles.bottomView}>
            <Text style={styles.source}>
              {article.source.name}</Text>
            <Text style={styles.date}>
              {date}</Text>
          </View>
          <View style={styles.titleView}>
            <Text numberOfLines={3} style={styles.title}>
              {article.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }


  const onTapNewsArticle = (article, index) => {
    // move to the New Article Screeen with carring article object
    navigation.navigate('Article', { article: article });
  }


  return (
    <View style={styles.mainContainer}>
      {articles.length > 0 &&
        <FlatList
          data={articles}
          renderItem={({ item, index }) => renderNewsArticle(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
      }
      <ScreenLoader isLoading={loading} />
    </View>
  );


}
export default NewsListScreen;