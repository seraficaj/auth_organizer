let express = require("express");
let db = require("../models");
let router = express.Router();

// POST /projects - create a new project
router.post("/", async(req, res) => {
    try {
        const [newProject, newProjectCreated] = await db.project.findOrCreate({
            where: {
                name: req.body.name,
                githubLink: req.body.githubLink,
                deployLink: req.body.deployedLink,
                description: req.body.description,
            }
        });
        const [category, categoryCreated] = await db.category.findOrCreate({
            where: {
                name: req.body.category,
            },
        });
        await newProject.addCategory(category);
        res.redirect("/");
    } catch (err) {
        console.log("err", err);
    }
});

// GET /projects/new - display form for creating a new project
router.get("/new", (req, res) => {
    res.render("projects/new");
});

// GET /projects/:id - display a specific project
router.get("/:id", async (req, res) => {
    try {
        const foundProject = await db.project.findOne({
            where: { id: req.params.id },
            include: [db.category]
        });
        console.log(`foundProject`, foundProject.categories);
        res.render("projects/show", {project: foundProject});
    } catch (error) {
        res.status(400).render("main/404");
    }
});

// PUT route for editing
router.put("/:id", async (req, res) => {
  try {
      const foundProject = await db.project.findOne({
          where: {
            id: req.params.id
          }
      });
      foundProject.update({
        name: req.body.name,
        githubLink: req.body.githubLink,
        deployLink: req.body.deployedLink,
        description: req.body.description,
      });
      await foundProject.save();
      res.redirect(`/projects/${req.params.id}`);
  } catch (err) {
      console.log("err", err);
  }
});

// GET edit form
router.get("/edit/:id", async (req, res) => {
  try {
      const foundProject = await db.project.findOne({
          where: { id: req.params.id },
          include: [db.category]
      });
      console.log(`foundProject`, foundProject.categories);
      res.render("projects/edit", {project: foundProject});
  } catch (error) {
      res.status(400).render("main/404");
  }
});

router.delete("/:id", async (req,res ) => {
  try {
    const foundProject = await db.project.findOne({
      where: { id: req.params.id },
    });
    await foundProject.destroy();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;
