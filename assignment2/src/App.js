import React, { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import DataList from './components/PAGES/dataList';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
 import { sendData } from '../src/components/store/dummy-actions';
import Notification from '../src/components/UI/Notification';



function App() {
const notification = useSelector((state) => state.ui.notification);
const dispatch = useDispatch();
  const users = useSelector((state) => state.UserData.USERS);
  const [sendVar, setsendVar] = useState(false);

  const submitHandler=()=>{
  setsendVar(true);
  console.log("setting sending variable true");
  
  }
 
  useEffect(() => {
    console.log("inside useeffect" , sendVar   );
    if (!sendVar) {
      
      return;
    }

    if (sendVar) {
      dispatch(sendData(users));
      console.log(users);
      setsendVar(false);
    }
  }, [users, dispatch,sendVar]);


  return (
<React.Fragment>
{notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Divider>
        <Chip label="USER DATA" />
      </Divider>

      <DataList />
      <br/>
      {users.length > 0 ? 
      (
      <Button variant="contained" onClick={submitHandler} align="Right">SUBMIT DATA</Button>)
      :(<></>)}


</React.Fragment>
  )
}

export default App;



