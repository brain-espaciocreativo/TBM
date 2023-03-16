import { StyleSheet, Image } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Appbar } from 'react-native-paper';

export default function AppBar({ logout }) {
  const { setHomePage } = useContext(AuthContext);

  return (
    <Appbar>
      <Appbar.Action icon="magnify" onPress={() => logout}/>
    </Appbar>
  );
}

const style = StyleSheet.create({
  image: {
    width: 150,
    height: 33,
  },
  appbar: {
    backgroundColor: "#db0007"
  }
})