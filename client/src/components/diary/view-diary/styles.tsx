import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(() => ({
  containerDesktop: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  containerMobile: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    margin: 15,
  },
}));
