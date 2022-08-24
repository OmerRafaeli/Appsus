

export class NoteTxt extends React.Component {
    state = {
        txt: 'txt here',
        color: null
    }

    handleChange = (ev) => {
        const { textContent } = ev.target
        console.log('textContent:', textContent)
        this.setState({ txt: textContent },
            this.props.onSetTxt(this.state.txt))
            console.log('this.state.txt:', this.state.txt)
    }

    render() {
        const { txt } = this.state
        console.log('txt:', txt)
        return <section className="note-txt">
            <div contenteditable='true' onBlur={this.handleChange}>

                {txt}
            </div>
        </section>
    }
}