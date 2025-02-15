
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/3d-button";
import { FaGoogle, FaApple } from "react-icons/fa";
import { SiMetamask } from "react-icons/si";

export function LoginPopover({ children }: { children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-6 bg-[#F1F0FB] border-none shadow-xl">
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="font-semibold text-xl mb-1">Welcome to Future.fun</h3>
            <p className="text-sm text-muted-foreground">Choose how you want to join</p>
          </div>
          
          <div className="space-y-3">
            <Button 
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] border-[#6E59A5] border-b-4 text-white shadow-md flex items-center justify-center gap-2"
            >
              <FaGoogle className="w-4 h-4" /> Continue with Google
            </Button>
            
            <Button 
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] border-[#6E59A5] border-b-4 text-white shadow-md flex items-center justify-center gap-2"
            >
              <FaApple className="w-4 h-4" /> Continue with Apple
            </Button>
            
            <Button 
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] border-[#6E59A5] border-b-4 text-white shadow-md flex items-center justify-center gap-2"
            >
              <SiMetamask className="w-5 h-5" /> Continue with MetaMask
            </Button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-[#8E9196] flex items-center justify-center gap-1">
              Under Construction <span role="img" aria-label="construction">🚧</span>
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
