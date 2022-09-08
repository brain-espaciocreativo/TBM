import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

  const navigation = useNavigation();

  return (
    <View>
        <Text>
          <Text>Home</Text>
            <TouchableOpacity
              onPress={()=>navigation.navigate('Login')}
            >
              <Text>
                Volver
              </Text>
            </TouchableOpacity>
        </Text>
    </View>
  )
}