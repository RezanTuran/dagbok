import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(() => ({
  box: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2em',
  },
  gridDesktop: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  gridMobile: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  button: {
    margin: 10,
    backgroundColor: '#9D0606',
    color: '#FFC745',
  },
  input: {
    margin: '1em',
  },
}));
