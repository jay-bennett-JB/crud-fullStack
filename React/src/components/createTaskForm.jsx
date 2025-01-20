//Import
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  Datefield,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import PhoneCallbackOutlinedIcon from "@mui/icons-material/PhoneCallbackOutlined";
import SuccessPage from "../scenes/form/success";
import { useHistory } from "react-router-dom";

//Inital Values for Task Create Form

const InitialValues = {
  name: "",
  description: "",
  dueDate: "",
  priority: {
    low: false,
    med: false,
    high: false,
  },
};

//User Schema
const userSchema = yup.object().shape({
  name: yup.object().required("This is required"),
  description: yup.object().required("This is required"),
});

//Form
const CreateTaskForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const history = useHistory();
  return (
    <Box m="20px">
      {/* Main Form Component*/}

      <Formik
        initialValues={InitialValues}
        validationSchema={userSchema}
        onSubmit={(values, actions) => {
          console.log("formik on submit test", values);
          CreateTaskForm(values)
            .then(() => {
              history.pushState("/success");
              console.log(values);
              actions.setSubmitting(false);
            })
            .catch((error) => {
              //preventing default form submission
              console.log("Error: ", error);
              actions.setSubmitting(false);
            });
        }}
      >
        {({ values, errors, touched, handleBlur, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& .div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* Name */}
              <TextField
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
                // slotProps={{
                //   input: {
                //     startAdornment: (
                //       <InputAdornment position="start">
                //         <Person2OutlinedIcon />
                //       </InputAdornment>
                //     ),
                //   },
                // }}
              />
              {/* Description*/}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Descriptopn"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
                // slotProps={{
                //   input: {
                //     startAdornment: (
                //       <InputAdornment position="start">
                //         <Person2OutlinedIcon />
                //       </InputAdornment>
                //     ),
                //   },
                // }}
              />

              {/* Due Date */}
              <Datefield
                fullWidth
                variant="filled"
                label="Due Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dueDate}
                name="dueDate"
                error={!!touched.dueDate && !!errors.dueDate}
                helperText={touched.dueDate && errors.dueDate}
                sx={{ gridColumn: "span 2" }}
                // slotProps={{
                //   input: {
                //     startAdornment: (
                //       <InputAdornment position="start">
                //         <AlternateEmailOutlinedIcon />
                //       </InputAdornment>
                //     ),
                //   },
                // }}
              />
              <FormControl>
                <RadioGroup
                  style={{ display: "flex", flexDirection: "row" }}
                  value={contactPreference}
                  name="priority"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    control={<Radio value="low" />}
                    label="Low"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    control={<Radio value="med" />}
                    label="Medium"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    control={<Radio value="high" />}
                    label="High"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box
              display="flex"
              justifyContent="end"
              mt="20px"
            >
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={state.submitting}
              >
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateTaskForm;
