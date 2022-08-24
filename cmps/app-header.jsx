const { Link, NavLink, withRouter } = ReactRouterDOM
export function AppHeader() {

    function showAppNav(){

    }

    return <header className="app-header">
        <div className="menu-icon">
            <img src="../assets/img/menuIcon.svg" alt="" />
        </div>
        <NavLink className to="/">
            <div className="logo-container">
                <img src="../assets/img/logo.svg" alt="" />
            </div>
        </NavLink>
        
        {/* <input className="header-search" type="search" placeholder="Search Here..." /> */}

        <nav className="header-nav-bar">
            <NavLink to="/mail"><img  className="icon-btn" src="../assets/img/mailIcon.svg" alt="" /></NavLink>
            <NavLink to="/note"><img  className="icon-btn" src="../assets/img/keepIcon.svg" alt="" /></NavLink>
            <NavLink exact to="/"><img className="icon-btn" src="../assets/img/homeIcon.svg" alt="" /></NavLink>
            <NavLink to="/about"><img  className="icon-btn" src="../assets/img/aboutIcon.svg" alt="" /></NavLink>
        </nav>
        {/* <div className="app-menu-icon">
            <img src="../assets/img/appMenuIcon.svg" alt="" />
        </div> */}
    </header>
}
