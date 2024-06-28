const express = require("express");
const noteService = require("./note.service")

const router = express.Router();

// GET /api/note
router.get("/api/note", async (req, res) => {
    // #swagger.tags = ['Note']
    try {
      params = JSON.parse(req.headers['params'])
  
      let paginated = await noteService.paginated(params)
      return res.status(200).send(paginated);
  
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }
});

// GET /api/note/:id
router.get("/api/note/:id",  async (req, res) => {
    // #swagger.tags = ['Note']
    try {
        const noteId = req.params.id;
        const note = await taskService.findOneById(noteId);
        return res.status(200).send(note);
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
  });


// POST /api/note
router.post("/api/note", async(req, res) => {
    try {
        const newNote = req.body;
        console.log(newNote);
        const note = await noteService.save(newNote);
        return res.status(201).send(note);        
    }
    catch(err) {
        console.log(err)
        res.status(503).send(err)
    }
})

// PUT /api/note/:id
router.put("/api/note/:id",  async (req, res) => {
    // #swagger.tags = ['Note']
    try {
      const noteId = req.params.id;
      const updateNote = req.body;
      const project = await noteService.update(noteId, updateNote);
      return res.status(200).send(project);
  
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
})
  
  // DELETE /api/note/:id
  router.delete("/api/note/:id", async (req, res) => {
    // #swagger.tags = ['Note']
    try {
        const noteId = req.params.id;
        await noteService.remove(noteId);
        return res.status(200).send("Nota eliminada correctamente.");
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
})
  

module.exports = router;