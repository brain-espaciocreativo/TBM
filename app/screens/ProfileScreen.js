import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

  const navigation = useNavigation();

  return (
    <View>
        <Text>
          <Text>Profile</Text>
        </Text>
    </View>
  )
}