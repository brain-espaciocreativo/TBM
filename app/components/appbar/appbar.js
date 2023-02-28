import { AppBar, Toolbar, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { StyleSheet, Image, TextInput } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Appbar({logout}) {
    const { setHomePage } = useContext(AuthContext);

    return (
        <AppBar position="static" style={style.appbar}>
        <Toolbar>
          <Box component={"div"} sx={{ flexGrow: 1 }} onClick={() => setHomePage(true)}>
            <Image
              style={style.image}
              source={require('../../assets/logobn.png')}
            />
          </Box>
          <LogoutIcon onClick={logout} />
        </Toolbar>
      </AppBar>
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