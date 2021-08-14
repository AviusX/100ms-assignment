import classes from './Header.module.scss';
import Logo from '../../assets/images/breaking-bad-logo.png';

const Header = () => (
    <div className={`hidden lg:flex w-full h-80 xl:h-96 ${classes.Header} justify-center`}>
        <div className="w-1/4 xl:w-1/5 h-1/4 xl:h-1/5 my-6">
            <img src={Logo} alt="Breaking Bad Logo" className="filter brightness-150" />
        </div>
    </div>
);

export default Header;