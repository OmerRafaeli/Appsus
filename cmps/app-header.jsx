import { UserMsg } from "./user-msg.jsx"

const { Link, NavLink, withRouter } = ReactRouterDOM

export class AppHeader extends React.Component {
    state = {
        isMenuOpen: false
    }


    onOpenMenu = () => {
        this.setState(prevState =>
        ({
            isMenuOpen: !prevState.isMenuOpen
        }), () => {
            console.log('this.state:', this.state)
            
        })
    }

    render() {
        const {isMenuOpen} = this.state
        return <header className="app-header">
            <NavLink className to="/">
                <div className="logo-container">
                    <img src="assets/img/appsusLogo.png" alt="" />
                </div>
            </NavLink>

            <nav className={`header-nav-bar ${isMenuOpen ? 'open' : ''}`}>
                <NavLink title="Home" exact to="/"><img className="icon-btn" src="assets/img/homeIcon.svg" alt="" /></NavLink>
                <NavLink title="Books" to="/book"><img className="icon-btn" src="assets/img/booksIcon.svg" alt="" /></NavLink>
                <NavLink title="Mail" to="/mail"><img className="icon-btn" src="assets/img/mailIcon.svg" alt="" /></NavLink>
                <NavLink title="Keep" to="/note"><img className="icon-btn" src="assets/img/keepIcon.svg" alt="" /></NavLink>
            </nav>

            <div className="app-menu-icon">
                <img onClick={this.onOpenMenu} src="assets/img/appMenuIcon.svg" alt="" />
            </div>
        </header>
    }
}
