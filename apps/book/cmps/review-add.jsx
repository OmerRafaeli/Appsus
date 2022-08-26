
import { bookService } from "../services/book.service.js";
import { utilService } from "../services/util.service.js";
import { StarRate } from "./star-rate.jsx";


export class ReviewAdd extends React.Component {
    // const date = (new Date()).toLocaleString().split(',').slice(0, 1).toString()
    state = {
        review: {
            fullName: null,
            rate: null,
            date: null,
            txt: null
        }
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }

    getDate = () => {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${year}-${utilService.padNum(month)}-${utilService.padNum(day)}`
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
        this.setState((prevState) => ({
            review: {
                ...prevState.review,
                [field]: value,
            }
        }))
    }

    onGetPreview = (ev) => {
        ev.preventDefault()
    }

    onGetRate = (rate) => {
        // console.log('rate:', rate)
        this.setState((prevState) => ({
            review: {
                ...prevState.review,
                rate,
            }
        }))
    }

    onSaveReview = () => {
        const bookId = this.props.bookId
        const { review } = this.state
        bookService.addReview(bookId, review)
            .then(() => {
                this.setState({
                    review: {
                        fullName: null,
                        rate: null,
                        date: null,
                        txt: null
                    }
                }, this.props.loadBook())
            })

    }

    render() {

        const { fullName, rate, date, txt } = this.state.review
        // console.log('this.state.review:', this.state.review)
        return <section className="review-add">
            <h3>Book review:</h3>
            <div className="review-form">
                <form onSubmit={this.onGetPreview}>
                    <label htmlFor="user-name">Full name:</label>
                    <input type="text"
                        ref={this.inputRef}
                        placeholder="Enter your name here"
                        id="user-name"
                        name="fullName"
                        value={fullName}
                        onChange={this.handleChange}
                    />
                    <StarRate onGetRate={this.onGetRate} />
                    <label htmlFor="date"></label>
                    <input type="date"
                        name="date"
                        value={date || this.getDate()}
                        onChange={this.handleChange} />
                    <label htmlFor="free-txt"></label>
                    <textarea name="txt" id="free-txt" cols="30" rows="10"
                        value={txt}
                        onChange={this.handleChange}></textarea>
                    <button onClick={this.onSaveReview}>Submit</button>
                </form>
            </div>
        </section>
    }
}