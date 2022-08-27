import { mapService } from "../services/map.service.js"


export class NoteMap extends React.Component {
    mapRef
    mapRef = React.createRef()

    componentDidMount() {
        this.onInitMap()
    }

    onInitMap = () => {

        mapService
            .initMap()
            .then(() => {
                console.log('Map is ready')
            })
            .catch(() => console.log('Error: cannot init map'))
    }

    render() {
        return <section className="note-map">
            <div className="map-section">
                <h4>{this.props.note.info.txt}</h4>
                <div ref={this.mapRef} id="map" height="200" width="300"></div>
            </div>
        </section>
    }
}
