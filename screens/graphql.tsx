import { ApolloProvider, gql, useQuery } from '@apollo/client';
import { printIntrospectionSchema } from 'graphql';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList, StyleSheet } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, client, icons } from "../Globals";

//icons
import { AntDesign } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const GraphQL = ({ navigation }: any) => {
  const [tab, setTab] = useState([]);
  const [srch, setSrch] = useState('');

  const QUERY = gql`
    query GetRates {
      rates(currency: "USD") {
        currency
      }
    }
  `;

  const renderItem = (eachOne: any) => {
    console.log('test : ' + eachOne.name)
    return (
      <View style={styles.renderItem}>
        <Text style={{ fontSize: 20, color: colors.primary }}> { eachOne.currency } </Text>
      </View>
    );
  }

  const ExchangeRate = () => {
    const { loading, error, data } = useQuery(QUERY);

    if (error)
      return <Text> {"Error :("} </Text>
    if (loading)
      return <Text> Loading content ... </Text>

    return (
      <FlatList
        data={data.rates}
        renderItem={(eachOne) => renderItem(eachOne.item)}
        keyExtractor={(eachOne) => eachOne.currency.toString()}
      />
    )
  }

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}> Bonjour GraphQL ! </Text>
      </View>
      <ApolloProvider client={client}>
        <ExchangeRate />
      </ApolloProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
    marginHorizontal: 30
  },
  renderItem: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 20
  }
});

export default GraphQL;
