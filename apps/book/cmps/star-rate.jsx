

export class StarRate extends React.Component {
    state = {
        rate: null
    }

    handleChange = (ev) => {
        ev.preventDefault()
        // console.log('target:', target.name)
        // const field = ev.target.name
        const value = +ev.target.value
        this.setState({ rate: value },
            () => {

                this.props.onGetRate(this.state.rate)
            })
    }

    render() {
        return <section className="star-rate">
            <div >
                <form className="rate" >
                    <label htmlFor="star5" title="text">5 stars</label>
                    <input type="radio" id="star5" name="rate5" value="5" onChange={this.handleChange} />
                    <label htmlFor="star4" title="text">4 stars</label>
                    <input type="radio" id="star4" name="rate4" value="4" onChange={this.handleChange} />
                    <label htmlFor="star3" title="text">3 stars</label>
                    <input type="radio" id="star3" name="rate3" value="3" onChange={this.handleChange} />
                    <label htmlFor="star2" title="text">2 stars</label>
                    <input type="radio" id="star2" name="rate2" value="2" onChange={this.handleChange} />
                    <label htmlFor="star1" title="text">1 star</label>
                    <input type="radio" id="star1" name="rate1" value="1" onChange={this.handleChange} />
                </form>
            </div>
        </section>
    }
}