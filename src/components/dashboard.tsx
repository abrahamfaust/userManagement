import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useUsers } from "../hooks/useUsers";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { UserFormDialog } from "./form";

interface Column {
  id: "username" | "fullName" | "email" | "actions";
  label: string;
}

const columns: readonly Column[] = [
  { id: "username", label: "User Name" },
  { id: "fullName", label: "Full Name" },
  { id: "email", label: "Email" },
  { id: "actions", label: "Actions" },
];

export const Dashboard = () => {
  const {
    users,
    username,
    handleLogout,
    addUser,
    deleteUser,
    editUser,
    popup,
    setPopup,
    setUserToEdit,
    userToEdit,
    inProgress,
  } = useUsers();

  return (
    <>
      {popup && (
        <UserFormDialog
          onClose={() => {
            setPopup(false)
            setUserToEdit(null)
          }}
          onSave={userToEdit ? editUser : addUser}
          open={popup}
          userToEdit={userToEdit}
        />
      )}
      <Box>
        <AppBar position="static" sx={{ background: "lightgray" }}>
          <Toolbar>
            <Avatar sx={{ mr: 1 }}>
              {username
                ? username.split("")[0].toUpperCase()
                : "$"}
            </Avatar>

            <Typography
              variant="h6"
              component="div"
              color="info"
              sx={{ flexGrow: 1 }}
            >
              {username}
            </Typography>
            {inProgress && <CircularProgress size={24} color="inherit" />}

            <Button onClick={handleLogout} variant="contained">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Typography
        variant="h4"
        align="center"
        color="info"
        sx={{ width: "90%", m: "auto", mt: 2 }}
      >
        <Button
          onClick={() => setPopup(true)}
          variant="contained"
          sx={{ float: "left" }}
        >
          Add User
        </Button>
        Users Table
      </Typography>
      <Paper
        sx={{
          width: "90%",
          height: "100%",
          overflow: "hidden",
          m: "auto",
          mt: 1,
        }}
      >
        <TableContainer sx={{ maxHeight: "70vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{ background: "lightgray", textAlign: "center" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.map((user, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {columns.map((column) => {
                        return (
                          <TableCell
                            key={column.id}
                            sx={{ textAlign: "center" }}
                          >
                            {column.id === "actions" ? (
                              <>
                                <IconButton
                                  onClick={() => {
                                    setUserToEdit(user);
                                    setPopup(true);
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  color="error"
                                  onClick={() => deleteUser(user._id!)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            ) : (
                              user[column.id]
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
