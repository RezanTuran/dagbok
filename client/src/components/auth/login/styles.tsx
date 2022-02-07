import { makeStyles } from '@material-ui/core/styles';
import DiaryImg from '../../../assets/diary.jpg';
export default makeStyles(() => ({
  container: {
    minHeight: '100vh',
  },
  imgGridMobile: {
    display: 'none',
  },
  imgGridDesktop: {
    display: 'block',
    backgroundImage: `url(${DiaryImg})`,
    backgroundSize: 'cover',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 400,
    minWidth: 300,
  },
  loginButton: {
    backgroundColor: 'rgb(157, 6, 6)',
  },
}));
