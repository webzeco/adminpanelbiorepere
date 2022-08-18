import { makeStyles } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
  },
  logo: {
    color: 'white',
  },
  navlist: {
    minWidth: '250px',
    maxWidth: '300px',
  },
  ulAvater: {
    backgroundColor: 'yellow',
    color: 'white',
  },
  navAvatar: {
    width: '35px',
    height: '35px',
  },

  //wrapper of main contianer
  wrapper: {
    minHeight: '100vh',
    height: 'auto',
    background: '#35A777',
    marginTop: '60px',
    padding: theme.spacing(2, 2, 0, 34),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 2),
      marginTop: '45px',
    },
  },

  //Side nav
  drawerPaper: {
    width: '250px',
    marginTop: '65px',
    background: '#ffa37b',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0px',
    },
  },
  navlinks: {
    color: blueGrey['A400'],
    '& :hover , &:hover div': {
      color: blueGrey['700'],
    },
    ' & div': {
      color: 'white',
    },
  },
  activeNavlinks: {
    color: blue['A400'],
    '& div': {
      color: blueGrey['900'],
    },
  },
  navButton: {
    width: ' 100%',
    textTransform: 'capitalize',
  },
}));
