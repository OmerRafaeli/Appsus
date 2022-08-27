

export class NoteCanvas extends React.Component {

    state = {
        // gElCanvas: this.canvasRef,
        gCtx: null
    }

    componentDidMount() {
        this.setState({ gCtx: this.canvasRef.current.getContext('2d') })
        const { gCtx } = this.state

        console.log('gCtx:', gCtx)
        console.log('this.canvasRef.current:', this.canvasRef.current.id)
        // this.state.gCtx.fillStyle = "white"
        // this.state.gCtx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
    canvasRef = React.createRef()


    render() {
        const { note } = this.props
        return <section className="note-canvas">
            <div className="canvas-container">
                <h4>{note.info.txt}</h4>
                <canvas ref={this.canvasRef} id="my-canvas" height="200" width="300"></canvas>
            </div>

        </section>
    }
}