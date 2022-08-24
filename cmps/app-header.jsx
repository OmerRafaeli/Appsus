const { Link, NavLink, withRouter } = ReactRouterDOM
export function AppHeader() {

    return <header className="app-header">
        <div className="menu-icon">
            <img src="../assets/img/menuIcon.svg" alt="" />
        </div>
        <Link className to="/">
            <div className="logo-container">
                <img src="../assets/img/logo.svg" alt="" />
            </div>
        </Link>
        
        <input className="header-search" type="search" placeholder="Search Here..." />

        <div className="app-menu-icon">
            <img src="../assets/img/appMenuIcon.svg" alt="" />
        </div>
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Keep</NavLink>
        </nav>
    </header>
}
