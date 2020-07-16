const router = require("express").Router();
const controller = require("../controllers/databases_controller");

router.post('/databases', controller.create);
router.delete('/databases', controller.drop);
router.get('/databases', controller.list);

module.exports = router;