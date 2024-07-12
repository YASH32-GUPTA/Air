import Alert from '@mui/material/Alert';


function AlertSuccess({data}) {
    console.log("Alert data suc" ,data) ;
    return (
        <Alert variant="outlined" severity="success">
          { data && data.msg ? data.msg : "Loading..."  }
        </Alert>
    );
}

export {AlertSuccess} ;