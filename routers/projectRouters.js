const express = require("express");

const ProjectDb = require("../data/helpers/projectModel");
const ActionDb = require("../data/helpers/actionModel");

const router = express.Router();

// ALL PROJECT ROUTERS

router.get("/", (req, res) => {
	ProjectDb.get(req.params.id)
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: "error retrieving the userss" });
		});
}); // WORKING
router.get("/:id", (req, res) => {
	ProjectDb.get(req.params.id)
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: "error retrieving the userss" });
		});
}); // WORKING
router.get("/:id/actions", (req, res) => {
	ProjectDb.getProjectActions(req.params.id)
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: "error retrieving the project actions" });
		});
}); // WORKING
router.post("/", (req, res) => {
	let project = req.body;
	ProjectDb.insert(project)
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((error) => {
			res.status(500).json({ message: "Project Post did not work!" });
		});
}); // WORKING
router.delete("/:id", (req, res) => {
	ProjectDb.remove(req.params.id)
		.then((result) => {
			res.status(201).json({ message: "Project has been nuked from orbit!" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Project could not be deleted!" });
		});
}); // WORKING
router.put("/:id", (req, res) => {
	let updatedProject = req.body;

	ProjectDb.get(req.params.id)
		.then((target) => {
			if (!updatedProject.name || !updatedProject.description) {
				res.status(400).json({
					errorMessage: "Please provide valid name and description of project",
				});
			} else {
				try {
					ProjectDb.update(req.params.id, updatedProject)
						.then((result) => {
							res.status(200).json(result);
						})
						.catch((error) => {
							res.status(500).json({ error: "Project could not be edited" });
						});
					res.status(201).json(updatedProject);
				} catch {
					res.status(500).json({
						error: "There was an error while trying to update this project",
					});
				}
			}
		})
		.catch((error) => {
			res.status(404).json({ message: "Project could not be found" });
		});
}); // WORKING

// ALL ACTION ROUTERS

router.get("/:id/action/:id", (req, res) => {
	ActionDb.get(req.params.id)
		.then((action) => {
			res.status(200).json(action);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: "error retrieving the project actions" });
		});
}); // WORKING
router.post("/:id/action", (req, res) => {
	let newAction = req.body;

	if (!newAction.description || !newAction.notes) {
		res
			.status(400)
			.json({ message: "Please provide valid a description and title" });
	} else {
		try {
			ActionDb.insert(newAction, req.params.id)
				.then((result) => {
					res.status(200).json(result);
				})
				.catch((error) => {
					res.status(500).json({ message: "Action post failed!" });
				});
		} catch {
			res.status(500).json({
				error: "There was an error while saving the action to the database",
			});
		}
	}
}); // WORKING
router.put("/:id/action/:id", (req, res) => {
	let updatedAction = req.body;

	if (!updatedAction.description || !updatedAction.notes) {
		res
			.status(400)
			.json({ message: "Please provide valid a description and title" });
	} else {
		try {
			ActionDb.get(req.params.id)
				.then((action) => {
					ActionDb.update(action.id, updatedAction)
						.then((result) => {
							res.status(200).json(result);
						})
						.catch((error) => {
							res.status(500).json({ message: "Action update failed!" });
						});
				})
				.catch((error) => {
					console.log(error);
					res
						.status(500)
						.json({ message: "error retrieving the project actions" });
				});
		} catch {
			res.status(500).json({
				error:
					"There was an error while saving the updated action to the database",
			});
		}
	}
}); // WORKING
router.delete("/:id/action/:id", (req, res) => {
	ActionDb.remove(req.params.id)
		.then((result) => {
			res.status(200).json({ message: "Action was nuked from orbit!" });
		})
		.catch((error) => {
			res.status(404).json({ message: "Could not find action to delete" });
		});
}); // WORKING!

module.exports = router;
