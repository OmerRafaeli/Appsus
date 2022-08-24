import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const noteService = {
    query,
    getNoteById
}

const KEY = 'notesDB'

const gNotes = [
    {
        id: utilService.makeId(5),
        type: 'note-txt',
        isPinned: true,
        info: {
            txt: 'Fullstack Me Baby!'
        },
        backgroundColor: '#00d'
    },
    {
        id: utilService.makeId(5),
        type: 'note-img',
        info: {
            url: 'https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1://some-img/me',
            title: 'Bobi and Me'
        },
        backgroundColor: '#00d'
    },
    {
        id: utilService.makeId(5),
        type: 'note-todos',
        backgroundColor: '#00d',
        info: {
            label: 'Get my stuff together',
            todos: [{
                txt: 'Driving liscence',
                doneAt: null
            },
            {
                txt: 'Coding power',
                doneAt: 187111111
            }]
        }
    },
    {
        id: utilService.makeId(5),
        type: 'note-video',
        info: {
            url: 'https://www.youtube.com/embed/GWUbo0puBk0',
            title: 'Bobi and Me'
        },
        backgroundColor: '#00d'
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

function getNoteById(noteId) {
    if (!noteId) return Promise.resolve(null)
    
    const notes = _loadFromStorage()
    const note = notes.find(note => note.id === noteId)
    // console.log('note:', note)
    return Promise.resolve(note)
}

function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}