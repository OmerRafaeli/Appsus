

export class NoteTxt extends React.Component {
    state = {
        txt: this.props.txt,
        // txt:'sdfsdf',
        color: null
    }

    handleChange = (ev) => {
        const { textContent } = ev.target
        const { note } = this.props

        this.props.onChangeTxt(textContent, note.id, note.type)
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