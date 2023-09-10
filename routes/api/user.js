const router = require("express").Router();

router.post('/login', (req, res) => {
    res.status(200);
    res.json({
        id: 1,
        mail: 'test@mail.ru'
    })
    res.end();
});

module.exports = router;