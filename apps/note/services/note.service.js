import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const noteService = {
    query
}

const KEY = 'notesDB'

const gNotes = [
    {
        id: utilService.makeId(5),
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: utilService.makeId(5),
        type: "note-img",
        info: {
            url: "http://some-img/me",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: utilService.makeId(5),
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [{
                txt: "Driving liscence",
                doneAt: null
            },
            {
                txt: "Coding power",
                doneAt: 187111111
            }]
        }
    }]

function query() {
    let notes = _loadFromStorage()
    if (!notes) {
        notes = gNotes
        // console.log('notes from service:', notes)
        _saveToStorage(notes)
    }
    return Promise.resolve(notes)
}



function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}