import Alert from '@mui/material/Alert';

function AlertFailure({data}) {
    return (
      <Alert className='css-1140ve2-MuiPaper-root-MuiAlert-root  ' variant="outlined" severity="error">
      { data && data.msg ? data.msg : "Loading..." }
      </Alert>
    );
  }
  

export  {AlertFailure};