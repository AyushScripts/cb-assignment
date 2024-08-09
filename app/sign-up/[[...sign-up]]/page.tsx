import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="py-20 flex justify-center items-center">
      <SignUp />
    </div>
  );
}
