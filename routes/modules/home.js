const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// Setting home page routers
router.get('/', (req, res ) => {
    const userId = req.user._id
    Restaurant.find({ userId })
        .lean()
        .sort({ name: 'asc' })
        .then((restaurantsData) => {
            console.log(restaurantsData)
            res.render('index', {restaurantsData})
        })
})

// 使用者可以搜尋餐廳
router.get('/search', (req, res) => {
    if (!req.query.keyword) {
        return res.redirect('/')
    }
    const keyword = req.query.keyword.trim()
    const userId = req.user._id
    Restaurant.find({ userId })
        .lean()
        .sort({ name: 'asc' })
        .then(restaurantsData => {
        const filterRestaurantsData = restaurantsData.filter(
            data =>
            data.name.toLowerCase().includes(keyword.toLowerCase()) ||
            data.category.toLowerCase().includes(keyword.toLowerCase())
        )
        res.render("index", { restaurantsData: filterRestaurantsData, keyword })
        })
        .catch(err => console.log(err))
})

module.exports = router