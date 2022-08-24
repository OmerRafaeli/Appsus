

export class UserBtns extends React.Component {

    state = {
        isColorOn: false
    }
    onShowColors = () => {
        // console.log('btn!!!!');
        this.setState({ isColorOn: !this.state.isColorOn })
    }
    onGetColor = (ev) => {
        const { backgroundColor } = ev.target.style
        this.setState({ isColorOn: !this.state.isColorOn })
        this.props.onChangeColor(backgroundColor)
        // console.log('backgroundColor:', backgroundColor)
    }




    render() {

        const { onShowColors, onGetColor } = this
        const { isColorOn } = this.state
        const { note,onRemoveNote } = this.props
        console.log('isColorOn:', isColorOn)
        return <section className="user-btns">
            <i className="fa-solid fa-paste"></i>
            <div onClick={onShowColors}><i className="fa-solid fa-palette" ></i></div>
            <div onClick={() => onRemoveNote(note.id)}> <i className="fa-solid fa-trash"></i></div>
            {isColorOn && <div className="color-pick">
                <div className="picked-color" style={{ backgroundColor: 'rgb(243, 114, 140)' }} onClick={onGetColor}></div>
                <div className="picked-color" style={{ backgroundColor: 'rgb(213, 114, 243)' }} onClick={onGetColor}></div>
                <div className="picked-color" style={{ backgroundColor: 'rgb(155, 114, 243)' }} onClick={onGetColor}></div>
                <div className="picked-color" style={{ backgroundColor: 'rgb(114, 161, 243)' }} onClick={onGetColor}></div>
                <div className="picked-color" style={{ backgroundColor: 'rgb(114, 243, 222)' }} onClick={onGetColor}></div>
                <div className="picked-color" style={{ backgroundColor: 'rgb(151, 243, 114)' }} onClick={onGetColor}></div>
                <div className="picked-color" style={{ backgroundColor: 'rgb(243, 193, 114)' }} onClick={onGetColor}></div>
                <div className="picked-color" style={{ backgroundColor: 'rgb(245, 166, 166)' }} onClick={onGetColor}></div>
            </div>}
        </section>
    }
}