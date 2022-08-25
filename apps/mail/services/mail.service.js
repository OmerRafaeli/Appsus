import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const EmailService = {
    query,
    getById,
    starClick,
    remove,
    markRead,

}

const KEY = 'mailsDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const data = [
    {
        id: 'e1010', 
        subject: 'Miss you!', 
        body: 'Would love to catch up sometimes', 
        isRead: false, 
        isImportant: false,
        sentAt : 1551133930594, 
        to: 'momo@momo.com'
    },
    {
        id: 'e1012', 
        subject: 'Kiss you!', 
        body: 'Would love to catch up sometimes', 
        isRead: true, 
        isImportant: false,
        sentAt : 1551243930594, 
        to: 'popo@momo.com'
    },
    {
        id: 'e1013', 
        subject: 'Why are you?', 
        body: 'Would love to catch up sometimes', 
        isRead: false, 
        isImportant: false,
        sentAt : 1551133510594, 
        to: 'toto@momo.com'
    },
    {
        id: 'e1014', 
        subject: 'Where are you?', 
        body: 'Would love to catch up sometimes', 
        isRead: true, 
        isImportant: false,
        sentAt : 1551133510594, 
        to: 'nono@momo.com'
    },
    {
        id: 'e1015', 
        subject: 'What are you?', 
        body: 'Would love to catch up sometimes', 
        isRead: false, 
        isImportant: false,
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
    const email = emails.find(email => email.id === emailId)
    return Promise.resolve(email)
}

function remove(emailId){
    let emails = _loadFromStorage()
    emails = emails.filter(email => email.id !== emailId)
    _saveToStorage(emails)
    return Promise.resolve(emails)
}

function markRead(emailId){
    let emails = _loadFromStorage()
    const idx = emails.findIndex(email => email.id === emailId)
    emails[idx].isRead = !emails[idx].isRead
    console.log('emails:', emails[idx])
    _saveToStorage(emails)
    
    return Promise.resolve(emails)
}

function _createEmail(email) {    
    const newEmail = {
        id: utilService.makeId(),
        subject: email.subject,//email.subject,
        body: email.body,//email.body,
        isRead: (utilService.getRandomIntInclusive(1, 100) >= 50) ? true : false, 
        sentAt: email.sentAt,
        isImportant: false,
        to: email.to
    }
    
    return newEmail
}

function starClick(id){
    const emails = _loadFromStorage()
    const idx = emails.findIndex(email => email.id === id)
    emails[idx].isImportant = !emails[idx].isImportant
    
    _saveToStorage(emails)
    return Promise.resolve()
    
}

function _createEmails(){
    const emails = []

    for (let i = 0; i < 5; i++) {
        const email = data[i]        
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