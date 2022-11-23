import React, { useState, useEffect } from 'react';
import styles from "./dataList.module.css";

import ADD from './ADD';
import Edit from './Edit';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { dataSliceActions } from '../store/data-slice';

const DataList = () => {

    const dispatch = useDispatch();
    let users1 = useSelector((state) => state.UserData.USERS);
    const [isAdding, setisAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isChecked, setIsChecked] = useState();
    const [ischanged, setischanged] = useState(false);
    const [users, setUsers] = useState(users1);
    const [ListofSelectedRows, setListofSelectedRows]=useState([]);
  
    useEffect(() => {
        if(!ischanged)
        {
            setUsers(users1);
            setListofSelectedRows([]);
            const initialIsChecked = users.reduce((acc,d) => {
                acc[d.id] = false;
                return acc;
              }, {})
              setIsChecked(initialIsChecked)
        }  
    }, [dispatch, users1, ischanged]);

    const Edithandler = (id) => {
        dispatch(dataSliceActions.setSelectedUser(id));
        setIsEditing(true);
    }

    const editUserFn = (editeduser) =>{
        setischanged(true);
        console.log(editeduser);
        const matchID = (element) => element.id === editeduser.id;
        const index = users.findIndex(matchID);
        let userDum=[...users];
        userDum[index] = editeduser;
        setUsers(userDum);
    }

    const Deletehandler = (id) => {
        let userDum=[...users];
        userDum = userDum.filter((item) => item.id !== id);  
        setUsers(userDum);
        setischanged(true);
      //  dispatch(dataSliceActions.deleteUser(id));
    }

    const addForm=()=>
    {
        setisAdding(true);
    }

    const onCancel=()=>{
        setIsEditing(false);
        setisAdding(false);
    }

    const SaveHandler=()=>{
        setischanged(false);
        dispatch(dataSliceActions.saveChanges(users));
    }

    const cancelchangesHandler=()=>{
        setischanged(false); 
    }

    
    const onCheck=(e,index)=>{
        console.log(e.target.name);
        setIsChecked({ ...isChecked, [e.target.name]: e.target.checked });
        const ex = ListofSelectedRows.includes(index);
        if(ex)
        {   
            const selectedRows = ListofSelectedRows.filter((item) => item !== index); 
            setListofSelectedRows(selectedRows);
        }
        else
        {
            const selectedRows=[...ListofSelectedRows, index];
            setListofSelectedRows(selectedRows);
        }
    }
    

    const moveUp=()=>
    {   
        function sorted(arr) 
        {   return arr.sort();  }

        function swapElements(i1, i2) 
        {  [userDum[i1], userDum[i2]] = [userDum[i2], userDum[i1]]; }
    
        let userDum=[...users];
        const sortedrows = sorted(ListofSelectedRows);
        if (sortedrows[0]>0){
            for (var j = 0; j < sortedrows.length; j++) {
                swapElements(sortedrows[j], (sortedrows[j]-1))
            }
            setListofSelectedRows(sortedrows.map(x=>x-1));
            setUsers(userDum);
            setischanged(true);
        }
    else
    {alert("Cant move up the first row");}
}

const moveDown=()=>
{   
    function revsorted(arr) 
    {   
        arr.sort();
        return arr.reverse();    
    }

    function swapElements(i1, i2) 
    {      [userDum[i1], userDum[i2]] = [userDum[i2], userDum[i1]];    }
    
    let userDum=[...users];
    const sortedrows = revsorted(ListofSelectedRows);
    if (sortedrows[0]<(users.length-1)){
        for (var j = 0; j < sortedrows.length; j++) {
            swapElements(sortedrows[j], (sortedrows[j]+1))
        }
        setListofSelectedRows(sortedrows.map(x=>x+1));
        setUsers(userDum);
        setischanged(true);
    }
    else
    {alert("Cant move down the last row");}
}

return (
<React.Fragment>
    {!ischanged && (<Button variant="contained" onClick={addForm}>Add New Data</Button>)}

    {(ListofSelectedRows.length > 0) &&  
        (<>
        <br/>
           <button  onClick={() => moveUp()} className={styles.button}>  UP    </button>
            <button onClick={() => moveDown()} className={styles.button}> DOWN  </button> 
        </>) 
    }
      
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
    <TableRow>
        <TableCell align="center">Select</TableCell>
        <TableCell align="center">No.</TableCell>
        <TableCell align="center">ID</TableCell>
        <TableCell align="center"> NAME</TableCell>
        <TableCell align="center">USER ID</TableCell>           
        <TableCell align="center" colSpan={2} className="text-center">
            Actions </TableCell>
    </TableRow>
    </TableHead>

    <TableBody>
        {users.length > 0 ? (users.map((user, i) => (
            <tr key={user.id} className={`${styles['form-control']} ${isChecked[user.id] && styles.invalid}`}>
                <td align="center">
                <input type="checkbox" 
                name={user.id}
                onClick={(e) => onCheck(e,i)} 
                checked={isChecked[user.id]}
                 />
                </td>
                
                <td align="center">{i + 1}</td>
                <td align="center">{user.id}</td>
                <td align="center">{user.Uname}</td>
                <td align="center">{user.UID}</td>
                <td align="center">
                    <button  onClick={() => Edithandler(user.id)}>
                    EDIT </button>  </td>
                <td align="center">
                    <button onClick={() => Deletehandler(user.id)}>
                    DELETE </button> </td>
                       
            </tr>
        ))
        ) : (
            <tr>
                <td align="center" colSpan={6}>No data found!</td>
            </tr>
        )}
    </TableBody> 
    </Table>
    </TableContainer> 
        {isEditing && ( <Edit onCancel={onCancel}  editUserFn={editUserFn}  />    )}
        {isAdding && !ischanged && (  <ADD  onCancel={onCancel}  />    )} 
        {ischanged && (<><button className={styles.button}  onClick={() => SaveHandler()}>
                    Save </button>  
                    <button className={styles.button} onClick={() => cancelchangesHandler()}>
                    Cancel </button> </>)
        }

</React.Fragment>
   
);
};

export default DataList;

