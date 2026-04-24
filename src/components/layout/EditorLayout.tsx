/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface EditorLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  timeline: React.ReactNode;
  toolbar: React.ReactNode;
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({ 
  children, 
  sidebar, 
  timeline,
  toolbar 
}) => {
  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-white font-sans overflow-hidden relative">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative min-h-0">
        <div className="flex-1 flex flex-col border-r border-neutral-800 bg-black relative min-h-0 min-w-0">
          {children}
          {toolbar}
        </div>
        {sidebar && (
          <div className="w-full md:w-80 bg-neutral-900 border-l border-neutral-800 flex flex-col h-[35vh] md:h-auto overflow-y-auto relative z-50">
            {sidebar}
          </div>
        )}
      </div>
      <div className="shrink-0">
        {timeline}
      </div>
    </div>
  );
};
