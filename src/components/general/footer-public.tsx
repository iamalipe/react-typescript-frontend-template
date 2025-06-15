const FooterPublic = () => {
  return (
    <footer className="flex-none h-16 md:h-12 overflow-hidden border-t flex flex-col md:flex-row md:justify-between items-center px-4 justify-center">
      <span className="text-sm text-muted-foreground">
        @ 2025 XYZ inc. All rights reserved.
      </span>
      <span className="text-sm text-muted-foreground">
        <a href="#" className="hover:underline">
          Terms
        </a>{" "}
        |{" "}
        <a href="#" className="hover:underline">
          Privacy
        </a>
      </span>
    </footer>
  );
};

export default FooterPublic;
