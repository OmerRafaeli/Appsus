

export class BooksFilter extends React.Component {

    state = {
        filterBy: {
            title: '',
            price: '',
        }
    }

    handleChange = (ev) => {
        ev.preventDefault()
        // console.log('target:', target.name)
        const field = ev.target.name
        const value = ev.target.type === 'text' ? ev.target.value : +ev.target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value,

            }
        }), () => {

            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }


    render() {
        const { title, price } = this.state.filterBy
        return <section className="books-filter">
            <form onSubmit={this.onFilter}>
                <label htmlFor="by-title">Title: </label>
                <input
                    type="text"
                    placeholder="Filter by title"
                    id="by-title"
                    name="title"
                    value={title}
                    onChange={this.handleChange} />

                <label htmlFor="by-price">Price: </label>
                <input
                    type="range"
                    id="by-price"
                    name="price"
                    value={price}
                    onChange={this.handleChange} />
                <button>Filter</button>
            </form>

        </section>
    }
}