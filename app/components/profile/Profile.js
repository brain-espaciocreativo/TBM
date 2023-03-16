import { useContext, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Image, Button, Text } from "react-native";
import { Avatar, Caption, Title, TextInput } from "react-native-paper";
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment';

export default function Profile() {

    const { userInfo } = useContext(AuthContext);
    const user = userInfo[0]

    moment.updateLocale('es', {
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene._Feb._Mar_Abr._May_Jun_Jul._Agos_Sept._Oct._Nov._Dic.'.split('_'),
        monthsParseExact: true,
        weekdays: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        weekdaysShort: 'Dom._Lun._Mar._Mie._Jue._Vie._Sáb.'.split('_'),
        weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY'
        }
    });

    moment.locale('es')
    const date = moment().format('LLLL');

    return (
        <SafeAreaView>
            <View style={style.userInfoSection}>
                <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center' }}>
                        {user.image == null ?
                            <TextInput.Icon size={30} name="account-circle" />
                            :
                            <Avatar.Image
                                source={{
                                    uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                                }}
                                size={60}
                            />
                        }
                        <View style={{ marginLeft: 40 }}>
                            <Title style={[style.title, { letterSpacing: 1 }]}>¡Hola {user.name}!</Title>
                            <Caption style={style.caption}>{date}</Caption>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}



const style = StyleSheet.create({
    userInfoSection: {
        paddingHorizontal: 10,
        marginVertical: 10
    },
    title: {
        fontSize: 18,
        marginBottom: -6,
        fontWeight: 'bold',
        color: '#db0007',
        textTransform: 'capitalize'
    },
    caption: {
        fontSize: 9,
        lineHeight: 15,
        fontWeight: 'normal',
        color: '#12100b',
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    containerImage: {
        marginBottom: -50
    },
    image: {
        width: 150,
        height: 33,
    },
    icon: {
        color: '#db0007'
    }
})