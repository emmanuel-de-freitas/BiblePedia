"use client";

import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Switch,
} from "@heroui/react";
import { Building, Setting2 } from "iconsax-reactjs";
import { IconButton } from "@/components/buttons";

const UserPopover = () => {
	return (
		<Dropdown>
			<DropdownTrigger>
				<IconButton ariaLabel="User menu">
					<Avatar className="cursor-pointer h-7 w-7 text-xs">
						<Avatar.Fallback>DG</Avatar.Fallback>
					</Avatar>
				</IconButton>
			</DropdownTrigger>
			<DropdownMenu aria-label="User menu actions" className="w-72">
				<DropdownSection>
					<DropdownItem
						key="profile"
						className="h-auto gap-3 cursor-default"
						textValue="User profile"
					>
						<div className="flex items-center gap-3 py-2">
							<Avatar className="h-14 w-14">
								<Avatar.Fallback>DG</Avatar.Fallback>
							</Avatar>
							<div className="flex flex-col">
								<span className="text-base font-semibold">Devon Govett</span>
								<span className="text-sm text-default-500">user@example.com</span>
								<div className="mt-2">
									<Switch size="sm">Dark theme</Switch>
								</div>
							</div>
						</div>
					</DropdownItem>
				</DropdownSection>
				<DropdownSection>
					<DropdownItem key="organization" textValue="Organization">
						<div className="flex items-center gap-2">
							<Building size={18} variant="Outline" />
							<span>Organization</span>
							<span className="ml-auto text-default-400">Nike</span>
						</div>
					</DropdownItem>
					<DropdownItem key="settings" textValue="Settings">
						<div className="flex items-center gap-2">
							<Setting2 size={18} variant="Outline" />
							<span>Settings</span>
						</div>
					</DropdownItem>
				</DropdownSection>
				<DropdownSection>
					<DropdownItem key="legal" textValue="Legal notices">
						Legal notices
					</DropdownItem>
					<DropdownItem key="logout" className="text-danger" textValue="Sign out">
						Sign out
					</DropdownItem>
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
	);
};

export default UserPopover;
