import { Button, Input, Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import { PawPrintIcon } from "lucide-react";

// Define the search params type
export type LoginSearchParams = {
  redirect?: string;
};

const Login = () => {
  return (
    <main className="h-full-x overflow-hidden flex">
      <div className="flex-1 relative flex flex-col justify-between">
        <div className="pl-5 pr-8 py-4 flex gap-4 items-center">
          <PawPrintIcon className="w-8 h-8" />
          <a href="#" className="text-2xl font-bold">
            React Template
          </a>
        </div>
        <LoginCard className="md:hidden" />
        <div className="md:px-8 md:py-4 px-4 py-2 flex relative">
          <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm z-[-1]"></div>
          <p className="text-white text-xs md:text-base">
            “This library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before.” -
            Abhiseck
          </p>
        </div>
        <img
          src="/auth-bg.jpg"
          alt="Just an"
          className="absolute -z-10 top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 hidden md:flex bg-[#EFEFEF] md:flex-col">
        <div className="flex gap-4 justify-end px-4 py-4">
          {/* <Button variant="outline">Login</Button> */}
          <Button variant="outline">Register</Button>
        </div>
        <LoginCard />
      </div>
    </main>
  );
};

type LoginCardProps = {
  className?: string;
};
const LoginCard = ({ className }: LoginCardProps) => {
  return (
    <div
      className={cn(
        [
          "flex flex-col md:max-w-xs max-w-sm justify-center mx-auto md:flex-1 max-md:bg-[#EFEFEF]/80 max-md:p-6 max-md:rounded-md",
        ],
        className
      )}
    >
      <div className="flex flex-col text-center">
        {/* <span >Create an account</span> */}
        <span className="text-xl font-bold">Welcome to React Template</span>
        <p className="text-sm text-muted-foreground">
          {/* Enter your email below to create your account */}
          Enter your email below to login
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col">
          <Label className="mb-2">Email</Label>
          <Input type="email" placeholder="Enter your email" />
          <p className="text-xs text-destructive mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex flex-col">
          <Label className="mb-2">Email</Label>
          <Input type="email" placeholder="Enter your email" />
          <p className="text-xs text-destructive mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div>
          <Button className="w-full">Login</Button>
        </div>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 px-2 bg-[#EFEFEF]">Or</span>
        </div>
        <div className="grid gap-2 grid-cols-2">
          <Button variant="outline" className="w-full">
            Github
          </Button>
          <Button variant="outline" className="w-full">
            Google
          </Button>
          <Button variant="outline" className="w-full">
            Passkey
          </Button>
          <Button variant="outline" className="w-full">
            Magic Link
          </Button>
        </div>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default Login;
