import React from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native'
import NewsArticleStyle from '../styles/NewsArticleStyle'
import AsyncImage from '../components/AsyncImage';
import { Colors } from '../themes';
import Utils from '../utils/Utils';





/**
 *  
 * 
 *  As this component is just to show the article details
 *  so better to use the stateless component
 * 
 *  As this component is just to show the article details
 *  so better to use the stateless component.
 *  We don'/t need to use the redux here we can simple send the 
 *  article object through navigation.
 */
const NewsArticle = (props) => {

  // Naviation
  const navigation = props.navigation;

  // styles
  const {styles} = NewsArticleStyle();

  // fetch article from props
  const article = props.route.params.article;


  //const article = props.article;
  let articleDate = new Date(article.publishedAt);
  let date = Utils.getFormattedDate(articleDate, '-');
  return (
    <View style={styles.mainContainer}>
      <AsyncImage style={styles.image}
        source={{
          uri: article.urlToImage
        }}
        placeholderColor={Colors.background} />
      <View style={styles.articleContentView}>
        <Text style={styles.title}>
          {article.title}
        </Text>
        <View style={styles.sourceDateView}>
          <Text style={styles.source}>
            {article.source.name}</Text>
          <Text style={styles.date}>
            {date}</Text>
        </View>
        <Text style={styles.description}>{article.description}</Text>
      </View>
      <TouchableHighlight style={styles.circleView} onPress={() => navigation.goBack()}>
        <Image style={styles.circleImage} source={require('../images/ic_back_arrow.png')} />
      </TouchableHighlight>
    </View>
  );
}

export default NewsArticle;
