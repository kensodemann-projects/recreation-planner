import { ReactNode } from 'react';

interface MessageProps {
  children: ReactNode;
}

const Message = ({ children }: MessageProps) => {
  return <div className="text-center mt-4 font-bold text-lg">{children}</div>;
};

export default Message;
