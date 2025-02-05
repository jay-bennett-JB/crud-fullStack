import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { tokens } from "../themes";
import { getSingleTask } from "../api";

//View Task
const SingleTaskView = ({ taskID }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // useEffect() and useState()
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskID) {
        setError("No Task ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fetchedTask = await getSingleTask(taskID); // Fetch the task by taskID
        setTask(fetchedTask); // Set task data
      } catch (error) {
        setError("Failed to fetch task", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskID]);

  if (error) {
    return <div>{error}</div>;
  }
  const rows = task
    ? [
        {
          id: taskID,
          taskID: task.taskID,
          name: task.name,
          description: task.description,
          dueDate: task.dueDate,
          priority: task.priority,
        },
      ]
    : [];
  const columns = [
    {
      field: "taskID",
      headerName: "Task ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      flex: 1,
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>{params.row.priority}</Typography>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="50vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default SingleTaskView;
