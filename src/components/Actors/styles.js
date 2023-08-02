import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  image: {
    borderRadius: '20px',
    boxShadow: '0.5em 0.5em 1em',
    objectFit: 'cover',
    maxWidth: '90%',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}));
