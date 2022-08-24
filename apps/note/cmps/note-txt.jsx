

export class NoteTxt extends React.Component {
    state = {
        txt: this.props.txt,
        // txt:'sdfsdf',
        color: null
    }

    handleChange = (ev) => {
        const { textContent } = ev.target
        // console.log('textContent:', textContent)
        this.setState({ txt: textContent }, () => {
            this.props.onSetTxt(this.state.txt)
        })
        // console.log('this.state.txt:', this.state.txt)
    }

    render() {
        // console.log('this.props:', this.props)
        const { txt } = this.state
      
        return <section className="note-txt">
            <div contentEditable='true' onBlur={this.handleChange}>

                {txt}
            </div>
        </section>
    }
}