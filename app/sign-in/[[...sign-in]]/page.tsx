import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="py-20 flex justify-center items-center">
      <SignIn />
    </div>
  );
}