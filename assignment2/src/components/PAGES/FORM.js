import React, { useState } from 'react'
// import Swal from 'sweetalert2';
// import Modal from '../UI/Modal';
import ModalWin from '../UI/modalWin'
import classes from './FORM.module.css';
import { useDispatch } from 'react-redux';
import { dataSliceActions } from '../store/data-slice';

function FORM({selectedUser, onCancel, editUserFn}) {

    const dispatch = useDispatch();
    
    const [Uname, setUname] = useState(selectedUser.Uname);
    const [UID, setUID] = useState(selectedUser.UID);
    
    let id = Math.floor(Math.random() * 10000);
    

    const handleUpdate = e => {
        e.preventDefault();
      
     
        if (!Uname ||  !UID  ) {
            // return Swal.fire({
            //     icon: 'error',
            //     title: 'Error!',
            //     text: 'All fields are required.',
            //     showConfirmButton: true
            // });
        }

        let id=0;

        if(selectedUser.id)
            {id=selectedUser.id;
            }
        else{
            id= Math.floor(Math.random() * 10000);
            }

        const user = {
            id: id,
            Uname: Uname,
            UID:UID,
        };
        console.log(user);

    if(selectedUser.id)
        {
            editUserFn(user);
        }
    else{
        dispatch(dataSliceActions.editUser(user));
        }    
  
        onCancel();

}

    return (
        <ModalWin onCancel={onCancel} >
       
        
            <form onSubmit={handleUpdate} className={classes.input}>

                {selectedUser.Uname?<h1>Edit Employee</h1> :
                <h1>Add Employee</h1>
                }
                

                <label htmlFor="Uname">User Name:  </label>
                <input
                    id="Uname"
                    type="text"
                    name="Uname"
                    placeholder="Firstname..."
                    value={Uname}
                    onChange={e => setUname(e.target.value)}
                />
                <br /> <br />
                <label htmlFor="UID">User ID:  </label>
                <input
                    id="UID"
                    type="text"
                    name="UID"
                    value={UID}
                    placeholder="User ID..."
                    onChange={e => setUID(e.target.value)}
                />
                
                 <div style={{ marginTop: '30px' }}>
                {selectedUser.Uname?  <input type="submit" value="EDIT" /> :
                  <input type="submit" value="ADD" />
                }

                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={onCancel}
                    />
                </div>
            </form>
        
        </ModalWin>
    );
}

export default FORM;