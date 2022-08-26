import { eventBusService } from "../../../services/event-bus.service.js"
import { Compose } from "../cmps/compose.jsx"

export class SideNav extends React.Component {
    unsubscribe
    state = {
        isComposing: false

    }

    componentDidMount() {
        this.unsubscribe = eventBusService.on('note-to-mail', () => {
            console.log('helooooo')
            setTimeout(() => {
                console.log('this.state:', this.state.isComposing)
                this.onIsComposing()

            }, 3000)
        })




        // console.log('hi!')
        // let { isComposing } = this.state
        // isComposing = !isComposing
        // this.setState({ isComposing })


        // setTimeout(()=>{
        // console.log('delayyyyyy')

        // }, 1500)

    }

    onIsComposing = () => {
        let { isComposing } = this.state
        isComposing = !isComposing
        this.setState({ isComposing })
        if(!this.state.isComposing)console.log('composing!')
        setTimeout(() => {
            console.log('this.state:', this.state)

        }, 1500)
    }

    render() {
        let { isComposing } = this.state
        return <section>
            <nav className="side-nav-container">
                <img onClick={this.onIsComposing} className="compose-img" src="assets/img/composeIcon.svg" alt="" />
            </nav>
            {isComposing && <Compose onIsComposing={this.onIsComposing} />}
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