export class EmailFilter extends React.Component {

    state = {
        filterBy: {
            inbox: true,
            stared: false,
            sent: false,
            draft: false,
            trash: false,
        },
    }

    inputRef = React.createRef()

    componentDidMount() {
        // console.log('inputRef', this.inputRef);
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    goSearch = () => {
        this.inputRef.current.focus()
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    // WE WANT TO KEEP OUR CODE DRY!! BAD WAY!
    // handleVendorChange = (ev) => {
    //     console.log('ev.target', ev.target.value);
    //     const { value } = ev.target
    //     this.setState({
    //         filterBy: {
    //             ...this.state.filterBy,
    //             vendor: value
    //         }
    //     })
    // }

    // handleMinSpeedChange = (ev) => {
    //     console.log('ev.target', ev.target.value);
    //     const { value } = ev.target
    //     this.setState({
    //         filterBy: {
    //             ...this.state.filterBy,
    //             minSpeed: value
    //         }
    //     })
    // }


    render() {
        const { vendor, minSpeed, maxSpeed } = this.state.filterBy
        return <section className="car-filter">
            <form onSubmit={this.onFilter}>
                <label htmlFor="by-vendor">Vendor :</label>
                <input
                    ref={this.inputRef}
                    type="text"
                    placeholder="by vendor.."
                    id="by-vendor"
                    name="vendor"
                    value={vendor}
                    onChange={this.handleChange}
                />

                <label htmlFor="by-min-speed">Min Speed :</label>
                <input
                    type="number"
                    placeholder="by min speed.."
                    id="by-min-speed"
                    name="minSpeed"
                    value={minSpeed}
                    onChange={this.handleChange}
                />

                <label htmlFor="by-max-speed">Max Speed :</label>
                <input
                    type="number"
                    placeholder="by max speed.."
                    id="by-max-speed"
                    name="maxSpeed"
                    value={maxSpeed}
                    onChange={this.handleChange}
                />

                <button>Filter!</button>
            </form>


            <button className="search-btn" onClick={this.goSearch}>Go Search!</button>
        </section>
    }
}