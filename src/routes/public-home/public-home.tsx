import { Link } from "@tanstack/react-router";
import { PawPrintIcon, Shield, FileText, ArrowRight } from "lucide-react";

import ThemeToggle from "@/components/theme-toggle/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PublicHome = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-background/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg text-primary">
            <PawPrintIcon className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            React Template
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild className="shadow-md hover:shadow-lg transition-shadow">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto py-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
            Welcome to our App
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Welcome to out app, <br />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              this is landing page.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Start building your beautiful React application backed by a powerful Express + Mongoose + Redis API.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" asChild className="group shadow-lg hover:shadow-primary/20 transition-all">
              <Link to="/register">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-background/50 backdrop-blur-md px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} React Template. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {/* Privacy Policy Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                    <Shield className="w-6 h-6 text-primary" />
                    Privacy Policy
                  </DialogTitle>
                  <DialogDescription>
                    Last updated:{" "}
                    {new Date().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-4">
                  <p className="font-semibold text-foreground">
                    1. Information We Collect
                  </p>
                  <p>
                    We collect information you provide directly to us when you
                    create an account, update your profile, or communicate with
                    us. This may include your email address, password, name, and
                    profile details.
                  </p>
                  <p className="font-semibold text-foreground">
                    2. How We Use Your Information
                  </p>
                  <p>
                    We use the information we collect to provide, maintain, and
                    improve our services, authenticate your identity, secure
                    your account, and monitor performance.
                  </p>
                  <p className="font-semibold text-foreground">
                    3. Information Sharing
                  </p>
                  <p>
                    We do not share or sell your personal information to third
                    parties except as required by law or to protect our rights.
                  </p>
                  <p className="font-semibold text-foreground">
                    4. Cookies and Local Storage
                  </p>
                  <p>
                    We use cookies and browser storage (such as local storage)
                    to keep you logged in and preserve your user preferences
                    (like your color theme).
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            {/* Terms and Conditions Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
                  <FileText className="w-4 h-4" />
                  Terms & Conditions
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                    <FileText className="w-6 h-6 text-primary" />
                    Terms & Conditions
                  </DialogTitle>
                  <DialogDescription>
                    Last updated:{" "}
                    {new Date().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-4">
                  <p className="font-semibold text-foreground">
                    1. Agreement to Terms
                  </p>
                  <p>
                    By accessing or using our application, you agree to be bound
                    by these Terms and Conditions and all applicable laws and
                    regulations.
                  </p>
                  <p className="font-semibold text-foreground">
                    2. User Accounts
                  </p>
                  <p>
                    You are responsible for maintaining the security of your
                    account and password. You agree to notify us immediately of
                    any unauthorized use of your account.
                  </p>
                  <p className="font-semibold text-foreground">
                    3. Acceptable Use
                  </p>
                  <p>
                    You agree not to use the application for any illegal,
                    harmful, or unauthorized purpose, or to upload or transmit
                    any malicious code.
                  </p>
                  <p className="font-semibold text-foreground">
                    4. Limitation of Liability
                  </p>
                  <p>
                    In no event shall we be liable for any direct, indirect,
                    incidental, special, or consequential damages arising out of
                    your use of or inability to use the service.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicHome;

