import WorkspaceForm from "./create-workspace-form";
import useCreateWorkspaceDialog from "@/hooks/use-create-workspace-dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
const CreateWorkspaceDialog = () => {
  const { open, onClose } = useCreateWorkspaceDialog();

  return (
    <Dialog modal={true} open={open} onOpenChange={onClose}>
      <DialogTitle>ddd</DialogTitle>
      <DialogContent
        aria-describedby="Create work space"
        className="sm:max-w-5xl !p-0 overflow-hidden border-0"
      >
        <WorkspaceForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceDialog;
