import React from 'react';


export default async function GameLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={'game-theme relative grow'}>
      <div className="absolute top-0 left-1/2 z-50 container mx-auto -translate-x-1/2">
        {/* <Navigation /> */}
      </div>

      <div className="relative z-0">{children}</div>
    </div>
  );
}
