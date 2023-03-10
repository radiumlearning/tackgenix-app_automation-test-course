import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  deleteProjectsPending,
  deleteProjectsSuccess,
  deleteProjectsError,
  postProjectsPending,
  postProjectsSuccess,
  postProjectsError,
  putProjectsPending,
  putProjectsSuccess,
  putProjectsError,
  setModalContent
} from './actions';

export const getProjects = () => {
  const token = sessionStorage.getItem('token');
  return async (dispatch) => {
    dispatch(getProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        headers: { token }
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(getProjectsSuccess(data.data));
      } else {
        dispatch(getProjectsError(data.message.toString()));
      }
    } catch (error) {
      dispatch(getProjectsError(error.toString()));
    }
  };
};

export const deleteProject = (id) => {
  const token = sessionStorage.getItem('token');
  return async (dispatch) => {
    dispatch(deleteProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: { token }
      });
      if (response.ok) {
        dispatch(deleteProjectsSuccess(id));
      } else {
        dispatch(deleteProjectsError());
      }
    } catch (error) {
      dispatch(deleteProjectsError(error.toString()));
    }
  };
};

export const createProject = (project) => {
  const token = sessionStorage.getItem('token');
  return async (dispatch) => {
    dispatch(postProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token },
        body: JSON.stringify(project)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(postProjectsSuccess(data.data));
      } else {
        dispatch(postProjectsError(data.message));
      }
    } catch (error) {
      dispatch(postProjectsError(error.toString()));
    }
  };
};

export const editProject = (id, project, isForDelete = false) => {
  const token = sessionStorage.getItem('token');
  return async (dispatch) => {
    dispatch(putProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', token },
        body: JSON.stringify(project)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(putProjectsSuccess(data.data));
        dispatch(getProjects());
        isForDelete === true && dispatch(setModalContent('Project deleted'));
      } else {
        dispatch(putProjectsError(data.message));
      }
    } catch (error) {
      dispatch(putProjectsError(error.toString()));
    }
  };
};
