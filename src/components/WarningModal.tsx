import { Modal, Box, Typography, List, ListItem, ListItemText } from "@mui/material";

interface WarningModalProps {
  open: boolean;
  onClose: () => void;
  invalidSops: string[];
}

const WarningModal = ({ open, onClose, invalidSops }: WarningModalProps) => {
  
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#fffbea", // Light warning background
          border: "2px solid #f39c12", // Strong amber border
          boxShadow: 24,
          borderRadius: 2,
          p: 3
        }}
      >
        <Typography variant="h6" sx={{ color: "#c62828", fontWeight: "bold", mb: 2 }}>
          Warning!
        </Typography>

        <Typography sx={{ mb: 2 }}>
          Warning: you have included SOP(s) for which you do not have rights to upload
          to the database. See the SOPs listed below:
        </Typography>

        <List dense>
          {invalidSops.map((value, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <ListItemText primary={value} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default WarningModal;
