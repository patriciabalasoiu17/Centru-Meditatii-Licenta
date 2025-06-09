import { Outlet } from 'react-router-dom';
import LayoutSidebar from './LayoutSidebar';
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';

const Layout = () => {
  const { user, isSignedIn } = useUser();
  const role = user?.publicMetadata?.role as string;

  const email = user?.primaryEmailAddress?.emailAddress;
  return (
    <div className=" w-full h-full">
      <LayoutSidebar>
        <div className="absolute top-4 right-4 flex gap-4 bg-white">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full p-0 h-10 w-10 flex justify-center items-center">
                {isSignedIn ? <UserButton /> : <User className='bg-black text-white size-10 rounded-full p-2' />}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              {isSignedIn && <DropdownMenuLabel className="text-sm">
                <div className="font-medium">{user?.fullName}</div>
                <div className="text-xs text-muted-foreground">{email}</div>
                <div className="text-xs text-muted-foreground capitalize">
                  {role == undefined ? "Cerere în așteptare" : role}
                </div>
                <DropdownMenuSeparator />
              </DropdownMenuLabel>
              }


              <SignedIn>
                <SignOutButton>
                  <DropdownMenuItem className="cursor-pointer">
                    Sign out
                  </DropdownMenuItem>
                </SignOutButton>
              </SignedIn>

              <SignedOut>
                <SignInButton>
                  <DropdownMenuItem className="cursor-pointer">

                    Sign in
                  </DropdownMenuItem>
                </SignInButton>
              </SignedOut>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
        <Outlet />
      </LayoutSidebar>
    </div >
  );
};

export default Layout;
