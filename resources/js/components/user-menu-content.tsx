import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();

    return (
        <>
            {/* <Menu.Positioner> */}
            {/* <Menu.Content>
                <Menu.Item value="new-txt-a">
                    New Text File <Menu.ItemCommand>⌘E</Menu.ItemCommand>
                </Menu.Item>
                <Menu.Item value="new-file-a">
                    New File... <Menu.ItemCommand>⌘N</Menu.ItemCommand>
                </Menu.Item>
                <Menu.Item value="new-win-a">
                    New Window <Menu.ItemCommand>⌘W</Menu.ItemCommand>
                </Menu.Item>
                <Menu.Item value="open-file-a">
                    Open File... <Menu.ItemCommand>⌘O</Menu.ItemCommand>
                </Menu.Item>
                <Menu.Item value="export-a">
                    Export <Menu.ItemCommand>⌘S</Menu.ItemCommand>
                </Menu.Item>
            </Menu.Content> */}
            {/* </Menu.Positioner> */}
        </>
        //  <DropdownMenuLabel className="p-0 font-normal">
        //     <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
        //         <UserInfo user={user} showEmail={true} />
        //     </div>
        // </DropdownMenuLabel>
        // <DropdownMenuSeparator />
        // <DropdownMenuGroup>
        //     <DropdownMenuItem>
        //         <Link className="block w-full" href={route('profile.edit')} as="button" prefetch onClick={cleanup}>
        //             <Settings className="mr-2" />
        //             Settings
        //         </Link>
        //     </DropdownMenuItem>
        // </DropdownMenuGroup>
        // <DropdownMenuSeparator />
        // <DropdownMenuItem>
        //     <Link className="block w-full" method="post" href={route('logout')} as="button" onClick={cleanup}>
        //         <LogOut className="mr-2" />
        //         Log out
        //     </Link>
        // </DropdownMenuItem>
    );
}
