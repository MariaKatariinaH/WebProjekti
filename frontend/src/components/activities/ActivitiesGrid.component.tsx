import "./activities-grid.scss";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import moment from "moment";
import React from "react";
import { IActivity } from "../../types/global.typing";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const columns: GridColDef[]  = [
  { field: "id", headerClassName: "super-app-theme--header", headerName: "ID", width: 50 },
  { field: "name", headerClassName: "super-app-theme--header", headerName: "Name", width: 100 },
  { field: "description", headerClassName: "super-app-theme--header", headerName: "Description", width: 300 },
  { field: "activityType", headerClassName: "super-app-theme--header", headerName: "Type", width: 100 },
  {
    field: "status", headerClassName: "super-app-theme--header",
    headerName: "Status",
    width: 100,
    cellClassName: (params) => `status-${params.row.statusTheme.toLowerCase()}`,
  },
  {
    field: "tag", headerClassName: "super-app-theme--header",
    headerName: "Tag",
    width: 100,
    cellClassName: (params) => `tag-${params.row.tagTheme.toLowerCase()}`,
  },
  {
    field: "createdAt", headerClassName: "super-app-theme--header",
    headerName: "Creation Time",
    width: 150,
    renderCell: (params) => moment(params.row.createdAt).format("DD-MM-YYYY"),
  },
  {
    field: "updatedAt", headerClassName: "super-app-theme--header",
    headerName: "Time of Updating",
    width: 150,
    renderCell: (params) => moment(params.row.updatedAt).format("DD-MM-YYYY"),
  },
  {
    field: "actions", headerClassName: "super-app-theme--header",
    headerName: "Actions",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <div>
        <IconButton color="primary" onClick={() => params.row.handleUpdate(params.row.id)}>
          <Edit />
        </IconButton>
        <IconButton color="secondary" onClick={() => params.row.handleDelete(params.row.id)}>
          <Delete />
        </IconButton>
      </div>
    ),
  },
  
];

interface IActivitiesGridProps {
  data: IActivity[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ActivitiesGrid: React.FC<IActivitiesGridProps> = ({ data, onEdit, onDelete }) => {

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  const handleUpdate = (id: string) => {
    onEdit(id);
  };

  return (
    <Box sx={{ width: "100%", height: 450 }} className="activities-grid">
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
export default ActivitiesGrid;
