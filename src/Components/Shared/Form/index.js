import React from 'react';
import styles from 'Components/Shared/Form/form.module.css';
import FunctionalButton from 'Components/Shared/Buttons/FunctionalButton';
import { useHistory } from 'react-router-dom';

const Form = ({
  onSubmitFunction,
  children,
  buttonMessage,
  formTitle,
  resetFunction,
  isInModal = false
}) => {
  let history = useHistory();
  const back = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div className={`${styles.form__container} ${isInModal && styles.form__container}`}>
      <div className={styles.box}>
        <form onSubmit={onSubmitFunction} className={styles.form}>
          <h2>{formTitle}</h2>
          {children}
          <div className={styles.div__buttons}>
            {!isInModal && (
              <FunctionalButton
                action={back}
                buttonType="form__button"
                buttonColor="red"
                title="Go back"
              />
            )}

            <FunctionalButton
              buttonType="form__button"
              buttonColor="green"
              type="submit"
              title={buttonMessage}
            />
            {!isInModal && (
              <FunctionalButton
                buttonType="form__button"
                buttonColor="blue"
                type="button"
                title="Reset"
                action={resetFunction}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
