import styles from 'Components/Header/header.module.css';
import TrackgenixLogo from '../../assets/TrackGENIX-logo.png';
import { RedirectButton } from 'Components/Shared';
import { FunctionalButton } from 'Components/Shared';
import store from 'redux/store';
import { logout } from 'redux/auth/thunks';
// const urlParams = new URLSearchParams(window.location.search);
// const employeeId = urlParams.get('id');
// const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
// const rowId = idRegEx.test(employeeId);

const quit = async () => {
  store.dispatch(logout());
};

function Header() {
  return (
    <header>
      <nav className={styles.navbar}>
        <div>
          <a href="/">
            <img
              src={TrackgenixLogo}
              alt="TrackGENIX Logo"
              className={styles.trackgenix_logo}
            ></img>
          </a>
        </div>
        <ul className={styles.rutes}>
          <li>
            <a href="/admins">admins</a>
          </li>
          <li>
            <a href="/super-admins">super admins</a>
          </li>
          <li>
            <a href="/employees">employees</a>
          </li>
          <li>
            <a href="/projects">projects</a>
          </li>
          <li>
            <a href="/time-sheets">timesheets</a>
          </li>
          <li>
            <a href="/tasks">tasks</a>
          </li>
          <li>
            <a href="/employees/profile?id=638e915bb8c5bda70ac0a890">Profile</a>
          </li>
          <li>
            <a href="/employees/projects?id=638e915bb8c5bda70ac0a890">My Projects</a>
          </li>
        </ul>
        <div className={styles.sign}>
          {sessionStorage.getItem('token') ? (
            <>
              <div>
                <a href="/login">
                  <FunctionalButton title="Logout" action={() => quit()} />
                </a>
              </div>
            </>
          ) : (
            <>
              <div>
                <RedirectButton path="login" title="Login" />
              </div>
              <button type="button">
                <RedirectButton path="sign-up" title="Sign up" />
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
