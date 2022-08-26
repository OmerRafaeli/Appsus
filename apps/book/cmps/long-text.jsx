
export class LongText extends React.Component {

    state = {
        isTxtShown: null
    }


    showShortTxt = () => {
        const { text } = this.props
        console.log('text:', text)
        if (!this.state.isTxtShown) {
            const shortTxt = text.substring(0, 101)
            return shortTxt + '...'
        } else return text
    }

    onToggleShowTxt = () => {
        this.setState({ isTxtShown: !this.state.isTxtShown })
    }

    showBtnTxt = () => {
        if (!this.state.isTxtShown) return 'Show more'
        else return 'Show less'
    }


    render() {
        const { text } = this.props

        console.log('text.length:', text.length)
        console.log('text:', text)
        return <section className="long-text">
            <article className="txt">
                <p>{this.showShortTxt()}</p>
                <button onClick={this.onToggleShowTxt}>{this.showBtnTxt()}</button>
            </article>
        </section>
    }
}