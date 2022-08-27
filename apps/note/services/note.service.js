import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const noteService = {
    query,
    getNoteById,
    removeNote,
    createNote,
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
            title: 'you got this!',
            txt: 'Fullstack Me Baby!'
        },
        backgroundColor: _setRandomNoteColor()
    },
    {
        id: utilService.makeId(5),
        type: 'note-img',
        isPinned: true,
        info: {
            url: 'https://myandroidwalls.com/wp-content/uploads/2021/07/Cool-Android-Wallpaper-4k-576x1024.jpg',
            title: 'Bobi and Me'
        },
        backgroundColor: _setRandomNoteColor()
    },
    {
        id: utilService.makeId(5),
        type: 'note-todos',
        isPinned: true,
        backgroundColor: _setRandomNoteColor(),
        info: {
            title: 'WorkOut routine',
            todos: [{
                id: utilService.makeId(5),
                txt: '15 pushups',
                isDone: false,
                doneAt: null
            },
            {
                id: utilService.makeId(5),
                txt: '15 reps back lift X 2',
                isDone: false,
                doneAt: null
            },
            {
                id: utilService.makeId(5),
                txt: 'veggies',
                isDone: false,
                doneAt: null
            },
            {
                id: utilService.makeId(5),
                txt: '15 reps front row X 2',
                isDone: false,
                doneAt: null
            },
            {
                id: utilService.makeId(5),
                txt: '25 min jumpRope',
                isDone: false,
                doneAt: null
            },
            ]
        }
    },
    {
        id: utilService.makeId(5),
        type: 'note-txt',
        isPinned: false,
        info: {
            txt: 'next time I want to make pizza... Don\'t🤣',
            title: 'pizzaaaaaa',
        },
        backgroundColor: _setRandomNoteColor()
    },
    {
        id: utilService.makeId(5),
        type: 'note-img',
        isPinned: false,
        info: {
            url: 'https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1://some-img/me',
            title: 'Bobi and Me'
        },
        backgroundColor: _setRandomNoteColor()
    },
    {
        id: utilService.makeId(5),
        type: 'note-todos',
        isPinned: true,
        backgroundColor: _setRandomNoteColor(),
        info: {
            title: 'year\'s resolution',
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
            }
            ]
        }
    },
    {
        id: utilService.makeId(5),
        type: 'note-todos',
        isPinned: false,
        backgroundColor: _setRandomNoteColor(),
        info: {
            title: 'groceries',
            todos: [{
                id: utilService.makeId(5),
                txt: 'milk',
                isDone: false,
                doneAt: null
            },
            {
                id: utilService.makeId(5),
                txt: 'eggs',
                isDone: true,
                doneAt: 187111111
            },
            {
                id: utilService.makeId(5),
                txt: 'veggies',
                isDone: false,
                doneAt: 187111111
            },
            {
                id: utilService.makeId(5),
                txt: 'cheese',
                isDone: true,
                doneAt: 187111111
            },
            {
                id: utilService.makeId(5),
                txt: 'meet and chicken',
                isDone: true,
                doneAt: 187111111
            },
            ]
        }
    },
    {
        id: utilService.makeId(5),
        type: 'note-todos',
        isPinned: false,
        backgroundColor: _setRandomNoteColor(),
        info: {
            title: 'long term!',
            todos: [{
                id: utilService.makeId(5),
                txt: 'learn to swim',
                isDone: false,
                doneAt: null
            },
            {
                id: utilService.makeId(5),
                txt: 'travel more',
                isDone: true,
                doneAt: 187111111
            },
            {
                id: utilService.makeId(5),
                txt: 'wake up for for practice',
                isDone: true,
                doneAt: 187111111
            },
            ]
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
        backgroundColor: _setRandomNoteColor()
    },
    {
        id: utilService.makeId(5),
        type: 'note-video',
        isPinned: false,
        info: {
            url: 'https://www.youtube.com/embed/zwedcTK9m98',
            title: 'Bobi and Me'
        },
        backgroundColor: _setRandomNoteColor()
    },
    {
        id: utilService.makeId(5),
        type: 'note-video',
        isPinned: false,
        info: {
            url: 'https://www.youtube.com/embed/QbrorVyH4mk',
            title: 'Bobi and Me'
        },
        backgroundColor: _setRandomNoteColor()
    },
]

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

function createNote(type, backgroundColor, txt, title = '', todos) {
    let note
    switch (type) {
        case 'note-txt':
            // console.log('type:', type)
            note = _createTxtNote(txt, title, backgroundColor)
            break
        case 'note-img':
            note = _createImgNote(txt, backgroundColor)
            break
        case 'note-todos':
            note = _createTodoNote(txt, todos, backgroundColor)
            break
        case 'note-video':
            note = _createVideoNote(txt, backgroundColor)
            break
        case 'note-canvas':
            note = _createCanvasNote(txt, backgroundColor)
            break
        case 'note-map':
            note = _createMapNote(txt, backgroundColor)
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

function _createTxtNote(txt, title, backgroundColor) {
    return {
        id: utilService.makeId(5),
        type: 'note-txt',
        isPinned: false,
        info: {
            txt,
            title
        },
        backgroundColor
    }
}

function _createImgNote(txt, backgroundColor) {
    return {
        id: utilService.makeId(5),
        type: 'note-img',
        isPinned: false,
        info: {
            url: txt,
            title: 'My img'
        },
        backgroundColor
    }
}

function _createTodoNote(txt, todos = [], backgroundColor) {
    console.log('todos:', todos)
    return {
        id: utilService.makeId(5),
        type: 'note-todos',
        isPinned: false,
        backgroundColor,
        info: {
            title: txt,
            todos: todos
        }
    }
}

function _createVideoNote(txt, backgroundColor) {
    return {
        id: utilService.makeId(5),
        type: 'note-video',
        isPinned: false,
        info: {
            url: txt,
            title: 'My video'
        },
        backgroundColor
    }
}

function _createCanvasNote(txt, backgroundColor) {
    return {
        id: utilService.makeId(5),
        type: 'note-canvas',
        isPinned: false,
        info: {
            txt,

        },
        backgroundColor
    }
}

function _createMapNote(txt, backgroundColor){
    return {
        id: utilService.makeId(5),
        type: 'note-map',
        isPinned: false,
        info: {
            txt,

        },
        backgroundColor
    }
}

function _setRandomNoteColor() {
    const colors = [
        'rgb(237 122 122)',
        'rgb(213, 114, 243)',
        'rgb(155, 114, 243)',
        'rgb(114, 161, 243)',
        'rgb(114, 243, 222)',
        'rgb(151, 243, 114)',
        'rgb(243, 193, 114)',
        'rgb(245 236 77)'
    ]

    const color = colors[utilService.getRandomIntInclusive(0, 7)]
    return color

}

function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}