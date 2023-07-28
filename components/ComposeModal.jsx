'use client';

import composeHook from '@/hooks/composeHook';
import Image from 'next/image';
import { BiChevronDown } from 'react-icons/bi';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { app } from '@/libs/firebase';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ComposeModal = () => {
	const session = useSession();
	const storage = getStorage(app);
	const useComposeHook = composeHook();
	const [percent, setPercent] = useState();

	const imgUpload = useComposeHook.imgURL;

	const handleDiscard = (e) => {
		e.preventDefault();
		useComposeHook.onChangeTitle('Sample test');
		useComposeHook.onChangeContent('Sample content');
		useComposeHook.onImgUpload('');
		useComposeHook.onDelay();
	};
	const handleUploadImg = async (e) => {
		e.preventDefault();

		// Create the file metadata
		/** @type {any} */
		const metadata = {
			contentType: 'image/jpeg',
		};

		const imgFile = e.target.files[0];

		// Upload file and metadata to the object 'images/mountains.jpg'
		const storageRef = ref(storage, 'images/' + imgFile.name);
		const uploadTask = uploadBytesResumable(storageRef, imgFile, metadata);

		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setPercent(progress);
				console.log('Upload is ' + progress + '% done');
				switch (snapshot.state) {
					case 'paused':
						console.log('Upload is paused');
						break;
					case 'running':
						console.log('Upload is running');
						break;
				}
			},
			(error) => {
				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				switch (error.code) {
					case 'storage/unauthorized':
						// User doesn't have permission to access the object
						break;
					case 'storage/canceled':
						// User canceled the upload
						break;

					// ...

					case 'storage/unknown':
						// Unknown error occurred, inspect error.serverResponse
						break;
				}
			},
			() => {
				// Upload completed successfully, now we can get the download URL
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					useComposeHook.onImgUpload(downloadURL);
					console.log('File available at', downloadURL);
				});
			}
		);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		const newPost = {
			title: e.target[0].value,
			content: e.target[1].value,
			img: useComposeHook.imgURL,
			userId: session.data.id,
		};

		await axios
			.post('api/post', newPost)
			.then((r) => {
				// useComposeHook.isSubmitSuccess = true;
				// useComposeHook.onDelaySubmit();
				toast.success(r.data);
				useComposeHook.onDelay();
				handleDiscard(e);
			})
			.catch((e) => {
				// useComposeHook.isSubmitSuccess = false;
				console.log(e);
			});
	};

	if (session.status === 'loading') return null;
	return (
		<div
			className={`${
				!useComposeHook.isDelay ? 'slideUp' : 'slideDown'
			} fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-neutral-500 z-50 flex justify-center items-end`}
		>
			<form
				onSubmit={handleSubmit}
				className="container md:w-auto flex flex-col bg-white p-7 rounded-t-md gap-3 md:min-w-[70vw] shadow-lg relative "
			>
				<BiChevronDown
					size={32}
					className="absolute z-50 right-5 top-6 cursor-pointer text-neutral-400 transition hover:text-blue-500"
					onClick={useComposeHook.onDelay}
				/>
				<label className="text-3xl font-bold pb-4">Write something...</label>
				<input
					onKeyDown={(e) => e.key == 'Enter' && e.preventDefault()}
					type="text"
					placeholder={useComposeHook.composeTitle}
					value={
						useComposeHook.composeTitle === 'Sample test'
							? ''
							: useComposeHook.composeTitle
					}
					onChange={(e) =>
						e.target.value === ''
							? useComposeHook.onChangeTitle('Sample test')
							: useComposeHook.onChangeTitle(e.target.value)
					}
					required
					className="inputAuth font-bold"
				/>
				<textarea
					placeholder={useComposeHook.composeContent}
					value={
						useComposeHook.composeContent === 'Sample content'
							? ''
							: useComposeHook.composeContent
					}
					onChange={(e) =>
						e.target.value === ''
							? useComposeHook.onChangeContent('Sample content')
							: useComposeHook.onChangeContent(e.target.value)
					}
					required
					className="inputAuth h-[50vh] resize-none "
				/>
				<div className="flex flex-col gap-5 md:flex-row justify-between items-center">
					<button
						onClick={handleDiscard}
						className="p-3 border-neutral-200 border rounded-md pl-8 pr-8 text-neutral-300 bg-white hover:text-white hover:bg-neutral-300 transition w-full md:w-auto text-center"
					>
						Discard
					</button>
					<div className="flex gap-2 items-center md:w-auto md:justify-end w-full justify-between">
						<div
							className={`relative h-[48px] aspect-[3/2] rounded-lg overflow-hidden ${
								!imgUpload ? 'border-2 border-dashed' : ''
							}`}
						>
							{imgUpload && (
								<Image
									src={imgUpload}
									style={{ objectFit: 'cover' }}
									fill
									priority
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									alt=""
								/>
							)}
						</div>
						<label
							htmlFor="img-upload"
							className="relative overflow-hidden cursor-pointer p-3 rounded-md pl-8 pr-8 text-left bg-gray-100  hover:bg-orange-400 transition"
						>
							<input
								onChange={(e) => handleUploadImg(e)}
								type="file"
								id="img-upload"
								accept="image/*"
								className="hidden"
							/>
							Upload Image
							<div
								className={`${
									(percent === 0 || percent === 100 || !percent) && 'hidden'
								} absolute h-[3px] origin-left bottom-0 right-0 left-0 bg-orange-500 transition`}
								style={{
									scale: `${percent}% 100%`,
								}}
							></div>
						</label>
						<button
							type="submit"
							className="overflow-hidden relative p-3 rounded-md px-4 md:px-8 text-left bg-gray-100 hover:bg-lime-400 transition"
						>
							Post
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ComposeModal;
