const { default: mongoose } = require("mongoose");
const NotesModel = require("../model/NotesModel");

exports.createNotes = async (req, res) => {
  const user = req.user;
  console.log(user.id);
  console.log(req.body);

  const { title, text, category, status, deadline } = req.body;
  try {
    const newNotes = await NotesModel({
      title: title,
      text: text,
      category: category,
      status: status,
      deadline: deadline ? new Date(deadline) : null,
      owner: user._id,
    }); //
    const savenote = await newNotes.save();
    res.status(201).json(savenote); //{message: "note created"}
    // .send(savenote); //sending as a response
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getallNotes = async (req, res) => {
  const user = req.user;
  // console.log(user.id);
  try {
    const notes = await NotesModel.find({ owner: user._id }); //
    res.json({ notes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.readbyId = async (req, res) => {
  try {
    const note = await NotesModel.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "cannot find notes" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editNotes = async (req, res) => {
  const user = req.user;
  const { title, text, category, status, deadline } = req.body;
  const noteId = req.params.id;
  const useraccount = await NotesModel.findById(req.params.id);
  if (useraccount.owner.toString() !== user._id.toString()) {
    return res
      .status(401)
      .json({ message: "Unauthorized access, invalid user" });
  }
  try {
    // console.log("incoming", text, "noteid", noteId);
    const updateNotes = await NotesModel.findByIdAndUpdate(
      noteId,
      {
        title: title,
        text: text,
        category: category,
        status: status,
        deadline,
      },
      { new: true }
    );
    if (!updateNotes) {
      return res.status(404).json({ message: "cannot find notes" });
    }

    res.json(updateNotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNotes = async (req, res) => {
  const user = req.user;
  const accountUser = await NotesModel.findById(req.params.id);
  if (accountUser.owner.toString() !== user._id.toString()) {
    res.status(401).json({ message: "Unauthorized access, invalid user" });
  }
  try {
    const deleteNotebyId = await NotesModel.findByIdAndDelete(req.params.id);
    if (!deleteNotebyId) {
      return res.status(404).json({ message: "cannot find notes" });
    }
    res.json({ message: "note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
