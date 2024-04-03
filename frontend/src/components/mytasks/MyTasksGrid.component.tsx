import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import { IMyTask } from "../../types/global.typing";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Name", width: 100 },
  { field: "content", headerName: "Content", width: 300 },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 100,
    renderCell: (params) => moment(params.row.startDate).format("DD-MM-YYYY"),
  },
  {
    field: "endDate",
    headerName: "End Date",
    width: 100,
    renderCell: (params) => moment(params.row.endDate).format("DD-MM-YYYY"),
  },
  { field: "status", headerName: "Status", width: 100 },
  { field: "statusTheme", headerName: "Status Theme", width: 100 },
  { field: "tag", headerName: "Tag", width: 100 },
  { field: "tagTheme", headerName: "Theme", width: 100 },
  { field: "activityName", headerName: "Activity", width: 100 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <div>
        <IconButton
          color="primary"
          onClick={() => params.row.handleUpdate(params.row.id)}
        >
          <Edit />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => params.row.handleDelete(params.row.id)}
        >
          <Delete />
        </IconButton>
      </div>
    ),
  },
];

interface IMyTasksGridProps {
  data: IMyTask[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const MyTasksGrid: React.FC<IMyTasksGridProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const handleDelete = (id: string) => {
    onDelete(id);
  };

  const handleUpdate = (id: string) => {
    onEdit(id);
  };

  return (
    <Box sx={{ width: "100%", height: 450 }} className="mytasks-grid">
      <DataGrid
        rows={data.map((row) => ({
          ...row,
          handleUpdate,
          handleDelete,
        }))}
        columns={columns}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default MyTasksGrid;
