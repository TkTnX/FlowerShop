import { useEffect } from "react";
import { Block } from "./Block";
import { X } from "lucide-react";

interface Props {
  children: React.ReactNode;
  className?: string;
  open: boolean;
  setOpen: (bool: boolean) => void;
}

export const Modal = ({ children, className, open, setOpen }: Props) => {
  useEffect(() => {
    if (open) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "visible";
    }

    return () => {
      window.document.body.style.overflow = "visible";
    };
  }, [open]);

  return (
    <div className="modal">
      <Block className={`modal__block ${className}`}>
        <button onClick={() => setOpen(false)} className="modal__close">
          <X />
        </button>
        {children}
      </Block>
    </div>
  );
};
