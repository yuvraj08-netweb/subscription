"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
  useTheme,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { BiCheck } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { buySubsciption } from "@/store/slices/paymentSlice";

const StyledCard = styled(Card)(({ theme, isPopular }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out",
  position: "relative",
  border: isPopular ? `2px solid ${theme.palette.primary.main}` : "none",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[4],
  },
}));

const PricingPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const plans = [
    {
      title: "Starter",
      price: "29",
      description: "Perfect for small businesses and startups",
      isPopular: false,
      features: [
        "Up to 5 team members",
        "Basic analytics",
        "24/7 support",
        "2GB storage space",
        "Custom domain",
        "API access",
      ],
    },
    {
      title: "Growth",
      price: "79",
      description: "Ideal for growing companies",
      isPopular: true,
      features: [
        "Up to 20 team members",
        "Advanced analytics",
        "Priority support",
        "10GB storage space",
        "Custom integrations",
        "Advanced security",
      ],
    },
    {
      title: "Enterprise",
      price: "199",
      description: "For large scale enterprises",
      isPopular: false,
      features: [
        "Unlimited team members",
        "Custom analytics",
        "Dedicated support",
        "Unlimited storage",
        "White-label solution",
        "Advanced security + backup",
      ],
    },
  ];
  
  const handlePlan = async (data) => {
    setOpen(true);
    setLoading(true);
    console.log(loading, "loading");

    const planData = {
      planName: data.title,
      amount: data.price,
    };

    dispatch(buySubsciption(planData))
      .unwrap()
      .then((res) => {
        setOpen(true);
        setLoading(false);
        router.push(res?.data?.url);
      })
      .catch((err) => {
        setOpen(true);
        setLoading(false);
        console.error(err);
      });
    console.log(loading, "loading");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Choose Your Perfect Plan
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Select the best plan that suits your needs
        </Typography>
      </Box>

      <Grid container spacing={4} alignItems="stretch">
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.title}>
            <StyledCard isPopular={plan.isPopular}>
              {plan.isPopular && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: -30,
                    transform: "rotate(45deg)",
                    backgroundColor: "primary.main",
                    color: "white",
                    px: 4,
                    py: 0.5,
                  }}
                >
                  Popular
                </Box>
              )}
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                  {plan.title}
                </Typography>
                <Typography
                  variant="h3"
                  component="p"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  ${plan.price}
                  <Typography
                    component="span"
                    variant="subtitle1"
                    sx={{ color: "text.secondary" }}
                  >
                    /month
                  </Typography>
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="subtitle1"
                  sx={{ mb: 3 }}
                >
                  {plan.description}
                </Typography>

                <List>
                  {plan.features.map((feature) => (
                    <ListItem key={feature} sx={{ py: 1 }}>
                      <ListItemIcon>
                        <BiCheck color={theme.palette.primary.main} size={24} />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>

                <Button
                  variant={plan.isPopular ? "contained" : "outlined"}
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  disabled={loading ? true : false}
                  aria-label={`Choose ${plan.title} plan`}
                  onClick={() => {
                    handlePlan(plan);
                  }}
                >
                 Choose Plan
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default PricingPage;
