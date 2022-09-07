import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
    text: {
        color: 'rgb(110, 108, 108)',
        marginTop: '10rem'
    }
  });

export default function HomeUI () {
    const styles = useStyle();
    return (
        <>
            <p className={styles.text}>No hay novedades</p>
        </>
    )
}