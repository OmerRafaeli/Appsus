import { Compose } from "../cmps/compose.jsx"
const { NavLink } = ReactRouterDOM

export class SideNav extends React.Component {

    state = {
        isComposing: false
        
    }


    onIsComposing = () => {
        let {isComposing} = this.state
        isComposing = !isComposing
        this.setState({isComposing})
        // isComposing = !isComposing
        
    }

    render() {
        let {isComposing} = this.state        
        return <section>
            <nav className="side-nav-container">
                <img onClick={this.onIsComposing} className="compose-img" src="assets/img/composeIcon.svg" alt="" />
            </nav>
            {isComposing && <Compose onIsComposing={this.onIsComposing}/>}
            <div className="filter">
            <a href=""><i className="fa-solid fa-inbox"></i>  Inbox</a>
            <a href=""><i className="fa-regular fa-star"></i>  Starred</a>
            <a href=""><i className="fa-solid fa-paper-plane"></i>  Sent</a>
            <a href=""><i className="fa-solid fa-file"></i>  Draft</a>
            <a href=""><i className="fa-solid fa-trash"></i>  Trash</a>
            </div>
        </section>

    }

}