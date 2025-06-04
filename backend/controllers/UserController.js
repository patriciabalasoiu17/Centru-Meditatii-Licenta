// controllers/UsersController.js
import { clerkClient, requireAuth } from "@clerk/express";

export const getUsers = async (req, res) => {
  try {
    const users = await clerkClient.users.getUserList();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await clerkClient.users.getUser(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const getUsersWithoutRole = async (req, res) => {
  try {
    const users = await clerkClient.users.getUserList();
    const usersWithoutRole = users.data.filter(
      (user) => !user.publicMetadata || !user.publicMetadata.role
    );

    res.status(200).json(usersWithoutRole);
  } catch (error) {
    console.error("Error fetching users without role:", error);
    res.status(500).json({ error: "Failed to fetch users without role" });
  }
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body; // e.g., "student" or "profesor"

  if (!["student", "profesor", ""].includes(role)) {
    return res.status(400).json({ error: "Invalid role specified." });
  }

  try {
    const updatedUser = await clerkClient.users.updateUserMetadata(id, {
      publicMetadata: {
        role,
      },
    });

    res
      .status(200)
      .json({ message: `Role updated to ${role}`, user: updatedUser });
  } catch (error) {
    console.error(`Error updating role for user ${id}:`, error);
    res.status(500).json({ error: "Failed to update user role" });
  }
};

export const removeUserRole = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await clerkClient.users.updateUserMetadata(id, {
      publicMetadata: {
        role: null, // sau omite cheia complet
      },
    });

    res.status(200).json({ message: "Rolul a fost șters.", user: updatedUser });
  } catch (error) {
    console.error(
      `Eroare la ștergerea rolului pentru utilizatorul ${id}:`,
      error
    );
    res.status(500).json({ error: "Nu s-a putut șterge rolul." });
  }
};
