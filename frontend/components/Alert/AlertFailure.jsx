import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';

function AlertFailure({data}) {

    let hide = useSelector((State)=>State.toolkit.show) ;
    return (
      hide ? 
         null 
        :
        <Alert className='css-1140ve2-MuiPaper-root-MuiAlert-root  ' variant="outlined" severity="error">
        { data && data.msg ? data.msg : "Loading..." }
        </Alert>
      
    );
  }
  

export  {AlertFailure};