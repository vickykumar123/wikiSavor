import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {useDeleteCurrentUser} from "@/graphql/queries/currentUser";
import {useAuth0} from "@auth0/auth0-react";

export function DeleteButton() {
  const {isLoading, refetch} = useDeleteCurrentUser();
  const {logout} = useAuth0();
  async function deleteAccount() {
    await refetch();
    await logout();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete my account</DialogTitle>
          <DialogDescription>
            Are you sure to delete your account permanently?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary" disabled={isLoading}>
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={deleteAccount}
            disabled={isLoading}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
