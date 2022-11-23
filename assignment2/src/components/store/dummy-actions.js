import { uiActions } from './ui-slice';
import { dataSliceActions } from './data-slice';

export const fetchDummyData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001'
      );

      if (!response.ok) {
        throw new Error('Could not fetch userdata data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const dummyAPIdata = await fetchData();
      console.log(dummyAPIdata);
      dispatch(
        dataSliceActions.initiateDummy({
        items: dummyAPIdata || [],
         })
       );
       dispatch(dataSliceActions.mapEmployee());
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching userdata data failed!',
        })
      );
    }
  };
};

export const sendData = (userdata) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          body: JSON.stringify({
            USERS: userdata,
          }),
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error('Sending user data failed.'); }
    };

    try {      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending data failed!',
        })
      );
    }
  };
};
