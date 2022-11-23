import React from 'react'
import FORM from './FORM';

function ADD(props) {
    
    const selectedUser = [];
   


    return (
        <div>
           
            <FORM selectedUser={selectedUser} onCancel={props.onCancel}></FORM>
        </div>
    );
}

export default ADD