import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";
import { useLogin } from "../hooks/useLogin";

export const Login = () => {
  const {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
    error,
    inPrgress
  } = useLogin();

  return (
    <Box
      sx={{
        margin:0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", 
        bgcolor: "#f5f5f5", 
      }}
    >
      <Box
        component="section"
        sx={{
          p: 3,
          width: 300,
          borderRadius: 2,
          bgcolor: "#fff",
          boxShadow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography color="info" variant="h5" align="center">
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          disabled={inPrgress}
        >
          {inPrgress ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </Box>
    </Box>
  );
};
