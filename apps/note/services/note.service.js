import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const noteService = {
    query,
    getNoteById,
    removeNote
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
        backgroundColor: utilService.getRandomColor()
    },
    {
        id: utilService.makeId(5),
        type: 'note-img',
        info: {
            url: 'https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1://some-img/me',
            title: 'Bobi and Me'
        },
        backgroundColor: utilService.getRandomColor()
    },
    {
        id: utilService.makeId(5),
        type: 'note-todos',
        backgroundColor: utilService.getRandomColor(),
        info: {
            title: 'Get my stuff together',
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
        backgroundColor: utilService.getRandomColor()
    }]

function query() {
    let notes = _loadFromStorage()
    if (!notes || notes.length === 0) {
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

function removeNote(noteId) {
    let notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveToStorage(notes)
    return Promise.resolve()
}

function _creatNote(type, txt) {
    let note
    switch (type) {
        case 'note-txt':
            note = _creatTxtNote(txt)
            break
        case 'note-img':
            note = _creatImgNote(txt)
            break
        case 'note-todos':
            note = _creatTodoNote(txt)
            break
        case 'note-video':
            note = _creatVideoNote(txt)
            break
    }
    return note
}

function _creatTxtNote(txt) {
    return {
        id: utilService.makeId(5),
        type: 'note-txt',
        isPinned: false,
        info: {
            txt: txt
        },
        backgroundColor: utilService.getRandomColor()
    }
}

function _creatImgNote(txt) {
    return {
        id: utilService.makeId(5),
        type: 'note-img',
        info: {
            url: txt,
            title:'My img'
        },
        backgroundColor: utilService.getRandomColor()
    }
}

function _creatTodoNote(txt) {
    return {
        id: utilService.makeId(5),
        type: 'note-todos',
        backgroundColor: utilService.getRandomColor(),
        info: {
            title: txt,
            todos: []
        }
    }
}

function _creatVideoNote(txt) {
    return {
        id: utilService.makeId(5),
        type: 'note-video',
        info: {
            url: txt,
            title: 'My video'
        },
        backgroundColor: utilService.getRandomColor()
    }
}

function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}