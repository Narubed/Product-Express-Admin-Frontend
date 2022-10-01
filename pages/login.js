// @mui
import { styled } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";

import { LoginForm } from "@/components/features/form";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import bgimage from "~/public/product-express/login/bglogin3.png";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    backgroundImage: `url(${bgimage.src})`,
    backgroundSize: "cover",
    height: "100vh",
    padding: 5,
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 560,
  margin: "auto",
  minHeight: "90vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#FFFFFF", fontSize: "18px" }}
          >
            ยินดีต้อนรับสู่
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              mb: 5,
              color: "#FFFFFF",
              fontSize: "18px",
            }}
          >
            ระบบจัดการข้อมูล POS.
          </Typography>
          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
