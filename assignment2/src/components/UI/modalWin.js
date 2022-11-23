
import React from "react";
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onCancel} />;
    };

    const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
        </div>
    );
    };

const ModalWin =(props)=>{
    return(
        <React.Fragment>
        {ReactDOM.createPortal(<Backdrop onCancel={props.onCancel} />, 
        document.getElementById('overlay-root')
        )}

      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById('overlay-root')
      )}

        </React.Fragment>

    );
}
export default ModalWin;