import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const EmailService = {
    query,
    getById,
    starClick,
    remove,
    markRead,
    sendEmail,
    createDraft,
    getUnreadEmails

}

const KEY = 'mailsDB'
const SENT_KEY = 'sentMailDB'
const DRAFT_KEY = 'draftDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const data = [
    {
        id: 'e1010',
        subject: 'Miss you!',
        body: `Would love to catch up sometimes, let me know next time you are in LA :)`,
        isRead: false,
        isImportant: false,
        sentAt: 1551133930594,
        to: 'tie_mary@gmail.com',
        isSent: false,
        isDraft: false
    },
    {
        id: 'e1012',
        subject: 'euroTrip',
        body: `Hi body, long time!
        Wanted to check in, we need to get everything set for europe!
        call me back ASAP
        `,
        isRead: true,
        isImportant: false,
        sentAt: 1551243930594,
        to: 'polly.andrwes@yahoo.com',
        isSent: false,
        isDraft: false
    },
    {
        id: 'e1013',
        subject: 'Don\'t miss the chance to win $20,000',
        body: `Hi ${loggedinUser.fullname}! Have you seen our latest prize money auction?!
                believe me, no would wont to miss this on!
                come check out the link below!
                https://www.calottery.com/draw-games/powerball`,
        isRead: false,
        isImportant: false,
        sentAt: 1551133510594,
        to: 'plarmo-elec@yahoo.com',
        isSent: false,
        isDraft: false
    },
    {
        id: 'e1014',
        subject: `lap top all set`,
        body: `Hi, good afternoon
        just wanted to let you know that the laptop for lonny\'s office is ready
        we still need wait for the icam part that we ordered 
        hope you are having a great day`,
        isRead: true,
        isImportant: false,
        sentAt: 1551133510594,
        to: 'pcLab@lemovo_IT.com',
        isSent: false,
        isDraft: false
    },
    {
        id: 'e1015',
        subject: 'Your Purchase has been approved!',
        body: `Thanks again for buying from the Amazoz store
        we are truly happy and thankful for you your purchase and supporting 
        local family owned businesses! 
        
        your order should be out and about in a few days! till then, best of wishes and have a wonderful day!`,
        isRead: false,
        isImportant: false,
        sentAt: 1551133510594,
        to: 'nick@amazoz_store.com',
        isSent: false,
        isDraft: false
    },
    {
        id: 'e1016',
        subject: `${loggedinUser.fullname} super urgent!`,
        body: `Hi, hope you are well
        we have newcomers this week.. do you mind taking them off my hands and show them around??
        I'd owe you bigggggg time body! 
        I have so much work to do, I can\'t even imagine myself stepping out of the office😫
        pls help!`,
        isRead: false,
        isImportant: false,
        sentAt: 1551133510594,
        to: 'chadRnD@lemovo.com',
        isSent: false,
        isDraft: false
    },
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

function remove(emailId) {
    let emails = _loadFromStorage()
    emails = emails.filter(email => email.id !== emailId)
    _saveToStorage(emails)
    return Promise.resolve(emails)
}

function markRead(emailId) {
    let emails = _loadFromStorage()
    const idx = emails.findIndex(email => email.id === emailId)
    emails[idx].isRead = !emails[idx].isRead
    console.log('emails:', emails[idx])
    _saveToStorage(emails)

    return Promise.resolve(emails)
}

function sendEmail(email) {
    const sentMail = _createEmail(email)
    let emails = _loadFromStorage()
    emails.push(sentMail)
    _saveToStorage(emails)

    return Promise.resolve(emails)

}

function getUnreadEmails(){
    let emails = _loadFromStorage()    
    const unreadList = emails.filter(email => !email.isRead)
       
    
    return Promise.resolve(unreadList.length)
}

function createDraft(to = 'No Entry', subject = 'No Entry', body = 'No Entry') {
    const newDraft = {
        id: utilService.makeId(),
        to,
        subject,
        body,
        isRead: true,
        sentAt: Date.now(),
        isImportant: false,
        isSent: false,
        isDraft: true
    }

    let emails = _loadFromStorage()
    emails.push(newDraft)
    _saveToStorage(emails)
    console.log('emails:', emails)

    return Promise.resolve(emails)
}

function _createEmail(email, date = Date.now()) {
    const newEmail = {
        id: utilService.makeId(),
        subject: email.subject,//email.subject,
        body: email.body,//email.body,
        isRead: email.isRead,
        sentAt: date,
        isImportant: false,
        to: email.to,
        isSent: email.isSent,
        isDraft: false
    }
    return newEmail
}

function starClick(id) {
    const emails = _loadFromStorage()
    const idx = emails.findIndex(email => email.id === id)
    emails[idx].isImportant = !emails[idx].isImportant

    _saveToStorage(emails)
    return Promise.resolve()

}

function _createEmails() {
    const emails = []

    for (let i = 0; i < data.length; i++) {
        const email = data[i]
        emails.push(_createEmail(email, email.sentAt))
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