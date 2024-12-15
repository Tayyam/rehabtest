"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import DeleteIcon from "@/public/images/Icons/Delete.svg";
import { useTranslation } from "@/hooks/useTranslation";

export const DeleteDialog = ({ deleteFunction }: { deleteFunction: any }) => {
  const { lang } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleDeleteItem = async () => {
    try {
      await deleteFunction(); // Await the async function
      setOpen(false);
    } catch (error) {
      console.log(error); // Handle any errors during deletion
    }
  };

  // Define messages for both languages (en and ar)
  const messages = {
    en: {
      title: "Are you sure you want to delete!",
      description:
        "This item will be permanently deleted. You will not be able to recover it once it is deleted. Are you sure you want to continue?",
      confirm: "Yes, confirm",
      cancel: "Cancel",
    },
    ar: {
      title: "هل أنت متأكد من حذف العنصر؟",
      description:
        "سيتم حذف هذا العنصر نهائيًا. لن تتمكن من استعادته بعد حذفه. هل أنت متأكد أنك تريد المتابعة؟",
      confirm: "نعم، تأكيد",
      cancel: "إلغاء",
    },
  };

  // Get the message based on the current language
  const message = messages[lang];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Image
          src={DeleteIcon}
          alt="deletedIcon"
          width={20}
          height={20}
          onClick={() => setOpen(true)}
          className="cursor-pointer w-max"
        />
      </DialogTrigger>
      <DialogContent
        style={{
          borderRadius: "22px",
          border: "10px solid rgba(255, 255, 255, 0.05)",
        }}
        className="md:w-[680px] w-full border-none bg-gray"
      >
        {/* Header */}
        <div className="p-[30px] w-full flex flex-col gap-[30px]">
          {/* Image */}
          <div className="w-full flex justify-center items-center">
            <Trash2 width={100} height={100} />
          </div>

          {/* Body */}
          <div className="flex flex-col gap-4 items-center justify-center">
            <h2 className="text-xl font-bold">{message.title}</h2>
            <p className="text-scondaryColor text-sm text-center">
              {message.description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center items-center gap-2.5">
            <button
              onClick={handleDeleteItem}
              className="w-full bg-secondaryColor rounded-[6px] h-[50px] text-white hover:bg-secondaryColor/80"
            >
              {message.confirm}
            </button>
            <DialogClose asChild>
              <button
                onClick={() => setOpen(false)}
                className="bg-[#FE3A46] hover:bg-[#FE3A46]/80 h-[50px] py-4 px-6 rounded-[6px] transition-all text-white text-base font-semibold leading-none"
              >
                {message.cancel}
              </button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
