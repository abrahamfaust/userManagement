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
        component="form"
        onSubmit={handleLogin}
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
        <Typography color="info" variant="h3" align="center">
          welcome
        </Typography>
        <Typography color="info" variant="h6" align="center">
          Please login to continue
        </Typography>
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          fullWidth
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button
          variant="contained"
          type="submit"
          color="primary"
          fullWidth
          disabled={inPrgress}
        >
          {inPrgress ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </Box>
    </Box>
  );
};
