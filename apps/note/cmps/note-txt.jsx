

export class NoteTxt extends React.Component {
    state = {
        txt: this.props.txt,
        title: this.props.title,
        color: null
    }

    handleChange = (ev) => {
        const { textContent } = ev.target
        const { note } = this.props

        this.props.onChangeTxt(textContent, note.id, note.type)
    }

    render() {
        // console.log('this.props:', this.props)
        const { txt, title } = this.state

        return <section className="note-txt">
            {title && <h5>{title}</h5>}
            <div contentEditable='true' suppressContentEditableWarning onBlur={this.handleChange}>

                {txt}
            </div>
        </section>
    }
}