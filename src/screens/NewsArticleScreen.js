import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux'
import { Text, View, Image, TouchableHighlight } from 'react-native'
import styles from '../styles/NewsArticleStyle'
import AsyncImage from '../components/AsyncImage';
import { Colors } from '../themes';
import Utils from '../utils/Utils';



// NOTE - as there can be only single export default so please remove the commented
// export default statement for each TYPE to  execute the file.

/**
 *   TYPE - 1
 * 
 *   Using StateFull Component --
 *   We can use statefull component but this component is just to 
 *    show Articles so no need to use statefull component.
 */
class NewsDetailScreen extends React.Component {
  static navigationOptions = { title: 'Home' }
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <NewsArticleUI article={this.props.article} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    article: state.article.article
  }
}

// export default connect(mapStateToProps)(NewsDetailScreen);



/**
 *  TYPE - 2
 * 
 *  As this component is just to show the article details
 *  so better to use the stateless component
 * 
 *  use hook in stateless component.
 *  Can be used useSelector & useDispatch to support redux
 * 
 *  Using the antoher reducer and sate to save the article.
 *  We can also use the same state those have the list of articles 
 *  and can send the index in prop to fetch the article. See TYPE - 4 more details.
 */
const NewsArticleWithAnotherReducerComponent = props => {
  const article = useSelector(state => state.article.article);
  return (
    <NewsArticleUI article={article} />
  );
}

//export default NewsArticleWithAnotherReducerComponent;


/**
 *  TYPE - 3
 * 
 *  As this component is just to show the article details
 *  so better to use the stateless component.
 *  We don'/t need to use the redux here we can simple send the 
 *  article object through navigation.
 */
const NewsArticleWithoutReduxComponent = props => {
  const article = props.route.params.article;
  return (
    <NewsArticleUI article={article} />
  );
}

//export default NewsArticleWithoutReduxComponent;


/**
 *  TYPE - 4
 * 
 *  As this component is just to show the article details
 *  so better to use the stateless component.
 *  We can use the same reducer that have the state as list of 
 *  articles in store. We can simply send the index to article and
 *  get the article from store based on index
 */

const NewsArticleWithSameReducerComponent = props => {
  const selectedIndex = props.route.params.index;
  const article = useSelector(state => state.http.newsListResponse.articles[selectedIndex]);
  return <NewsArticleUI article={article} navigation={props.navigation} />;
}

export default NewsArticleWithSameReducerComponent;




/**
 * 
 * @param {*} param0 passing the article as we need to display all article detail based on
 *  the passed article as a param\
 */
const NewsArticleUI = ({ article,navigation }) => {
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
        <Text  style={styles.title}>
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
      <TouchableHighlight style = {styles.circleView} onPress={() => navigation.goBack()}>
        <Image style={styles.circleImage} source={require('../images/ic_back_arrow.png')} />
      </TouchableHighlight>
    </View>
  );
} 
