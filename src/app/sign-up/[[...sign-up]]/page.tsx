import { SignUp } from '@clerk/nextjs';

export default function SignUpHome() {
  return (
    <div className="grid place-items-center h-screen bg-black">
      <SignUp signInUrl="/" forceRedirectUrl="/dashboard" />;
    </div>
  );
}
