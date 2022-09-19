import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
    text: {
        color: 'rgb(110, 108, 108)',
        marginTop: '3rem'
    }
  });

export default function WorkUI () {
    const styles = useStyle();
    return (
        <>
            <p className={styles.text}>No hay Trabajos</p>
        </>
    )
}