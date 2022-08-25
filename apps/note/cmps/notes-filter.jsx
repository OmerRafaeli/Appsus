
export class NotesFilter extends React.Component {
    state = {
        filterBy: {
            title: '',
            type: ''
        }
    }
    onGetValue = (ev) => {
        // console.log('ev.target.value:', ev.target.value)
        const value = ev.target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                type: value,

            }
        }), () => {

            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onHandleChange = (ev) => {
        const value = ev.target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                title: value,

            }
        }), () => {

            this.props.onSetFilter(this.state.filterBy)
        })
    }



    render() {
        const { title, type } = this.state.filterBy
        const { onGetValue, onHandleChange } = this
        return <section className="notes-filter">
            <label htmlFor="search-note-title"></label>
            <input type="search"
                id="search-note-title"
                placeholder="Search Book By Title"
                value={title}
                onChange={onHandleChange} />
            <label htmlFor="search-note-type">Search By Type</label>
            <select name="search-note-type" id="search-note-type"
                onChange={onGetValue}>
                <option value="">All</option>
                <option value="note-txt">Text</option>
                <option value="note-todos">List</option>
                <option value="note-img">Image</option>
                <option value="note-video">Video</option>
            </select>
        </section>
    }
}