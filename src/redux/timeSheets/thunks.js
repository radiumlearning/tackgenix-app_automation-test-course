import {
  getTimesheetsPending,
  getTimesheetsSuccess,
  getTimesheetsError,
  deleteTimesheetsPending,
  deleteTimesheetsSuccess,
  deleteTimesheetsError,
  postTimesheetsPending,
  postTimesheetsSuccess,
  postTimesheetsError,
  putTimesheetsPending,
  putTimesheetsSuccess,
  putTimesheetsError
} from './actions';

export const getTimesheets = () => {
  const token = sessionStorage.getItem('token');
  return async (dispatch) => {
    dispatch(getTimesheetsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`, {
        headers: { token }
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(getTimesheetsSuccess(data.data));
      } else {
        dispatch(getTimesheetsError(data.message.toString()));
      }
    } catch (error) {
      dispatch(getTimesheetsError(error.toString()));
    }
  };
};

export const deleteTimesheet = (id) => {
  const token = sessionStorage.getItem('token');
  return async (dispatch) => {
    dispatch(deleteTimesheetsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'DELETE',
        headers: { token }
      });
      if (response.ok) {
        dispatch(deleteTimesheetsSuccess());
      } else {
        dispatch(deleteTimesheetsError());
      }
    } catch (error) {
      dispatch(deleteTimesheetsError(error.toString()));
    }
    dispatch(getTimesheets());
  };
};

export const createTimesheet = (timesheet) => {
  const token = sessionStorage.getItem('token');
  return async (dispatch) => {
    dispatch(postTimesheetsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token },
        body: JSON.stringify(timesheet)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(postTimesheetsSuccess(data.data));
      } else {
        dispatch(postTimesheetsError(data.message));
      }
    } catch (error) {
      dispatch(postTimesheetsError(error.toString()));
    }
  };
};

export const editTimesheet = (id, timesheet) => {
  const token = sessionStorage.getItem('token');
  return async (dispatch) => {
    dispatch(putTimesheetsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', token },
        body: JSON.stringify(timesheet)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(putTimesheetsSuccess(data.data));
      } else {
        dispatch(putTimesheetsError(data.message));
      }
    } catch (error) {
      dispatch(putTimesheetsError(error.toString()));
    }
  };
};
