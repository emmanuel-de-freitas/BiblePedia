/**
 * ConfirmDialog - A customizable confirmation dialog component
 *
 * Wraps React Spectrum S2's AlertDialog with common confirmation patterns
 * for destructive actions, confirmations, and warnings.
 */
import { AlertDialog, DialogTrigger } from "@react-spectrum/s2";
import type { ReactNode } from "react";

export interface ConfirmDialogProps {
	/** The title of the confirmation dialog */
	title: string;
	/** The message/content to display in the dialog */
	children: ReactNode;
	/** Text for the primary (confirm) action button */
	primaryActionLabel: string;
	/** Text for the secondary (cancel) action button */
	secondaryActionLabel?: string;
	/** Text for the cancel action button */
	cancelLabel?: string;
	/** Callback when the primary action is triggered */
	onConfirm?: () => void;
	/** Callback when the secondary action is triggered */
	onSecondaryAction?: () => void;
	/** Callback when the dialog is cancelled */
	onCancel?: () => void;
	/** Whether the dialog is for a destructive action */
	isDestructive?: boolean;
}

/**
 * A pre-configured confirmation dialog for common use cases
 *
 * @example
 * ```tsx
 * <DialogTrigger>
 *   <Button>Delete Item</Button>
 *   <ConfirmDialog
 *     title="Delete Item?"
 *     isDestructive
 *     primaryActionLabel="Delete"
 *     onConfirm={() => deleteItem()}
 *   >
 *     Are you sure you want to delete this item? This action cannot be undone.
 *   </ConfirmDialog>
 * </DialogTrigger>
 * ```
 */
export function ConfirmDialog({
	title,
	children,
	primaryActionLabel,
	secondaryActionLabel,
	cancelLabel,
	onConfirm,
	onSecondaryAction,
	onCancel,
	isDestructive = false,
}: ConfirmDialogProps) {
	return (
		<AlertDialog
			title={title}
			variant={isDestructive ? "destructive" : "confirmation"}
			primaryActionLabel={primaryActionLabel}
			secondaryActionLabel={secondaryActionLabel}
			cancelLabel={cancelLabel}
			onPrimaryAction={onConfirm}
			onSecondaryAction={onSecondaryAction}
			onCancel={onCancel}
		>
			{children}
		</AlertDialog>
	);
}

export { DialogTrigger };
