import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import React, { ReactNode } from 'react';
import { useUtilitiesStore } from '../_store';
import { Button } from '@/components/ui/button';
import { TriangleAlert } from 'lucide-react';

// Define the props type for the Modal component
interface ModalProps {
  triggerTitle?: string; // Can be a string or any ReactNode for flexibility
  title: string;       // Title of the modal
  children: ReactNode;    // Modal content
}

const Modal: React.FC<ModalProps> = ({ triggerTitle, title, children }) => {
  const { isOpen, toggleModal } = useUtilitiesStore()

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent>
        <DialogClose />
        <DialogHeader>
          <TriangleAlert size={32} className='text-yellow-400' />
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {children}
        </DialogDescription>
        <DialogFooter>
            <Button onClick={() => toggleModal(false)}>
              OK
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
