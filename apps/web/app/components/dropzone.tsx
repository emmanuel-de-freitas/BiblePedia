"use client";

import { Button } from "@heroui/react";
import { DocumentUpload } from "iconsax-reactjs";

const Image = ({
	src,
	alt,
	className,
	width,
	height,
	fill,
}: {
	src: string;
	alt: string;
	className?: string;
	width?: number;
	height?: number;
	fill?: boolean;
}) => (
	<img
		src={src}
		alt={alt}
		className={className}
		width={width}
		height={height}
		style={
			fill
				? {
					position: "absolute",
					height: "100%",
					width: "100%",
					left: 0,
					top: 0,
					right: 0,
					bottom: 0,
					objectFit: "cover",
				}
				: undefined
		}
	/>
);

import type { DragEvent } from "react";
import { useCallback, useState } from "react";

interface DropzoneProps {
	onFilesSelected?: (files: File[]) => void;
	acceptedFileTypes?: string[];
	isFilled?: boolean;
	children?: React.ReactNode;
}

function Dropzone({
	onFilesSelected,
	acceptedFileTypes = ["application/epub+zip"],
	children,
}: DropzoneProps) {
	const [isDragOver, setIsDragOver] = useState(false);

	const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragOver(true);
	}, []);

	const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragOver(false);
	}, []);

	const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleDrop = useCallback(
		(e: DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragOver(false);

			const files = Array.from(e.dataTransfer.files).filter((file) =>
				acceptedFileTypes.some((type) => file.type === type || file.name.endsWith(".epub"))
			);

			if (files.length > 0 && onFilesSelected) {
				onFilesSelected(files);
			}
		},
		[acceptedFileTypes, onFilesSelected]
	);

	const handleFileSelect = useCallback(() => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = acceptedFileTypes.join(",");
		input.multiple = false;

		input.onchange = (e) => {
			const target = e.target as HTMLInputElement;
			const files = target.files ? Array.from(target.files) : [];
			if (files.length > 0 && onFilesSelected) {
				onFilesSelected(files);
			}
		};

		input.click();
	}, [acceptedFileTypes, onFilesSelected]);

	return (
		<section
			role="region"
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			className={`
        w-full rounded-xl border-2 border-dashed transition-all duration-200 bg-neutral-100 dark:bg-neutral-800
        ${isDragOver
					? "border-primary bg-primary/10"
					: "border-default-300 hover:border-default-400"
				}
      `}
		>
			<div className="flex flex-row items-center justify-around px-5 py-10">
				<div className="relative w-48 h-32">
					<Image
						src="/book-stacked.png"
						alt="Book stacked illustration"
						fill
						className="object-contain -translate-x-8 -translate-y-6 rotate-[8deg] scale-150"
					/>
				</div>

				{children}

				<div className="flex flex-col items-center gap-4 text-center">
					<div className="rounded-full bg-primary/10 p-4">
						<DocumentUpload size={48} className="text-primary" variant="Bulk" />
					</div>
					<div>
						<h3 className="text-xl font-semibold">Drag and drop your ePub</h3>
						<p className="mt-1 text-default-500">Or select the file from your computer</p>
					</div>
					<Button variant="primary" onPress={handleFileSelect}>
						Browse
					</Button>
				</div>
			</div>
		</section>
	);
}

export default Dropzone;
