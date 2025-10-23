"use client";

import React from "react";

interface PropsType {
  children?: React.ReactNode;
}

const Main = ({ children }: PropsType) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="w-full">{children}</main>
    </div>
  );
};

export default Main;
