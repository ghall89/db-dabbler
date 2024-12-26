import {
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalDialog,
  Stack,
} from '@mui/joy';

interface ConfirmationModalProps {
  title: string;
  message?: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

export default function ConfirmationModal({
  title,
  message,
  open,
  handleClose,
  handleConfirm,
}: ConfirmationModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ModalDialog>
        <DialogTitle>{title}</DialogTitle>
        {message && <DialogContent>{message}</DialogContent>}
        <Stack spacing={2} justifyContent="end" direction="row">
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Okay</Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
