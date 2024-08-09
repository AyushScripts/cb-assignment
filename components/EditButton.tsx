import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "./ui/use-toast";

const EditButton = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
        await user.update({
          firstName,
          lastName,
        });

        if (email !== user.primaryEmailAddress?.emailAddress) {
          await user.createEmailAddress({ email });
        }

        if (currentPassword && newPassword) {
          await user.updatePassword({
            currentPassword,
            newPassword,
          });
        }

        setIsOpen(false);
        toast({
          title: 'Profile updated successfully',
          variant: "default"
        });
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        // Handle Clerk API errors
        toast({
          title: 'Error updating profile',
          description: error.errors[0]?.longMessage || 'An error occurred',
          variant: "destructive"
        });
      } else {
        // Handle other errors
        toast({
          title: 'Error updating profile',
          description: 'An unexpected error occurred',
          variant: "destructive"
        });
      }
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>
      </DialogTrigger>

      <DialogContent className="bg-[#dadadb]">
        <DialogHeader>
          <DialogTitle className="text-[#1e1e1e]">
            Edit your information
          </DialogTitle>
          <DialogDescription>
            Make sure you carefully edit your information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="col-span-3 bg-slate-100 "
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="col-span-3 bg-slate-100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3 bg-slate-100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currentPassword" className="text-right">
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="col-span-3 bg-slate-100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newPassword" className="text-right">
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="col-span-3 bg-slate-100"
              />
            </div>
          </div>
          <Button type="submit">Update Profile</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditButton;