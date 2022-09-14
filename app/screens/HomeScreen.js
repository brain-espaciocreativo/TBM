import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Cards from '../components/card/Cards';
import Loading from './Loading';
import { Searchbar } from 'react-native-paper';

export default function HomeScreen() {

  const navigation = useNavigation();

  return (
    <ScrollView>
      <Searchbar
        placeholder="Search"
      />
     <Cards />
    </ScrollView>
  )
}