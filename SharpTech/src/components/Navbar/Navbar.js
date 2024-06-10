import React, { useEffect, useState, useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/SharpTechLogo.png'
import menu_icon from '../../assets/menu-icon.png'
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import AuthContext from '../../implements/AuthContext/AuthContext';
import Dropdown from "../../implements/Dropdown/Dropdown";

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useContext(AuthContext); // Use the context


  const handleLogout = () => {
    const confirmDelete = window.confirm('Are you sure you want to logout this user?');
    if (confirmDelete) {
      logout();
      //  UserService.logout();
    }
  };

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    })
  }, []);


  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
  }

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <Link to='Navbar'> {/* Link the logo to the homepage */}
        <img src={logo} alt="" className={`logo ${sticky ? 'sticky-logo' : ''}`} />
      </Link>
      <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>

        {!isAuthenticated && <li ><Link to='carousel' smooth={true} offset={-250} duration={500}>Home</Link></li>}
        {!isAuthenticated && <li><Link to='about' smooth={true} offset={-150} duration={500}>About</Link></li>}
       
        {!isAuthenticated && <li><Link to='program' smooth={true} offset={-440} duration={500}>Services</Link></li>}
        {!isAuthenticated && <li><Link to='testimonials' smooth={true} offset={-320} duration={500}>Reports</Link></li>}
        {!isAuthenticated && <li><Link to='contact' smooth={true} offset={-250} duration={500}>Contact</Link></li>}
        {!isAuthenticated && <li className='btn'><RouterLink to="/Login">Login</RouterLink></li>}
        {/* {!isAuthenticated && <li><RouterLink to='/Tempservice'>Tempservice</RouterLink></li>} */}
        {isAdmin && <li><RouterLink to='/Register'>Register</RouterLink></li>}
         {/* {isAdmin && <li><RouterLink to='/EmployeeSearch'>EmployeeSearch</RouterLink></li>}  */}
        {isAdmin && <li><RouterLink to='/Pagination'>Employees List</RouterLink></li>}
        {isAuthenticated && <li ><Dropdown/></li>}

      
        {isAuthenticated && <li className='btn'><RouterLink to="/" onClick={handleLogout}>Logout</RouterLink></li>}
      
        

        {/* <li ><RouterLink to="/Dimond">Dimond</RouterLink></li>  */}
        {/* <li><RouterLink to='/About'>About</RouterLink></li>*/}
        {/*   <li><RouterLink to="/Programs">Services</RouterLink></li>*/}


      </ul>
      <img src={menu_icon} alt="" className='menu-icon' onClick={toggleMenu} />
    </nav>
  )
}

export default Navbar 
