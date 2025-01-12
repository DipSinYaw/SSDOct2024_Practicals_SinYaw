const User = require("../models/user");

const createUser = async (req, res) => {
  const newUser = req.body;
  try {
    const createdBook = await User.createUser(newUser);
    res.status(201).json(createdBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating book");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving users");
  }
};

const getUserById = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await User.getUserById(bookId);
    if (!book) {
      return res.status(404).send("User not found");
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user");
  }
};

const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const newUserData = req.body;

  try {
    const updateUser = await User.updateUser(userId, newUserData);
    if (!updateUser) {
      return res.status(404).send("User not found");
    }
    res.json(updateUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user");
  }
};

const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const success = await User.deleteUser(userId);
    if (!success) {
      return res.status(404).send("User not found");
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting User");
  }
};

const searchUsers = async (req, res) => {
  console.log("check now in: ");
  // async function searchUsers(req, res) {
  const searchTerm = req.query.searchTerm; // Extract search term from query params
  console.log("check: " + searchTerm);
  try {
    const users = await User.searchUsers(searchTerm);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching users" });
  }
};

async function getUsersWithBooks(req, res) {
  try {
    const users = await User.getUsersWithBooks();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users with books" });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUsers,
  getUsersWithBooks,
};
