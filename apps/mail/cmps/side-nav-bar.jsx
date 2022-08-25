import { Compose } from "../cmps/compose.jsx"
const { NavLink } = ReactRouterDOM

export class SideNav extends React.Component {

    state = {
        isComposing: false
        
    }


    onIsComposing = () => {
        let {isComposing} = this.state
        isComposing = true
        this.setState({isComposing}, () => console.log('isComposing:', this.state.isComposing))
        // isComposing = !isComposing
        
    }

    render() {
        let {isComposing} = this.state
        console.log('isComposing:', isComposing)
        
        return <section>
            <nav className="side-nav-container">
                <img onClick={this.onIsComposing} className="compose-img" src="assets/img/composeIcon.svg" alt="" />
            </nav>
            {isComposing && <Compose />}
        </section>

    }

}