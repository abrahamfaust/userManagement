import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { IUser } from "../store/usersSlice";

interface UserFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: IUser) => void;
  userToEdit?: IUser | null; // Pass null for adding a new user
}

export const UserFormDialog: React.FC<UserFormDialogProps> = ({
  open,
  onClose,
  onSave,
  userToEdit,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userToEdit) {
      setUsername(userToEdit.username);
      setEmail(userToEdit.email);
      setFullName(userToEdit.fullName);
      setPassword(userToEdit.password || ""); // Leave empty for editing
    } else {
      setUsername("");
      setEmail("");
      setPassword("");
      setFullName("");
    }
  }, [userToEdit]);

  const handleSave = async () => {
    if (!username || !email || !fullName || (!userToEdit && !password)) {
      setError("All fields are required");
      return;
    }
    const user: IUser = {
      _id: userToEdit?._id,
      username,
      email,
      password,
      fullName,
    };
    onSave(user);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{userToEdit ? "Edit User" : "Add User"}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: 400 }}
      >
        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Full Name"
          fullWidth
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!!userToEdit}
        />
      </DialogContent>
      {error && <Alert severity="error">{error}</Alert>}

      <DialogActions>
        <Button onClick={onClose} sx={{}}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
