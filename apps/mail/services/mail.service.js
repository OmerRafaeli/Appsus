import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const emailService = {
    query,
    getById,
    // remove,

}

const KEY = 'mailsDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const emails = [
    {
        id: 'e1010', 
        subject: 'Miss you!', 
        body: 'Would love to catch up sometimes', 
        isRead: false, 
        sentAt : 1551133930594, 
        to: 'momo@momo.com'
    },
    {
        id: 'e1012', 
        subject: 'Kiss you!', 
        body: 'Would love to catch up sometimes', 
        isRead: true, 
        sentAt : 1551243930594, 
        to: 'popo@momo.com'
    },
    {
        id: 'e1013', 
        subject: 'Why are you?', 
        body: 'Would love to catch up sometimes', 
        isRead: false, 
        sentAt : 1551133510594, 
        to: 'toto@momo.com'
    },
    {
        id: 'e1014', 
        subject: 'Where are you?', 
        body: 'Would love to catch up sometimes', 
        isRead: true, 
        sentAt : 1551133510594, 
        to: 'nono@momo.com'
    },
    {
        id: 'e1015', 
        subject: 'What are you?', 
        body: 'Would love to catch up sometimes', 
        isRead: false, 
        sentAt : 1551133510594, 
        to: 'koko@momo.com'
    }
]

function query() {
    let emails = _loadFromStorage()
    if (!emails) {
        emails = _createEmails()
        _saveToStorage(emails)
    }

    return Promise.resolve(emails)
}

function getById(emailId) {
    if (!emailId) return Promise.resolve(null)
    const emails = _loadFromStorage()
    const email = emails.find(email => emailId === email.id)
    return Promise.resolve(email)
}

// function remove(emailId){
//     let email = _loadFromStorage()
//     emails = emails.filter(email => emailId !== email.id)
//     _saveToStorage()
//     return Promise.resolve()
// }

function _createEmail(email) {
    const newEmail = {
        id: utilService.makeId(),
        subject: utilService.makeLorem(3),//email.subject,
        body: utilService.makeLorem(10),//email.body,
        isRead: (utilService.getRandomIntInclusive(1, 100) >= 50) ? true : false, 
        sentAt: Date.now(),
        to: 'momo@momo.com'
    }
    
    return newEmail
}

function _createEmails(){
    const emails = []

    for (let i = 0; i < 5; i++) {
        const email = emails[utilService.getRandomIntInclusive(0, emails.length - 1)]
        emails.push(_createEmail(email))
    }
    console.log('data:', emails)
    return emails
}

function _saveToStorage(emails) {
    storageService.saveToStorage(KEY, emails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}