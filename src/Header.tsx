import logoDescribe from './assets/logoDescribe.png';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <img className="logo" src={logoDescribe} alt="Logo" />
          </li>

          <li>
            <a href="./paginas/describeIng.html">
              <i className="fa fa-flag icono-derecha" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
