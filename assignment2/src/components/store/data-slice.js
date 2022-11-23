import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'UserData',
  initialState: {
    USERS: [],
    selectedUser:null,
   },
 
 reducers: 
 {
    saveChanges(state, action){
      const newData = action.payload;
      state.USERS = newData;
    },

      // for selecting user for edit - form autofill
    setSelectedUser(state, action) {
      const ID = action.payload;
      state.selectedUser= state.USERS.find(item => item.id === ID);
    },

    editUser(state, action) {
      const newData = action.payload;
      state.USERS.push(newData);
      // const existingItem = state.USERS.find((item) => item.id === newData.id);
      // if(existingItem)
      // { existingItem.id = newData.id;
      //   existingItem.Uname = newData.Uname;
      //   existingItem.UID = newData.UID;
      // }
      // else{}   
    },
  }
});
    

    // deleteUser(state, action) {
    //   const ID = action.payload;
    //   state.USERS = state.USERS.filter((item) => item.id !== ID);  
    //   state.selectedUser=null;
    // },

    // shiftUP(state, action) {  
    //   for (var i = 0; i < state.selectedRows.length; i++) {
    //     state.USERS[state.selectedRows[i]].checkedStatus = false
    //     }
        
    //     function swapElements(i1, i2) {
    //       [state.USERS[i1], state.USERS[i2]] = [state.USERS[i2], state.USERS[i1]];
    //     }
          
    //     state.selectedRows.sort();
    //     if (state.selectedRows[0]>0){
    //       for (var j = 0; j < state.selectedRows.length; j++) {
    //         swapElements(state.selectedRows[j], (state.selectedRows[j]-1))
    //         }

    //     }
    //     else
    //     {alert("Cant move up the first row");}
 
    //    state.selectedRows=state.selectedRows.map(x=>x-1);
    //    for (var k = 0; k < state.selectedRows.length; k++) {
    //     state.USERS[state.selectedRows[k]].checkedStatus = true;
    //     }
    // },

    // shiftDOWN(state, action) {
    //   for (var i = 0; i < state.selectedRows.length; i++) {
    //     state.USERS[state.selectedRows[i]].checkedStatus = false
    //     }
        
    //     function swapElements(i1, i2) {
    //       [state.USERS[i1], state.USERS[i2]] = [state.USERS[i2], state.USERS[i1]];
    //     }
          
    //     state.selectedRows.reverse();
    //     if (state.selectedRows[0]<(state.USERS.length-1)){
    //       for (var j = 0; j < state.selectedRows.length; j++) {
    //         swapElements(state.selectedRows[j], (state.selectedRows[j]+1))
    //         }

    //     }
    //     else
    //     {alert("Cant move down the last row");}
 
    //     state.selectedRows=state.selectedRows.map(x=>x+1);
    //     for (var k = 0; k < state.selectedRows.length; k++) {
    //      state.USERS[state.selectedRows[k]].checkedStatus = true;
    //      }
    // },


 
    // selectCheckedRows(state, action){
    //   const index = action.payload;
    //   const ex = state.selectedRows.includes(index);
    //   if(ex){
    //     state.selectedRows = state.selectedRows.filter((item) => item !== index,); 
    //     state.USERS[index].checkedStatus = false;
    //   }
    //   else{
    //     state.selectedRows.push(index);
    //     state.USERS[index].checkedStatus = true;
    //   }


    //   if (selUserindex.includes(x))
    // {
    //  let newArr=  selUserindex.filter((y) => y !== x);
    
    // // selUserindex=Array.from(newArr);
    
    //   selUserindex=newArr;
    // console.log("includes", newArr, selUserindex);
    // }
    // else{
    //     selUserindex.push(x);
    // }
  
    // if (selUserindex.length>0)
    // {
    //     setChecked(true);
    // }
    // else{setChecked(false);}
  
    // console.log("EOF", selUserindex);
    
    // },


export const dataSliceActions = dataSlice.actions;
export default dataSlice;
