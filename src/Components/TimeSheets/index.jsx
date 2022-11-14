import styles from './time-sheets.module.css';
import Spinner from '../Shared/Spinner';
import { useEffect, useState } from 'react';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { getTimesheets, deleteTimesheet } from '../../redux/timeSheets/thunks';
import { setModalTitle, setModalContent } from '../../redux/timeSheets/actions';

const TimeSheets = () => {
  const {
    list: timesheetsList,
    fetching,
    error,
    children,
    modalTitle
  } = useSelector((state) => state.timeSheets);
  const dispatch = useDispatch();
  const [modalDisplay, setModalDisplay] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    dispatch(getTimesheets());
  }, []);

  const removeTimesheets = (id) => {
    dispatch(deleteTimesheet(id));
    setIsToConfirm(false);
    setModalDisplay(true);
    dispatch(getTimesheets());
  };

  const columns = [
    { heading: 'Description', value: 'description' },
    { heading: 'Date', value: 'date' },
    { heading: 'Project', value: 'project' },
    { heading: 'Task', value: 'task' },
    { heading: 'Employee', value: 'employee' },
    { heading: 'Hours', value: 'hours' },
    { heading: 'Actions' }
  ];

  return (
    <>
      <section className={styles.container}>
        {!fetching ? (
          <Table
            title="Timesheets"
            data={timesheetsList}
            error={error}
            columns={columns}
            deleteItem={(id) => {
              setIsToConfirm(true);
              setModalDisplay(true);
              setId(id);
              dispatch(setModalTitle('Delete'));
              dispatch(setModalContent('Are you sure you want to delete it?'));
            }}
            edit="/time-sheets/form"
          />
        ) : (
          <Spinner />
        )}
        {modalDisplay ? (
          <Modal
            title={modalTitle}
            setModalDisplay={setModalDisplay}
            isToConfirm={isToConfirm}
            onClickFunction={() => removeTimesheets(id)}
          >
            {children}
          </Modal>
        ) : null}
      </section>
    </>
  );
};

export default TimeSheets;
