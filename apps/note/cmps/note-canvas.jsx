

export class NoteCanvas extends React.Component{
    render(){
        const {note}= this.props
        return <section className="note-canvas">
            <div className="canvas-container">
                <h4>{note.info.txt}</h4>
            <canvas id="my-canvas" height="200" width="300"></canvas>
            </div>
        </section>
    }
}