import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const noteService = {
    query,
    getNoteById,
    removeNote,
    creatNote,
    addNote,
    changeNoteColor,
    editTxt,
    createTodo,
    addTodo,
    editTodo,
    todoIsDone,
    removeTodo,
    changeNotePin
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
        isPinned: false,
        info: {
            url: 'https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1://some-img/me',
            title: 'Bobi and Me'
        },
        backgroundColor: utilService.getRandomColor()
    },
    {
        id: utilService.makeId(5),
        type: 'note-todos',
        isPinned: false,
        backgroundColor: utilService.getRandomColor(),
        info: {
            title: 'Get my stuff together',
            todos: [{
                id: utilService.makeId(5),
                txt: 'Driving liscence',
                isDone: false,
                doneAt: null
            },
            {
                id: utilService.makeId(5),
                txt: 'Coding power',
                isDone: true,
                doneAt: 187111111
            }]
        }
    },
    {
        id: utilService.makeId(5),
        type: 'note-video',
        isPinned: false,
        info: {
            url: 'https://www.youtube.com/embed/GWUbo0puBk0',
            title: 'Bobi and Me'
        },
        backgroundColor: utilService.getRandomColor()
    }]

function query(filterBy) {
    let notes = _loadFromStorage()
    if (!notes || notes.length === 0) {
        notes = gNotes
        // console.log('notes from service:', notes)
        _saveToStorage(notes)
    }

    if (filterBy) {
        console.log('filterBy from service:', filterBy)
        let { type } = filterBy
        let txt = filterBy.title
        notes = notes.filter(note => (
            type === '' ? note : note.type === type
        ))

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

function changeNoteColor(bgColor, noteId) {
    if (!noteId) return Promise.resolve(null)

    const notes = _loadFromStorage()
    const note = notes.find(note => note.id === noteId)
    note.backgroundColor = bgColor
    _saveToStorage(notes)
    return Promise.resolve(note)
}

function editTxt(txt, noteId) {
    if (!noteId) return Promise.resolve(null)

    const notes = _loadFromStorage()
    const note = notes.find(note => note.id === noteId)
    note.info.txt = txt
    _saveToStorage(notes)
    return Promise.resolve(note)
}

function addNote(note) {
    let notes = _loadFromStorage()
    if (!notes) {
        notes = gNotes
    }
    notes.unshift(note)
    _saveToStorage(notes)
    return Promise.resolve(note)
}

function changeNotePin(noteId) {
    if (!noteId) return Promise.resolve(null)
    // console.log('noteId:', noteId)
    const notes = _loadFromStorage()
    const note = notes.find(note => note.id === noteId)
    note.isPinned = !note.isPinned
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function creatNote(type, txt, title='', todos = []) {
    let note
    switch (type) {
        case 'note-txt':
            note = _creatTxtNote(txt, title)
            break
        case 'note-img':
            note = _creatImgNote(txt)
            break
        case 'note-todos':
            note = _creatTodoNote(txt, todos)
            break
        case 'note-video':
            note = _creatVideoNote(txt)
            break
    }
    return Promise.resolve(note)
}


function createTodo(txt) {
    return {
        id: utilService.makeId(5),
        txt,
        isDone: false,
        doneAt: null
    }
}

function removeTodo(todoId, noteId) {
    let notes = _loadFromStorage()
    const note = notes.find(note => note.id === noteId)
    let { todos } = note.info
    const idx = todos.findIndex(todo => todo.id === todoId)
    todos.splice(idx, 1)
    _saveToStorage(notes)
    return Promise.resolve()

}

function addTodo(todo, noteId) {
    if (!noteId) return Promise.resolve(null)

    const notes = _loadFromStorage()
    const note = notes.find(note => note.id === noteId)
    const { todos } = note.info
    todos.unshift(todo)
    _saveToStorage(notes)
    return Promise.resolve(note)
}

function editTodo(txt, noteId, todoId) {
    if (!noteId) return Promise.resolve(null)

    const notes = _loadFromStorage()
    const note = notes.find(note => note.id === noteId)
    const { todos } = note.info
    const todo = todos.find(todo => todo.id === todoId)
    todo.txt = txt
    _saveToStorage(notes)
    return Promise.resolve(note)
}

function todoIsDone(checked, todoId, noteId) {
    if (!noteId) return Promise.resolve(null)

    const notes = _loadFromStorage()
    const note = notes.find(note => note.id === noteId)
    const { todos } = note.info
    const todo = todos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveToStorage(notes)
    return Promise.resolve(note)
}

function _creatTxtNote(txt, title) {
    return {
        id: utilService.makeId(5),
        type: 'note-txt',
        isPinned: false,
        info: {
            txt,
            title
        },
        backgroundColor: utilService.getRandomColor()
    }
}

function _creatImgNote(txt) {
    return {
        id: utilService.makeId(5),
        type: 'note-img',
        isPinned: false,
        info: {
            url: txt,
            title: 'My img'
        },
        backgroundColor: utilService.getRandomColor()
    }
}

function _creatTodoNote(txt, todos) {
    return {
        id: utilService.makeId(5),
        type: 'note-todos',
        isPinned: false,
        backgroundColor: utilService.getRandomColor(),
        info: {
            title: txt,
            todos
        }
    }
}

function _creatVideoNote(txt) {
    return {
        id: utilService.makeId(5),
        type: 'note-video',
        isPinned: false,
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