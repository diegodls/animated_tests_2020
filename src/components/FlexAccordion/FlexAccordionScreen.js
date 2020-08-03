import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

import data from './data';

const FlexAccordionScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(2);

  return (
    <View style={styles.container}>
      {data.map(({bg, color, category, subCategory}, index) => {
        return (
          <TouchableWithoutFeedback
            style={[styles.cardContainer]}
            key={category}
            onPress={() => {
              setCurrentIndex(index === currentIndex ? null : index);
            }}>
            <View style={[styles.card, {backgroundColor: bg}]}>
              <Text style={[styles.heading, {color}]}>{category}</Text>
              {index === currentIndex && (
                <View style={styles.subCategoryList}>
                  {subCategory.map((sub) => (
                    <Text key={sub} style={[styles.subCategory, {color}]}>
                      {sub}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFAFD',
    justifyContent: 'center',
  },
  cardContainer: {
    flexGrow: 1,
    paddingTop: Platform.OS === 'ios' ? 100 : 0,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 38,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -2,
  },
  subCategoryList: {},
  subCategory: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: 'center',
  },
});

export default FlexAccordionScreen;
