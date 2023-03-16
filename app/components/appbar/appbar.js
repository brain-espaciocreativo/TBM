import { StyleSheet, Image, SafeAreaView } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Appbar } from 'react-native-paper';

export default function AppBar() {
  const { setHomePage, logout } = useContext(AuthContext);

  return (
    <Appbar.Header style={style.appbar}>
      <Image
        style={style.image}
        source={require('../../assets/logobn.png')}
      />
      <Appbar.Action icon="exit-to-app" onPress={logout} />
    </Appbar.Header>
  );
}

const style = StyleSheet.create({
  image: {
    width: 150,
    height: 33,
  },
  appbar: {
    backgroundColor: "#db0007",
    display: "flex",
    justifyContent: "space-between"
  }
})