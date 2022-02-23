const router = require("express").Router()
const { Thought, User } = require("../../Models")
//const { removeReaction } = require("../../controllers/thought-controller")


router.get("/", async (req, res) => {
  try {
    const allThoughts = await Thought.find({})
    res.json(allThoughts)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const user = await Thought.findById(req.params.id)
    res.json(user)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.post("/", async (req, res) => {
  try {
    const thoughtOwner = await User.findOne({ username: req.body.username })
    if (!thoughtOwner) {
      res.sendStatus(404)
      return
    }
    const newThought = await Thought.create(req.body)
    thoughtOwner.thoughts.push(newThought)
    await thoughtOwner.save()
    res.json(newThought)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.put("/:id", async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body)
    res.json(updatedThought)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const deletedInfo = await Thought.findByIdAndDelete(req.params.id)
    res.json(deletedInfo)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const updatedThought = await Thought.findById(req.params.thoughtId)
    updatedThought.reactions.push(req.body)
    await updatedThought.save()
    res.json(updatedThought.reactions[updatedThought.reactions.length - 1])
  }
  catch (error) {
    res.sendStatus(500)
  }
})

//router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction)

router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    const updatedThought = await Thought.findById(req.params.thoughtId)
    updatedThought.reactions=updatedThought.reactions.filter((reaction)=>{
      return reaction._id!=req.params.reactionId
    })
    await updatedThought.save()
    res.sendStatus(204)
  }
  catch (error) {
    res.sendStatus(500)
  }
})


module.exports = router