import Paper from "@mui/material/Paper";
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
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import { UserFormDialog } from "./form";
import { IUser } from "../store/usersSlice";

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

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "id",
      headerName: "No.",
      flex: 0.1,
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "username",
      headerName: "User Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fullName",
      headerName: "Full name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              setUserToEdit(params.row);
              setPopup(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => deleteUser(params.row._id!)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = users.map((user: IUser, i: number) => ({
    id: i + 1,
    _id: user._id,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    password: user.password,
  }));

  return (
    <>
      {popup && (
        <UserFormDialog
          onClose={() => {
            setPopup(false);
            setUserToEdit(null);
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
              {username ? username.split("")[0].toUpperCase() : "$"}
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
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeader": {
              bgcolor: "primary.main",
            },
            "& .MuiDataGrid-columnHeaders": {
              color: "white",
            },
            "& .MuiDataGrid-sortIcon": {
              color: "white", 
            },

            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            }, 
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          disableRowSelectionOnClick
          disableColumnMenu = {true}
          localeText={{
            toolbarDensity: 'Size',
            toolbarDensityLabel: 'Size',
            toolbarDensityCompact: 'Small',
            toolbarDensityStandard: 'Medium',
            toolbarDensityComfortable: 'Large',
          }}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Paper>
    </>
  );
};
