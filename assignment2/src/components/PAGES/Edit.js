import React from 'react'
import FORM from './FORM';

import { useSelector } from 'react-redux';


function Edit(props) {


    const selectedUser = useSelector((state) => state.UserData.selectedUser);

    return (
        <div>
           
            {/* <BasicModal selectedUser={selectedUser} onCancel={props.onCancel} /> */}
            <FORM selectedUser={selectedUser} onCancel={props.onCancel} editUserFn={props.editUserFn}></FORM>
        </div>
    );
}

export default Edit