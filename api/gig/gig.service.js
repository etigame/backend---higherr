const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')


async function query(filterBy) {
    try {
        const criteria = {}

        const collection = await dbService.getCollection('gig')
        var gigs = await collection.find(criteria).toArray()
        return gigs
    } catch (err) {
        logger.error('cannot find gigs', err)
        throw err
    }
}

async function getById(gigId) {
    try {
        const collection = await dbService.getCollection('gig')
        const gig = collection.findOne({ _id: ObjectId(gigId) })
        return gig
    } catch (err) {
        logger.error(`while finding gig ${gigId}`, err)
        throw err
    }
}

async function remove(gigId) {
    try {
        const collection = await dbService.getCollection('gig')
        await collection.deleteOne({ _id: ObjectId(gigId) })
        return gigId
    } catch (err) {
        logger.error(`cannot remove gig ${gigId}`, err)
        throw err
    }
}

async function add(gig) {
    try {
        const collection = await dbService.getCollection('gig')
        const addedGig = await collection.insertOne(gig)
        return addedGig
    } catch (err) {
        logger.error('cannot insert gig', err)
        throw err
    }
}

async function update(gig) {
    try {
        var id = ObjectId(gig._id)
        var temp = gig._id
        delete gig._id
        const collection = await dbService.getCollection('gig')
        await collection.updateOne({ _id: id }, { $set: { ...gig } })
        gig._id = temp
        return gig
    } catch (err) {
        logger.error(`cannot update gig ${gig._id}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}