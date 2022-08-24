export class AddNote extends React.Component {

    state = {
        enterTxt: 'Add a new Note',
        type: null,
        txt: null
    }

    onGetType = (type) => {
        switch (type) {
            case 'note-txt':
                this.setState({ enterTxt: 'Add a new Note', type })
                break
            case 'note-img':
                this.setState({ enterTxt: 'Write img url here', type })
                break
            case 'note-todos':
                this.setState({ enterTxt: 'Add a new Todo list', type })
                break
            case 'note-video':
                this.setState({ enterTxt: 'Write video url here', type })
                break
        }
    }

    render() {
        const { onGetType } = this
        const { enterTxt, type } = this.state
        const { onAddNote } = this.props
        // console.log('type:', type)
        return <section className="add-note">
            <div className="note-input">
                <form onBlur={() => onAddNote(type)}>
                    <label htmlFor="add-note"></label>
                    <input type="text"
                        id="add-note"
                        name="add-note"
                        placeholder={enterTxt} />
                </form>
                <div className="btns-input">
                    <button onClick={() => onGetType('note-txt')}></button>
                    <button onClick={() => onGetType('note-img')}></button>
                    <button onClick={() => onGetType('note-todos')}></button>
                    <button onClick={() => onGetType('note-video')}></button>
                </div>
            </div>
        </section>
    }
}