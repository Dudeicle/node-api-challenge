const router = require("express").Router();

const productsRoute = require("../routers/projectRouters");

router.get("/", (req, res) => {
	res.status(200).json({ router: "api" });
});

router.use("/projects", productsRoute);

module.exports = router;
