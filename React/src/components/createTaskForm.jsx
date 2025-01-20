//Import
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

//Inital Values for Task Create

const InitialValues = {
  name: "",
  description: "",
  dueDate: null,
  priority: {
    low: false,
    med: false,
    high: false,
  },
};

//User Schema
const userSchema = yup.object().shape({
  name: yup.string().required("This is required"),
  description: yup.string().required("This is required"),
});

//Form
const CreateTaskForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box m="20px">
      {/* Main Form Component*/}
      <Formik
        initialValues={InitialValues}
        validationSchema={userSchema}
        // On Submit handler
        onSubmit={(values, actions) => {
          console.log("formik on submit test", values);
          CreateTaskForm(values)
            .then(() => {
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
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          onSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={onSubmit}>
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
                /* slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person2OutlinedIcon />
                      </InputAdornment>
                    ),
                  },
                }} */
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
              {/* Date needs to be wrapped into MUI required wrappers. */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  fullWidth
                  variant="filled"
                  label="Due Date"
                  onBlur={handleBlur}
                  onChange={(newValue) => setFieldValue("dueDate", newValue)}
                  value={values.dueDate || null}
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
              </LocalizationProvider>
              {/* Radio Box to select priority of Task */}
              <FormControl>
                <RadioGroup
                  style={{ display: "flex", flexDirection: "row" }}
                  value={values.priority}
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
