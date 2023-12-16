//-------------------------------------------------------//
//  File Name: AddNewForm.jsx
//  Description: Form to Add New Database Item
//
//  Parents:
//      - Database.jsx
//
//  Returns:
//      - Add New Item Form
//
// Created By: Corey Yang-Smith
// Date: September 24rd, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import React from "react";

// MUI Imports
import { Autocomplete } from "@mui/material/";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

// React Hook Form
import { useForm, Controller } from "react-hook-form";

// API Import
import { getRequest, postRequest } from "../../api/authenticated";

// Custom Hooks
import useToken from "../../hooks/useToken.js";
import { useMainCategory } from "../../hooks/useMainCategory";
import { useSubCategory } from "../../hooks/useSubCategoryAll.js";
import { useEntities } from "../../hooks/useEntities.js";

// Day JS/Date Picker
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Toast Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//  GLOBALS & INITIALIZATION
//-------------------------------------------------------//

//  MAIN FUNCTION
//-------------------------------------------------------//

const AddNewForm = (props) => {
  // Custom Hooks
  const { token } = useToken();

  const { mainCategories } = useMainCategory(); //cannot create new
  const { subCategories } = useSubCategory(); //cannot create new
  const { entities } = useEntities(); //able to create new

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm();

  // Utility
  const onSubmit = async (FieldValues) => {
    try {
      // Axios Post
      await postRequest("entrys/", FieldValues, token);
      const newData = await getRequest("entrys/", token);
      const cleanData = props.processData(newData.data);
      props.setEntries(cleanData);

      toast.success(FieldValues.name + " entry saved successfully!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      if (err.response) {
        // Not in 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
      toast.error("Unknown error occured.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    reset();
    await new Promise((resolve) => setTimeout(resolve, 250));
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        data.created_at = "";
        data.updated_at = "";
        //data.user = 106; //TODO get user
        onSubmit(data);
      })}
    >
      <div id="new-form"></div>

      <Stack spacing={2} marginTop={2} fullwidth="true">
        <h3>Add New Entry</h3>
        <a id="new-form"></a>
        {/* Date */}
        <Controller
          control={control}
          name="date"
          defaultValue=""
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Entry Date"
                required
                placeholderText="Select date"
                onChange={(date) =>
                  field.onChange(dayjs(date.$d).format("YYYY-MM-DD"))
                }
                selected={field.value}
              />
            </LocalizationProvider>
          )}
        />

        {/* Company (Router) */}
        <Controller
          control={control}
          name="routing"
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              onChange={(event, item) => {
                onChange(item);
              }}
              value={value}
              options={entities}
              freeSolo
              defaultValue=""
              getOptionLabel={(item) => (item.name ? item.name : "")}
              getOptionSelected={(option, value) =>
                value === undefined || value === "" || option.id === value.id
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Company/Entity"
                  margin="normal"
                  variant="outlined"
                  defaultValue=""
                  error={!!errors.item}
                  helperText={errors.item && "item required"}
                  required
                />
              )}
            />
          )}
        />

        {/* Name + Notes */}
        <Stack direction="row" spacing={2}>
          {/* Name */}
          <TextField
            {...register("name", {
              required: "Name is required",
            })}
            placeholder="Enter Item Name"
            fullWidth
          />
          {errors.name && <p>{`${errors.name.message}`}</p>}

          {/* Notes (show on hover?) */}
          <TextField
            {...register("notes", {
              required: "Notes is required",
            })}
            placeholder="Enter Note"
            fullWidth
          />
          {errors.notes && <p>{`${errors.notes.message}`}</p>}
        </Stack>

        {/* Main Category */}
        <Controller
          control={control}
          name="main_category"
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              onChange={(event, item) => {
                onChange(item);
              }}
              value={value}
              options={mainCategories}
              defaultValue=""
              getOptionLabel={(item) => (item.name ? item.name : "")}
              getOptionSelected={(option, value) =>
                value === undefined || value === "" || option.id === value.id
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Main Category"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.item}
                  helperText={errors.item && "item required"}
                  required
                />
              )}
            />
          )}
        />

        {/* Sub Category */}
        <Controller
          control={control}
          name="sub_category"
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              onChange={(event, item) => {
                onChange(item);
              }}
              value={value}
              options={subCategories}
              defaultValue=""
              getOptionLabel={(item) =>
                item.name
                  ? item.name + " (" + item.main_category.name + ")"
                  : ""
              }
              getOptionSelected={(option, value) =>
                value === undefined || value === "" || option.id === value.id
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Sub Category"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.item}
                  helperText={errors.item && "item required"}
                  required
                />
              )}
            />
          )}
        />

        {/* Income */}
        <TextField
          {...register("income", {
            required: "Income is required",
          })}
          placeholder="Enter Income"
          fullWidth
        />
        {errors.income && <p>{`${errors.income.message}`}</p>}

        {/* Expense */}
        <TextField
          {...register("expense", {
            required: "Expense is required",
          })}
          placeholder="Enter Expense"
          fullWidth
        />
        {errors.sub_cateogry && <p>{`${errors.sub_cateogry.message}`}</p>}
      </Stack>
      <Button fullWidth variant="outlined" sx={{ marginTop: 3 }} type="submit">
        Submit
      </Button>
      <ToastContainer />
    </form>
  );
};

//  EXPORTS
//-------------------------------------------------------//

export default AddNewForm;
