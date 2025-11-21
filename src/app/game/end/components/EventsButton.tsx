'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

type EventsButtonProps = {
  className?: string;
  text: string | null;
  link: string | null;
};

export const EventsButton = ({ className, text, link }: EventsButtonProps) => {
  const router = useRouter();

  return (
    <Link
      href={link || ''}
      target="_blank"
      className={cn(
        className,
        `flex min-h-20 w-full animate-bounce items-center justify-center rounded-2xl border border-gray-300 bg-[#029999] px-3 text-wrap text-white transition-all hover:bg-[#017c7c] lg:w-full`
      )}
    >
      <span className="text-center text-wrap">{text}</span>
    </Link>
  );
};
